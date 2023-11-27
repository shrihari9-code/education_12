import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { showToast } from "../helpers/toast-helper";

type Props = {
  lectureId: string;
  title: string;
  videoUrl: string;
};

const LectureCard = ({ lectureId, title, videoUrl }: Props) => {
  const handleLectureVideoNavigation = async () => {
    router.setParams({
      lectureId,
    });
    // router.push(`/teacher/lectures/${lectureId}`);

    try {
      const isUrlValid = await Linking.canOpenURL(videoUrl);
      if (!isUrlValid) throw new Error("Invalid video url");

      await Linking.openURL(videoUrl);
    } catch (error: any) {
      showToast(error?.message ?? "Failed to open the lecture");
    }
  };
  return (
    <Pressable
      style={styles.lectureCard}
      onPress={handleLectureVideoNavigation}
    >
      <Image
        source={{
          uri: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/274952132/original/95ce2f72c4df511f11f8d3b887df783b14b5fff5/design-amazing-youtube-thumbnails-in-1-hour.jpg",
        }}
        alt=""
        style={styles.lectureThumbnail}
      />
      <Text style={styles.lectureTitle} numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
};

export default LectureCard;

const styles = StyleSheet.create({
  lectureCard: {
    backgroundColor: "#E5E3E3",
    padding: 15,
    borderRadius: 8,
  },

  lectureThumbnail: {
    height: 150,
    objectFit: "cover",
  },

  lectureTitle: {
    // textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 5,
  },
});
