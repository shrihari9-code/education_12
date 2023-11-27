import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import { showToast } from "../../../helpers/toast-helper";
import InputField from "../../../components/InputField";
import { router } from "expo-router";
import { addLecture } from "../../../services/lecture";

type Props = {};

const ALLOWED_MARKS = Array.from({ length: 10 }).map(
  (value, index) => (index + 1) * 5
);

const AddTest = ({}: Props) => {
  const [lecture, setLecture] = useState<Omit<Lecture, "_id" | "teacherId">>({
    title: "",
    description: "",
    videoUrl: "",
  });

  const handleAddLecture = async () => {
    try {
      let key: keyof typeof lecture;
      for (key in lecture) {
        if (lecture[key].trim() === "")
          throw new Error("Enter a valid value for: " + key);
      }

      const { data, status } = await addLecture(lecture);
      if (status === 201) {
        router.push("/teacher/lectures");
      }
    } catch (error: any) {
      showToast(error?.message ?? "Error uploading notes");
    }
  };

  const handleInputField = (text: string, field: string = "title") => {
    setLecture((testInfo) => ({ ...testInfo, [field]: text }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Lecture</Text>

      <View style={styles.lectureFieldsContainer}>
        <InputField
          value={lecture.title}
          changeHandler={handleInputField}
          placeholder="Title"
        />
        <InputField
          value={lecture.description}
          changeHandler={(text) => handleInputField(text, "description")}
          placeholder="Description"
          multiline={true}
        />
        <InputField
          value={lecture.videoUrl}
          changeHandler={(text) => handleInputField(text, "videoUrl")}
          placeholder="Video Url"
        />
      </View>

      <TouchableOpacity
        style={styles.notesUploadButton}
        onPress={handleAddLecture}
      >
        <Text style={styles.notesUploadButtonText}>Submit</Text>
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },

  lectureFieldsContainer: {
    marginTop: 40,
  },

  notesUploadButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#145AAC",
    alignItems: "center",
    marginTop: 50,
  },

  notesUploadButtonText: {
    color: "white",
    fontSize: 16,
  },
});
