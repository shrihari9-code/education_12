import { memo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import OptionItem from "./OptionItem";

type Props = Question & {
  index: number;
  optionPressHandler(questionId: string, selectedOption: number): void;
  selectedAnswers: SelectedAnswer[];
  questionId: string;
  questionIndex: number;
};

function TestQuestion({
  question,
  options,
  correctAnswer,
  index,
  optionPressHandler,
  selectedAnswers,
  questionId,
  questionIndex,
}: Props) {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{`${index + 1}. ${question}`}</Text>
      <FlatList
        data={options}
        keyExtractor={(item, index) =>
          `${index * Math.random()}-${item.substring(0, 4)}`
        }
        renderItem={({ item, index }) => (
          <OptionItem
            option={item}
            questionId={questionId}
            optionPressHandler={optionPressHandler}
            questionIndex={questionIndex}
            selectedAnswers={selectedAnswers}
            optionIndex={index}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});

export default memo(TestQuestion);
