import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const generateDummyTestQuestions = (numberOfQuestions: number): Question[] => {
  const dummyTestQuestions: Question[] = [];

  for (let i = 1; i <= numberOfQuestions; i++) {
    dummyTestQuestions.push({
      question: `Question ${i}`,
      options: [`Option A`, `Option B`, `Option C`, `Option D`],
      correctAnswer: `Option A`, // Set the correct answer as needed
    });
  }

  return dummyTestQuestions;
};

const numberOfQuestions = 50; // Adjust the number of questions as needed
const dynamicTestQuestions = generateDummyTestQuestions(numberOfQuestions);

interface SelectedAnswers {
  [questionIndex: number]: string;
}

const TestScreen = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

  const handleOptionPress = (questionIndex: number, option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const renderOptions = (options: string[], questionIndex: number) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.option,
          selectedAnswers[questionIndex] === option && styles.selectedOption,
        ]}
        onPress={() => handleOptionPress(questionIndex, option)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const renderQuestion = ({ item, index }: { item: Question; index: number }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{`${index + 1}. ${item.question}`}</Text>
      {renderOptions(item.options, index)}
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Test Questions</Text>
        <FlatList
          data={dynamicTestQuestions}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderQuestion}
        />
        {/* Add a button to submit the test and handle the submission logic */}
        <TouchableOpacity style={styles.submitButton} onPress={() => console.log(selectedAnswers)}>
          <Text style={styles.submitButtonText}>Submit Test</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  option: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: "#145AAC",
    borderColor: "#145AAC",
  },
  optionText: {
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
});

export default TestScreen;
