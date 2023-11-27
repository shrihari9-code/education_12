import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { showToast } from "../../../helpers/toast-helper";
import NotesCard from "../../../components/NotesCard";
import InputField from "../../../components/InputField";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker/";
import DateInputField from "../../../components/DateInputField";
import { Picker } from "@react-native-picker/picker";
import { createTest } from "../../../services/test";
import { router } from "expo-router";

type Props = {};

const ALLOWED_MARKS = Array.from({ length: 10 }).map(
  (value, index) => (index + 1) * 5
);

const AddTest = ({}: Props) => {
  const [uploadedTest, setUploadedTest] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const [testInformation, setTestInformation] = useState<
    Pick<Test, "title" | "startTimestamp" | "endTimestamp"> & { marks: number }
  >({
    title: "",
    startTimestamp: null,
    endTimestamp: null,
    marks: 0,
  });

  const handleDropTest = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.assets === null) {
        showToast("Failed to select document");
        return;
      }

      if (!result.canceled && result.assets.length === 0) {
        showToast("No document selected");
        return;
      }

      const testAsset = result.assets[0];
      setUploadedTest(testAsset);
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };

  const uploadTest = async () => {
    try {
      if (uploadedTest === null) throw new Error("No test available to upload");

      if (testInformation.title.trim() === "")
        throw new Error("Enter a valid test title");
      if (
        testInformation.endTimestamp === null ||
        testInformation.startTimestamp === null
      )
        throw new Error("Enter a valid timestamp");
      if (testInformation.marks === 0) throw new Error("Marks cannot be zero");

      const formData = new FormData();
      const file = {
        name: uploadedTest.name,
        uri: uploadedTest.uri,
        type: uploadedTest.mimeType,
        size: uploadedTest.size,
      };

      formData.append("test", file as any);
      formData.append("title", testInformation.title);
      formData.append("marks", String(testInformation.marks));
      formData.append(
        "startTimestamp",
        testInformation.startTimestamp.toISOString()
      );
      formData.append(
        "endTimestamp",
        testInformation.endTimestamp.toISOString()
      );

      const { data, status } = await createTest(formData);
      if (status === 201) {
        router.push("/teacher/notes");
      }
    } catch (error: any) {
      showToast(error?.message ?? "Error uploading notes");
    }
  };

  const handleInputField = (text: string, field: string = "title") => {
    setTestInformation((testInfo) => ({ ...testInfo, [field]: text }));
  };

  const handleDateInputField = (
    event: DateTimePickerEvent,
    date: Date,
    field: "startTimestamp" | "endTimestamp"
  ) => {
    setTestInformation((testInfo) => ({ ...testInfo, [field]: date }));
  };

  return (
    <View style={styles.container}>
      {uploadedTest ? (
        <NotesCard
          name={uploadedTest.name}
          type={uploadedTest.mimeType!}
          uri={uploadedTest.uri}
        />
      ) : (
        <Pressable style={styles.notesContainer} onPress={handleDropTest}>
          <View style={styles.notesDropZone}>
            <IonIcons name="cloud-upload-outline" size={40} />
            <Text>Drop notes here</Text>
          </View>
        </Pressable>
      )}

      <View>
        <InputField
          value={testInformation.title}
          changeHandler={handleInputField}
          placeholder="Title"
        />

        <View style={styles.timePickerContainer}>
          <DateInputField
            value={testInformation?.startTimestamp}
            changeHandler={(event: DateTimePickerEvent, date: Date) =>
              handleDateInputField(event, date, "startTimestamp")
            }
            placeholder="Start Time"
          />

          <DateInputField
            value={testInformation?.endTimestamp}
            changeHandler={(event: DateTimePickerEvent, date: Date) =>
              handleDateInputField(event, date, "endTimestamp")
            }
            placeholder="End Time"
          />
        </View>

        <Picker
          selectedValue={testInformation.marks}
          onValueChange={(itemValue: number) =>
            setTestInformation((value) => ({ ...value, marks: itemValue }))
          }
        >
          {ALLOWED_MARKS.map((mark) => (
            <Picker.Item label={mark.toString()} value={mark} key={mark} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.notesUploadButton} onPress={uploadTest}>
        <Text style={styles.notesUploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTest;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },

  notesContainer: {
    padding: 30,
    marginVertical: 20,
    backgroundColor: "#E5E5E5",
  },

  notesDropZone: {
    alignItems: "center",
    justifyContent: "center",
  },

  notesUploadButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#145AAC",
    alignItems: "center",
    marginTop: 10,
  },

  notesUploadButtonText: {
    color: "white",
    fontSize: 16,
  },

  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
