import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  score: number;
  title: string;
};

const StatsCard = ({ score, title }: Props) => {
  return (
    <LinearGradient
      colors={["#0672E9", "#1790EE"]}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={styles.statsContainer}
    >
      <View>
        <View style={styles.statsTextContainer}>
          <Text style={[styles.statsText, styles.textWhite]}>{score}</Text>
          <Text style={styles.textWhite}>pts</Text>
        </View>
        <Text style={styles.textWhite}>{title}</Text>
      </View>
    </LinearGradient>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  statsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },

  statsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  statsText: {
    fontSize: 32,
    fontWeight: "700",
  },

  textWhite: {
    color: "white",
  },
});
