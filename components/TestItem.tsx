import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

type Props = {
  testId: string;
  questionsCount: number;
  title: string;
  marks: number;
  index: number;
};

const TestItem = ({ index, marks, questionsCount, title, testId }: Props) => {
  const handleNavigation = () => {
    router.push(`/student/tests/${testId}`);
  };

  return (
    <View style={styles.testItem}>
      <View>
        <Text style={styles.questionText}>{questionsCount} QUESTIONS</Text>
        <Text style={styles.testItemTitle}>{title}</Text>
        <Text style={styles.marksText}>Total Marks: {marks} </Text>
      </View>

      <Pressable style={styles.startButton} onPress={handleNavigation}>
        <AntDesignIcon name="caretright" size={28} />
        {/* <Text>Start</Text> */}
      </Pressable>
    </View>
  );
};

export default TestItem;

const styles = StyleSheet.create({
  testItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 5,
  },

  testItemTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 6,
  },

  questionText: {
    fontWeight: "bold",
    color: "#a8a8a8",
  },

  marksText: {
    fontWeight: "bold",
    color: "#0C119D",
  },

  startButton: {
    borderColor: "#000",
    borderWidth: 2,
    padding: 10,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
