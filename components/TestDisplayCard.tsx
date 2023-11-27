import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { router } from "expo-router";

type Props = {
  title: string;
  studentCount: number;
  testId: string;
};

const TestDisplayCard = ({ title, studentCount, testId }: Props) => {
  const showTestInformation = () => {
    router.push(`/teacher/tests/${testId}`);
  };

  return (
    <View style={styles.testItem}>
      <View>
        <Text style={styles.testItemTitle}>{title}</Text>
        <Text> Students attempted: {studentCount} </Text>
      </View>

      <Pressable onPress={showTestInformation}>
        <AntDesignIcon name="right" size={20} style={styles.openTestIcon} />
      </Pressable>
    </View>
  );
};

export default TestDisplayCard;

const styles = StyleSheet.create({
  testItem: {
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  testItemTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 6,
  },

  openTestIcon: {
    fontWeight: "600",
  },
});
