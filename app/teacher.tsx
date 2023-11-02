import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Sidebar from "../components/Sidebar";
import { Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import LectureCard from "../components/LectureCard";

type Props = {};

const Teacher = ({}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearchField = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setSearchVal(e.nativeEvent.text);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      {/* <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.logoText}>Logo</Text>
        </View>
      </View> */}

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

        <Pressable>
          <Ionicons name="settings-sharp" size={30} color="white" />
        </Pressable>

        <Pressable>
          <Ionicons name="settings-sharp" size={30} color="white" />
        </Pressable>

        <Pressable>
          <Ionicons name="settings-sharp" size={30} color="white" />
        </Pressable>
      </View>

      {isMenuOpen && <Sidebar toggleSidebar={toggleMenu} />}
    </View>
  );
};

export default Teacher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#145AAC",
    padding: 35,
    paddingTop: 67,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoText: {
    alignSelf: "flex-end",
    color: "white",
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
