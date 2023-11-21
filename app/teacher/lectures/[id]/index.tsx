import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchLectureVideo } from "../../../../services/lecture";

type Props = {};

const LectureVideo = ({}: Props) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [lectureVideo, setLectureVideo] = useState<
    Omit<Lecture, "_id" | "teacherId">
  >({ description: "", title: "", videoUrl: "" });
  const { id: lectureId } = useLocalSearchParams();

  const handleVideoFetch = async () => {
    try {
      if (typeof lectureId !== "string") return;

      const { data } = await fetchLectureVideo(lectureId);
      const lectureData: Lecture = data.content;

      setLectureVideo(lectureData);
    } catch (error) {
      console.error("Error in fetching lecture video", error);
    }
  };

  useEffect(() => {
    handleVideoFetch();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {lectureVideo.videoUrl && (
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: lectureVideo.videoUrl,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              // console.log(status);
              setStatus(() => status);
            }}
          />
        )}
      </View>

      <View>
        <Text style={styles.lectureTitle}>{lectureVideo.title}</Text>
        <Text style={styles.lectureDescription}>
          {lectureVideo.description}
        </Text>
      </View>
    </View>
  );
};

export default LectureVideo;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },

  video: {
    height: 200,
  },

  lectureTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 10,
  },

  lectureDescription: {
    fontSize: 13,
    textAlign: "justify",
  },
});
