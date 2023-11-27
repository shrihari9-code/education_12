import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TestQuestion from "../../../../components/TestQuestion";
import { showToast } from "../../../../helpers/toast-helper";
import { fetchTestQuestions } from "../../../../services/test";
import { router, useLocalSearchParams } from "expo-router";

const TestScreen = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);

  const { testId }: { testId: string } = useLocalSearchParams();

  const handleOptionPress = (questionId: string, selectedOption: number) => {
    const responsePresent = selectedAnswers.find(
      (res) => res.questionId === questionId
    );

    if (responsePresent !== undefined) {
      setSelectedAnswers(
        selectedAnswers.map((answer) => {
          return answer.questionId === questionId
            ? { ...answer, selectedOption }
            : answer;
        })
      );
    } else {
      setSelectedAnswers([...selectedAnswers, { questionId, selectedOption }]);
    }
  };

  const handleFetchTestQuestions = async () => {
    try {
      const { data } = await fetchTestQuestions(testId);
      const questions = data.content.questions.map((question: any) => ({
        options: question.options,
        title: question.title,
        questionId: question._id,
        keyAnswer: "",
      }));

      setTestQuestions(questions);
    } catch (error: any) {
      showToast(error.message ?? "Failed to fetch test questions");
    }
  };

  const handleSubmitResponse = async () => {
    try {
    } catch (error: any) {
      showToast(error.message ?? "Failed to submit the test response");
    }
  };

  useEffect(() => {
    if (testId !== undefined) handleFetchTestQuestions();
  }, [testId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Questions</Text>

      {testQuestions.length > 0 && (
        <View style={styles.exitContainer}>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/student/tests");
              }
            }}
          >
            <Text style={styles.submitButtonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={testQuestions}
        keyExtractor={(_item, index) =>
          `${Math.random() * index}-${_item.title.substring(0, 4)}`
        }
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <TestQuestion
            questionId={item.questionId}
            correctAnswer={item.keyAnswer}
            index={index}
            optionPressHandler={handleOptionPress}
            options={item.options}
            question={item.title}
            selectedAnswers={selectedAnswers}
            questionIndex={index}
          />
        )}
      />

      {testQuestions.length > 0 && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => console.log(selectedAnswers)}
        >
          <Text style={styles.submitButtonText}>Submit Test</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 60,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  submitButton: {
    backgroundColor: "#145AAC",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },

  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  exitContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  exitButton: {
    backgroundColor: "#145AAC",
    padding: 10,
    borderRadius: 5,
    width: "25%",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default TestScreen;
