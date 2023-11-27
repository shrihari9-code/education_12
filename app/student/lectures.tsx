import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LectureCard from "../../components/LectureCard";
import { fetchStudentLectures } from "../../services/lecture";
import { showToast } from "../../helpers/toast-helper";
import { FlatList } from "react-native-gesture-handler";

type Props = {};

const Student = ({}: Props) => {
  const [lectures, setLectures] = useState<LectureDetails[]>([]);

  const handleFetchLectures = async () => {
    try {
      const { data } = await fetchStudentLectures();

      const lectureDetailsArr = data.content;
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
      <View style={styles.lectureCardsContainer}>
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

export default Student;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  lectureCardsContainer: {
    height: "100%",
  },

  lectureList: {
    marginVertical: 10,
  },
});
