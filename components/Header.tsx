import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

type Props = {
  toggleMenu?: () => void;
};

const Header = ({ toggleMenu }: Props) => {
  const handleNavigation = () => {
    if (toggleMenu !== undefined) toggleMenu();
    else router.back();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleNavigation}>
        <Ionicons
          name={toggleMenu ? "menu" : "chevron-back-outline"}
          size={30}
          color="white"
        />
      </TouchableOpacity>

      <Text style={styles.logoText}>Logo</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#145AAC",
    padding: 30,
    paddingTop: 67,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    color: "white",
  },
});
