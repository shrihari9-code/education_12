import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const LectureCard = (props: Props) => {
  return (
    <View style={styles.lectureCard}>
      <Text>LectureCard</Text>
    </View>
  );
};

export default LectureCard;

const styles = StyleSheet.create({
  lectureCard: {
    height: 200,
    // width: "100%",
    backgroundColor: "#E5E3E3",
    margin: 15,
  },
});
