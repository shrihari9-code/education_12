import { StyleSheet, Text, View, FlatList } from "react-native";
import TestItem from "../../../components/TestItem";
import { showToast } from "../../../helpers/toast-helper";
import { fetchTests } from "../../../services/test";
import { useEffect, useState } from "react";
import TestDisplayCard from "../../../components/TestDisplayCard";

function TestHome() {
  const [tests, setTests] = useState<Test[]>([]);

  const handleFetchTests = async () => {
    try {
      const { data } = await fetchTests();
      const testData = data.content;
      setTests(
        testData.map((test: any) => ({
          testId: test._id,
          maxMarks: test.maxMarks,
          questionsCount: test.questionsCount,
          ...test,
        }))
      );
    } catch (error: any) {
      showToast(error?.message ?? "Failed to fetch student tests");
    }
  };

  useEffect(() => {
    handleFetchTests();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tests</Text>

      <FlatList
        data={tests}
        style={styles.testsList}
        keyExtractor={(item) => `${Math.random()}-${item}`}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({ item, index }) => (
          // <TestItem
          //   testId={item.testId}
          //   index={index}
          //   marks={item.maxMarks}
          //   questionsCount={0}
          //   title={item.title}
          // />
          <TestDisplayCard
            title={item.title}
            studentCount={item.studentCount}
            testId={item.testId}
          />
        )}
      />
    </View>
  );
}

export default TestHome;

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
