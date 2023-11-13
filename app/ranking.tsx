import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";

const generateDummyData = (numberOfStudents: number) => {
  const dummyData = [];

  for (let i = 1; i <= numberOfStudents; i++) {
    dummyData.push({
      name: `Student ${i}`,
      score: Math.floor(Math.random() * 100) + 1,
      totalScore: 100,
    });
  }

  return dummyData;
};

const RankingScreen = () => {
  const studentRankings = generateDummyData(100);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Student Rankings</Text>
        <FlatList
          data={studentRankings}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.rankItem}>
              <Text style={styles.rankText}>{`${index + 1}. ${item.name}`}</Text>
              <Text style={styles.scoreText}>{`Score: ${item.score} / ${item.totalScore}`}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  rankItem: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
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

export default RankingScreen;
