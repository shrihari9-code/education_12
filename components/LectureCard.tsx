import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

type Props = {
  lectureId: string;
  title: string;
};

const LectureCard = ({ lectureId, title }: Props) => {
  const handleLectureVideoNavigation = () => {
    router.setParams({
      lectureId,
    });
    router.push(`/teacher/lectures/${lectureId}`);
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
      <Text style={styles.lectureTitle}>{title}</Text>
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
    height: 180,
    objectFit: "cover",
  },

  lectureTitle: {
    // textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 5,
  },
});
