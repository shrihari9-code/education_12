import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { FlatList } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

type Props = {};

const AddNotes = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
        <View style={styles.notesDropZone}>
          <IonIcons name="cloud-upload-outline" size={40} />
          <Text>Upload Notes</Text>
        </View>
      </View>

      <View style={styles.lecturesContainer}>
        <Text style={styles.lectureHeading}>My Notes</Text>
        <FlatList
          style={styles.lectureList}
          data={[1, 2, 3]}
          renderItem={({ item }) => (
            <View style={styles.lectureItem}>
              <Text>Note - {String(item)}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(item) => `${item + Math.random() * 1000}`}
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
