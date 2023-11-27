import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import SettingOptionItem from "../../components/SettingOptionItem";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { showToast } from "../../helpers/toast-helper";
import { fetchUserProfile } from "../../services/profile";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

type Props = {};

const Settings = ({}: Props) => {
  const [profile, setProfile] = useState<Omit<Profile, "userId">>({
    dob: new Date(),
    firstName: "",
    lastName: "",
    school: "",
  });

  const fetchProfile = async () => {
    try {
      const { data } = await fetchUserProfile();
      const { firstName, lastName, school, dob, ...profileData } = data.content;
      setProfile({ firstName, lastName, school, dob });
      // console.log(data);
    } catch (error: unknown) {
      console.log(error);
      showToast("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Header /> */}

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg",
          }}
          alt=""
          style={{ width: 200, height: 200, borderRadius: 9999 }}
          resizeMode="cover"
        />

        <Text style={styles.userName}>
          {" "}
          {`${profile.firstName} ${profile.lastName}`}{" "}
        </Text>

        <Pressable style={styles.editButton}>
          <EntypoIcon name="edit" size={18} />
          <Text>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.optionsContainer}>
        <Link href="/teacher/lectures" asChild replace>
          <SettingOptionItem
            type="material-icon"
            iconName="ondemand-video"
            title="My Lectures"
            iconColor="#F8B758"
            href="/teacher/lectures"
          />
        </Link>

        <Link href="/teacher/notes" asChild replace>
          <SettingOptionItem
            type="material-icon"
            iconName="ondemand-video"
            title="My Notes"
            iconColor="#F8B758"
            href="/teacher/notes"
          />
        </Link>

        <Link href="/teacher/tests" asChild replace>
          <SettingOptionItem
            type="material-icon"
            iconName="ondemand-video"
            title="My Tests"
            iconColor="#F8B758"
            href="/teacher/lectures"
          />
        </Link>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    marginBottom: 50,
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
