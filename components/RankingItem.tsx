import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";

type Props = Ranking & {
  index: number;
};

const RankingItem = ({ index, maxScore, rank, testName, userScore }: Props) => {
  return (
    <View style={styles.rankItem}>
      <Text style={styles.rankText}>{`${index + 1}. ${testName}`}</Text>
      <Text style={styles.scoreText}>{`Rank: ${rank}`}</Text>
      <Text
        style={styles.scoreText}
      >{`Score: ${userScore} / ${maxScore}`}</Text>
    </View>
  );
};

export default memo(RankingItem);

const styles = StyleSheet.create({
  rankItem: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  scoreText: {
    fontSize: 16,
    color: "#555",
  },
});
