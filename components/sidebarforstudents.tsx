import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link, router } from "expo-router";

type Props = {
  toggleSidebar: () => void;
};

const routes = [
  {
    title: "+ View Notes",
    link: "",
  },
  {
    title: "+ View Videos",
    link: "",
  },
  {
    title: "+ View Question Paper's ",
    link: "",
  },
];

const Sidebarforstudents = ({ toggleSidebar }: Props) => {
  const handleNavigation = (link: any) => {
    if (link === "") return;

    router.replace(link);
    toggleSidebar();
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

        <TouchableOpacity style={styles.signOutButton}>
          <Text> Sign Out </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebarforstudents;

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
