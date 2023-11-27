import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { FlatList } from "react-native";
import LectureCard from "../../../components/LectureCard";
import { showToast } from "../../../helpers/toast-helper";
import { fetchLectures } from "../../../services/lecture";

type Props = {};

const Lectures = ({}: Props) => {
  const [lectures, setLectures] = useState<LectureDetails[]>([]);

  const handleFetchLectures = async () => {
    try {
      const { data } = await fetchLectures();

      const lectureDetailsArr = data.content;
      // console.log(lectureDetailsArr);
      setLectures(lectureDetailsArr);
    } catch (err) {
      console.log(err);
      showToast("Error fetching lecture details");
    }
  };

  useEffect(() => {
    handleFetchLectures();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.lecturesContainer}>
        <Text style={styles.lectureHeading}>My Lectures</Text>
        <FlatList
          style={styles.lectureList}
          data={lectures}
          renderItem={({ item }) => (
            <LectureCard
              lectureId={item._id}
              title={item.title}
              videoUrl={item.videoUrl}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default Lectures;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  lecturesContainer: {
    marginVertical: 25,
  },

  lectureHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },

  lectureList: {
    marginVertical: 10,
    marginBottom: 80,
  },
  lectureItem: {
    height: 200,
    backgroundColor: "#E5E5E5",
  },
});
