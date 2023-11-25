import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { memo } from "react";

type Props = {
  option: string;
  selectedAnswers: SelectedAnswers;
  questionIndex: number;
  optionPressHandler(questionIndex: number, option: string): void;
};

function OptionItem({
  option,
  questionIndex,
  selectedAnswers,
  optionPressHandler,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.option,
        selectedAnswers[questionIndex] === option && styles.selectedOption,
      ]}
      onPress={() => optionPressHandler(questionIndex, option)}
    >
      <Text style={styles.optionText}>{option}</Text>
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
});
