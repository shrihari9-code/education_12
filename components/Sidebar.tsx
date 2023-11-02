import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  toggleSidebar: () => void;
};

const Sidebar = ({ toggleSidebar }: Props) => {
  const handleNavigation = () => {};

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={toggleSidebar}>
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.sidebarItemContainer}>
        <TouchableOpacity style={styles.sidebarItem} onPress={handleNavigation}>
          <Text>+ Add Lecture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={handleNavigation}>
          <Text>+ Add Students</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={handleNavigation}>
          <Text>+ Add Notes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItem} onPress={handleNavigation}>
          <Text>+ Start Test</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sidebarActions}>
        <TouchableOpacity style={styles.sidebarItem}>
          <Text> & My Students</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton}>
          <Text> Sign Out </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#145AAC",
    padding: 35,
    paddingTop: 67,
    borderTopRightRadius: 10,
    position: "absolute",
    width: "80%",
    height: "100%",
    zIndex: 1,
  },

  sidebarItemContainer: {
    marginTop: 40,
    gap: 20,
  },

  sidebarItem: {
    backgroundColor: "white",
    padding: 10,
    fontSize: "18px",
    borderRadius: 7,
  },

  sidebarActions: {
    position: "absolute",
    bottom: 0,
    padding: 35,
    gap: 50,
    width: "100%",
  },

  signOutButton: {
    backgroundColor: "white",
    padding: 10,
    fontSize: "18px",
    borderRadius: 7,
  },
});
