import { StyleSheet, Text, View, FlatList } from "react-native";
import { fetchNotes } from "../../../services/notes";
import { useState } from "react";
import NotesCard from "../../../components/NotesCard";

type Props = {};

const Notes = ({}: Props) => {
  const [notes, setNotes] = useState<Omit<Notes, "teacherId">[]>([]);

  const getNotes = async () => {
    try {
      const { data } = await fetchNotes();

      setNotes(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
        <Text style={styles.notesHeading}>My Notes</Text>
        <FlatList
          style={styles.notesList}
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

export default Notes;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    marginBottom: 80,
  },

  notesContainer: {
    marginVertical: 5,
  },

  notesHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },

  notesList: {
    marginVertical: 10,
  },

  notesItem: {
    height: 100,
    backgroundColor: "#E5E5E5",
  },
});
