import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import SettingOptionItem from "../components/SettingOptionItem";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

type Props = {};

const Settings = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg",
          }}
          alt=""
          style={{ width: 200, height: 200, borderRadius: 9999 }}
          resizeMode="cover"
        />

        <Text style={styles.userName}> Raamlaal Thakur </Text>

        <Pressable style={styles.editButton}>
          <EntypoIcon name="edit" size={18} />
          <Text>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 35,
    gap: 10,
  },

  userName: {
    fontWeight: "600",
    fontSize: 20,
  },

  editButton: {
    flexDirection: "row",
    gap: 10,
    borderColor: "#EEE000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10000,
    borderWidth: 1,
  },

  optionsContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    padding: 20,
    minHeight: "50%",
  },
});
