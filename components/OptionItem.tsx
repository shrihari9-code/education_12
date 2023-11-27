import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { memo } from "react";

type Props = {
  option: string;
  questionId: string;
  selectedAnswers: SelectedAnswer[];
  questionIndex: number;
  optionPressHandler(questionId: string, selectedOption: number): void;
  optionIndex: number;
};

function OptionItem({
  option,
  questionIndex,
  selectedAnswers,
  questionId,
  optionPressHandler,
  optionIndex,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.option,
        selectedAnswers[questionIndex]?.questionId === questionId &&
          selectedAnswers[questionIndex]?.selectedOption - 1 === optionIndex &&
          styles.selectedOption,
      ]}
      onPress={() => optionPressHandler(questionId, optionIndex + 1)}
    >
      <Text
        style={[
          styles.optionText,
          selectedAnswers[questionIndex]?.questionId === questionId &&
            selectedAnswers[questionIndex]?.selectedOption - 1 ===
              optionIndex &&
            styles.selectedOptionText,
        ]}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(OptionItem);

const styles = StyleSheet.create({
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

  selectedOptionText: {
    color: "white",
  },
});
