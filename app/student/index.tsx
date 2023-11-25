import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import LectureCard from "../../components/LectureCard";
import { fetchStudentLectures } from "../../services/lecture";
import { showToast } from "../../helpers/toast-helper";
import { FlatList } from "react-native-gesture-handler";

type Props = {};

const Student = ({}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [searchVal, setSearchVal] = useState("");
  const [lectures, setLectures] = useState<LectureDetails[]>([]);

  const handleFetchLectures = async () => {
    try {
      const { data } = await fetchStudentLectures();

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

  const handleSearchField = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setSearchVal(e.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        value={searchVal}
        onChange={handleSearchField}
      />

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

  sidebar: {
    backgroundColor: "#145AAC",
    padding: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    width: "100%",
    top: 0,
    bottom: 0,
    zIndex: 1,
  },

  searchBar: {
    marginVertical: 10,
  },

  lectureCardsContainer: {
    height: "100%",
  },

  lectureList: {
    marginVertical: 10,
  },

  bottomTab: {
    backgroundColor: "#145AAC",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
