import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const LectureScreen = () => {
  const [videoUri, setVideoUri] = useState(null);

  useEffect(() => {
    // You can initialize the video here if you have a default video to show
    // setVideoUri('file:///path_to_default_video.mp4');
  }, []);

  const handleVideoUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      console.log("res",result)

      if (result) {
        let fileUri = result;
        console.log("fileuri",fileUri)
        
        if (fileUri.uri.startsWith('content://')) {
          // Convert content URI to file URI
          fileUri = await copyContentUriToFileUri(fileUri);
        }

        console.log('Selected video URI:', fileUri);
        setVideoUri(fileUri);
      } else {
        console.log('No document selected');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document selection canceled');
      } else {
        console.error('Error selecting document:', error);
      }
    }
  };

  const copyContentUriToFileUri = async (contentUri) => {
    const fileName = contentUri.substring(contentUri.lastIndexOf('/') + 1);
    const destPath = RNFS.CachesDirectoryPath + '/' + fileName;

    try {
      await RNFS.copyFile(contentUri, destPath);
      return 'file://' + destPath;
    } catch (error) {
      console.error('Error copying content URI:', error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {videoUri ? (
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          controls={true}
        />
      ) : (
        <View style={styles.noVideoContainer}>
          <Text style={styles.noVideoText}>No video selected</Text>
        </View>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={handleVideoUpload}>
        <Text style={styles.uploadButtonText}>Select Video from Device</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },
  video: {
    width: 300,
    height: 200,
  },
  noVideoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 200,
    backgroundColor: 'black',
  },
  noVideoText: {
    color: 'white',
  },
  uploadButton: {
    backgroundColor: '#0077B6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LectureScreen;
