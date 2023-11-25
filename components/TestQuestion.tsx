import { useState, useCallback, memo, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import OptionItem from "./OptionItem";

type Props = Question & {
  index: number;
  optionPressHandler(questionIndex: number, option: string): void;
  selectedAnswers: SelectedAnswers;
};

function TestQuestion({
  question,
  options,
  correctAnswer,
  index,
  optionPressHandler,
  selectedAnswers,
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
            optionPressHandler={optionPressHandler}
            questionIndex={index}
            selectedAnswers={selectedAnswers}
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
