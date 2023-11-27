import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  toggleSidebar: () => void;
};

const routes = [
  // {
  //   title: "+ Add Lecture",
  //   link: "/teacher/lectures/new",
  // },
  {
    title: "+ Add Students",
    link: "/teacher/add-student",
  },
  {
    title: "+ Add Notes",
    link: "/teacher/notes/add",
  },
  {
    title: "+ Create Test",
    link: "/teacher/tests/create",
  },
];

const Sidebar = ({ toggleSidebar }: Props) => {
  const handleNavigation = (link: any) => {
    if (link === "") return;

    router.replace(link);
    toggleSidebar();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      router.replace("/");
    } catch (error: unknown) {
      console.log(error);
      ToastAndroid.show("Logout Operation failed", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={toggleSidebar}>
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>

      <FlatList
        data={routes}
        style={styles.sidebarItemContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigation(item.link)}
            style={styles.sidebarItem}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.link}-${Math.random() * 190}`}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />

      <View style={styles.sidebarActions}>
        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={() => {
            router.push("/teacher/students");
            toggleSidebar();
          }}
        >
          <Text> & My Students</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
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
