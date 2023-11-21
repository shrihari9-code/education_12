import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { FlatList } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { ALLOWED_NOTES_MIME_TYPES } from "../../../constants";
import NotesCard from "../../../components/NotesCard";
import { showToast } from "../../../helpers/toast-helper";
import { Pressable } from "react-native";
import * as FileSystem from "expo-file-system";
import { fetchNotes } from "../../../services/notes";

type Props = {};

const AddNotes = ({}: Props) => {
  const [uploadedNotes, setUploadedNotes] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const [notes, setNotes] = useState<Omit<Notes, "teacherId">[]>([]);

  const handleNotesUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ALLOWED_NOTES_MIME_TYPES,
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

      const notesAsset = result.assets[0];
      console.log(notesAsset.uri);
      setUploadedNotes(notesAsset);
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };

  const getNotes = async () => {
    try {
      const { data } = await fetchNotes();

      setNotes(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();

    return () => {
      if (uploadedNotes !== null) {
        FileSystem.deleteAsync(uploadedNotes.uri);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {uploadedNotes ? (
        <NotesCard
          name={uploadedNotes.name}
          type={uploadedNotes.mimeType!}
          uri={uploadedNotes.uri}
        />
      ) : (
        <Pressable style={styles.notesContainer} onPress={handleNotesUpload}>
          <View style={styles.notesDropZone}>
            <IonIcons name="cloud-upload-outline" size={40} />
            <Text>Upload Notes</Text>
          </View>
        </Pressable>
      )}

      <View style={styles.lecturesContainer}>
        <Text style={styles.lectureHeading}>My Notes</Text>
        <FlatList
          style={styles.lectureList}
          data={notes}
          renderItem={({ item }) => (
            <NotesCard name={item.title} type={item.type} uri={item.url} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default AddNotes;

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

  lecturesContainer: {
    marginVertical: 25,
  },

  lectureHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },

  lectureList: {
    marginVertical: 10,
  },
  lectureItem: {
    height: 100,
    backgroundColor: "#E5E5E5",
  },
});
