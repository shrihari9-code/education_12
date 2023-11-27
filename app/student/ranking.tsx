import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchStudentRankings } from "../../services/test";
import RankingItem from "../../components/RankingItem";

const RankingScreen = () => {
  const [studentRanks, setStudentRanks] = useState<Ranking[]>([]);

  const handleFetchRankings = async () => {
    try {
      const { data } = await fetchStudentRankings();
      const rankings: Ranking[] = data.content;
      setStudentRanks(rankings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchRankings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Rankings</Text>
      <FlatList
        style={styles.ranksList}
        data={studentRanks}
        keyExtractor={(_item, index) => _item.studentId}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({
          item: { maxScore, rank, studentId, testName, userScore },
          index,
        }) => (
          <RankingItem
            index={index}
            maxScore={maxScore}
            rank={rank}
            studentId={studentId}
            testName={testName}
            userScore={userScore}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  ranksList: {
    marginBottom: 65,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
});

export default RankingScreen;
