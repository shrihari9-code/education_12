import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, Slot } from "expo-router";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import OctiIcon from "react-native-vector-icons/Octicons";

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
      {isMenuOpen && <Sidebar toggleSidebar={toggleMenu} />}

      <View style={styles.bottomTab}>
        <Link href="/teacher">
          <EntypoIcon name="home" size={30} color="white" />
        </Link>

        <Link href="/teacher/notes">
          <MaterialIcon name="notes" size={30} color="white" />
        </Link>

        <Link href="/teacher/tests">
          <OctiIcon name="pencil" size={25} color="white" />
        </Link>

        <Link href="/teacher/settings">
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
    alignItems: "center",
    padding: 20,
  },
});
