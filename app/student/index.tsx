import React, { useState } from "react";
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
import { Link, Slot } from "expo-router";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Sidebarforstudents from "../../components/sidebarforstudents";


type Props = {};

const Student = ({}: Props) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [searchVal, setSearchVal] = useState("");

  const handleSearchField = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setSearchVal(e.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <Slot />
      {isMenuOpen && <Sidebarforstudents toggleSidebar={toggleMenu} />}
      <Searchbar
        style={styles.searchBar}
        value={searchVal}
        onChange={handleSearchField}
      />

      <View style={styles.lectureCardsContainer}>
        <FlashList
          data={new Array(5)}
          renderItem={() => <LectureCard />}
          estimatedItemSize={15}
        />
      </View>

      <View style={styles.bottomTab}>
        <Pressable>
          <EntypoIcon name="home" size={30} color="white" />
        </Pressable>

        <Link href="/ranking">
          <Ionicons name="bar-chart" size={30} color="white" />
        </Link>

        <Link href ='/testscreen'>
          <Ionicons name="analytics" size={30} color="white" />
        </Link>

        <Link href="/studentsetting">
          <Ionicons name="settings-sharp" size={30} color="white" />
        </Link>
      </View>
    </View>
  );
};

export default Student;

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

  lectureCardsContainer: {
    height: "100%",
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