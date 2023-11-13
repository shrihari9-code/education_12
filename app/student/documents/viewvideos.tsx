// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Vid } from 'react-native';

// // Dummy data for video URIs
// const dummyVideoData = [
//   { id: '1', uri: 'https://example.com/video1.mp4', title: 'Video 1' },
//   { id: '2', uri: 'https://example.com/video2.mp4', title: 'Video 2' },
//   // Add more video data as needed
// ];

// const VideoListScreen = () => {
//   const [videos, setVideos] = useState([]); // Initialize with an empty array

//   useEffect(() => {
//     // Fetch video data from your database or storage
//     // For this example, we'll use the dummyVideoData
//     setVideos(dummyVideoData);
//   }, []);

//   const renderVideoItem = ({ item }) => (
//     <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoPress(item.uri)}>
//       <Video source={{ uri: item.uri }} style={styles.video} />
//       <Text style={styles.videoTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   const handleVideoPress = (uri) => {
//     // Implement navigation or any action when a video is pressed
//     console.log(`Video pressed: ${uri}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>All Videos</Text>
//       <FlatList
//         data={videos}
//         keyExtractor={(item) => item.id}
//         renderItem={renderVideoItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   videoItem: {
//     marginBottom: 20,
//   },
//   video: {
//     width: '100%',
//     height: 200,
//   },
//   videoTitle: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#555',
//   },
// });

// export default VideoListScreen;
