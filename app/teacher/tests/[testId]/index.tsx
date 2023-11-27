import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { showToast } from "../../../../helpers/toast-helper";
import { fetchTestInformation } from "../../../../services/test";
import { Link, router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import StatsCard from "../../../../components/StatsCard";
import { ScrollView } from "react-native-gesture-handler";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const INITIAL_TEST_DATA = {
  test: {
    testId: "",
    title: "",
    startTimestamp: new Date(),
    endTimestamp: new Date(),
    teacherId: "",
    maxMarks: 0,
    questionsCount: 0,
    studentCount: 0,
  },
  standings: [],
  highestScore: 0,
  lowestScore: 0,
  avgScore: 0,
};

const TestInfoScreen = () => {
  const [testInformation, setTestInformation] =
    useState<TestStatistics>(INITIAL_TEST_DATA);

  const { testId }: { testId: string } = useLocalSearchParams();

  const handleFetchTestQuestions = async () => {
    try {
      const { data } = await fetchTestInformation(testId);
      const information = data.content;

      setTestInformation(information);
    } catch (error: any) {
      showToast(error.message ?? "Failed to fetch test questions");
    }
  };

  useEffect(() => {
    if (testId !== undefined) handleFetchTestQuestions();
  }, [testId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Information</Text>

      <View>
        <ScrollView horizontal contentContainerStyle={{ gap: 15 }}>
          <StatsCard
            score={testInformation.highestScore}
            title="Highest Score"
          />
          <StatsCard score={testInformation.lowestScore} title="Lowest Score" />
          <StatsCard score={testInformation.avgScore} title="Average Score" />
        </ScrollView>
      </View>

      <View style={styles.progressBarContainer}>
        <AnimatedCircularProgress
          size={200}
          width={25}
          fill={75}
          tintColor="#2C79EF"
          lineCap="round"
          backgroundColor="#eee"
        >
          {(fill) => (
            <Text style={{ fontSize: 32, fontWeight: "800" }}>75%</Text>
          )}
        </AnimatedCircularProgress>

        <View style={styles.progressBarInfoContainer}>
          <View style={styles.indicatorContainer}>
            <View
              style={[styles.colorIndicator, { backgroundColor: "blue" }]}
            ></View>
            <Text style={styles.indicatorText}>Passed</Text>
          </View>
          <View style={styles.indicatorContainer}>
            <View
              style={[styles.colorIndicator, { backgroundColor: "#D9D9D9" }]}
            ></View>
            <Text style={styles.indicatorText}>Failed</Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => router.push(`/teacher/tests/${testId}/standings`)}
        style={styles.viewStandingsButton}
      >
        <Text style={styles.standingsButtonText}>View Standings</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 60,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  statsCardsContainer: {
    gap: 10,
    maxHeight: 200,
  },

  progressBarContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  progressBarInfoContainer: {
    flexDirection: "row",
    gap: 30,
    marginTop: 15,
  },

  indicatorContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  colorIndicator: {
    height: 15,
    width: 15,
    borderRadius: 2,
  },
  indicatorText: {
    fontWeight: "700",
  },

  viewStandingsButton: {
    backgroundColor: "#2C79EF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 40,
  },

  standingsButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default TestInfoScreen;
