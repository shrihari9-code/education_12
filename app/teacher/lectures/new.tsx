import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import LectureCard from "../../../components/LectureCard";

type Props = {};

const AddLecture = ({}: Props) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [videoUri, setVideoUri] = useState("");

  const handleVideoUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true,
      });

      console.log("res", result);
      if (!result.canceled && result.assets.length > 0) {
        let fileUri = result.assets[0];
        console.log("fileuri", fileUri);
        setVideoUri(fileUri.uri);
      } else {
        console.log("No document selected");
      }
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {videoUri ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: videoUri,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => {
              console.log(status);
              setStatus(() => status);
            }}
            //   status={status}
          />
        ) : (
          <View style={styles.noVideoContainer}>
            <Text style={styles.noVideoText}>No video selected</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleVideoUpload}
        >
          <Text style={styles.uploadButtonText}>Select Video from Device</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lecturesContainer}>
        <Text style={styles.lectureHeading}>My Lectures</Text>
        <FlatList
          style={styles.lectureList}
          data={[1, 2, 3]}
          renderItem={(item) => (
            <View style={styles.lectureItem}>
              <Text>Lecture</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(item) => `${item + Math.random() * 1000}`}
        />
      </View>
    </View>
  );
};

export default AddLecture;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
  video: {
    height: 200,
  },
  noVideoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    backgroundColor: "black",
  },
  noVideoText: {
    color: "white",
  },
  uploadButton: {
    backgroundColor: "#0077B6",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  uploadButtonText: {
    color: "white",
    textAlign: "center",
  },

  lecturesContainer: {
    marginVertical: 25,
  },

  lectureHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },

  lectureList: {
    marginVertical: 10,
  },
  lectureItem: {
    height: 200,
    backgroundColor: "#E5E5E5",
  },
});
