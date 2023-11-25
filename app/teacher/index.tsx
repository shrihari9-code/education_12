import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
  FlatList,
  TextInputEndEditingEventData,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Sidebar from "../../components/Sidebar";
import { Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import LectureCard from "../../components/LectureCard";
import { Link } from "expo-router";
import { fetchLectures } from "../../services/lecture";
import { showToast } from "../../helpers/toast-helper";

type Props = {};

const Page = ({}: Props) => {
  const [searchVal, setSearchVal] = useState("");
  const [lectures, setLectures] = useState<LectureDetails[]>([]);

  const handleSearchField = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setSearchVal(e.nativeEvent.text);
  };

  // const filterLectures = (
  //   event: NativeSyntheticEvent<TextInputEndEditingEventData>
  // ) => {
  //   const searchText = event.nativeEvent.text;
  //   console.log(searchText);

  //   setLectures((lectures) =>
  //     lectures.filter((lecture) => {
  //       return lecture.title.includes(searchText);
  //     })
  //   );
  // };

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
      <Searchbar
        style={styles.searchBar}
        value={searchVal}
        onChange={handleSearchField}
        // onEndEditing={filterLectures}
      />

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

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 10,
  },

  lecturesContainer: {
    marginVertical: 25,
    marginHorizontal: 15,
  },

  lectureHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },

  lectureList: {
    marginVertical: 10,
  },
  lectureItem: {
    height: 200,
    backgroundColor: "#E5E5E5",
  },
});
