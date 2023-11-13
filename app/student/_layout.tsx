import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, Slot } from "expo-router";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Sidebarforstudents from "../../components/sidebarforstudents";

type Props = {};

const Layout = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <Slot />
      {isMenuOpen && <Sidebarforstudents toggleSidebar={toggleMenu} />}

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
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
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
