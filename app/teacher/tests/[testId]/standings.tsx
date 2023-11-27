import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchTestStandings } from "../../../../services/test";
import RankingItem from "../../../../components/RankingItem";
import { useLocalSearchParams } from "expo-router";

const RankingScreen = () => {
  const [studentRanks, setStudentRanks] = useState<
    Array<Ranking & { studentName: string }>
  >([]);
  const { testId }: { testId: string } = useLocalSearchParams();

  const handleFetchStandings = async () => {
    try {
      const { data } = await fetchTestStandings(testId);
      const testInfo = data.content.test;
      const standings: Array<Ranking & { studentName: string }> =
        data.content.standings.map((standing: Omit<Ranking, "testName">) => ({
          ...standing,
          testName: testInfo.title,
        }));
      setStudentRanks(standings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchStandings();
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
          item: { maxScore, rank, studentId, testName, userScore, studentName },
          index,
        }) => (
          <RankingItem
            index={index}
            maxScore={maxScore}
            rank={rank}
            studentId={studentId}
            testName={studentName}
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
