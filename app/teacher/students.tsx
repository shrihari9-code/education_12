import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { showToast } from "../../helpers/toast-helper";
import { fetchStudents } from "../../services/profile";
import StudentCard from "../../components/StudentCard";

type Props = {};

const StudentsPage = ({}: Props) => {
  const [students, setStudents] = useState<Array<Omit<Profile, "dob">>>([]);

  const handleFetchStudents = async () => {
    try {
      const { data } = await fetchStudents();
      console.log(data.content);
      if (!Array.isArray(data.content) || data.content.length === 0)
        throw new Error("No students found");

      setStudents(data.content);
    } catch (error: any) {
      showToast(error?.message ?? "Error in fetching students");
    }
  };

  useEffect(() => {
    handleFetchStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Students</Text>

      <FlatList
        data={students}
        style={styles.testsList}
        keyExtractor={(item) => `${item.userId}`}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({ item, index }) => (
          <StudentCard
            firstName={item.firstName}
            lastName={item.lastName}
            school={item.school}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAFBFC",
  },

  testsList: {
    marginBottom: 65,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
});

export default StudentsPage;
