import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TeacherHomeScreen = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.logoText}>Logo</Text>
      </View>
      {isMenuOpen && <SidebarMenu navigation={navigation} />}
    </View>
  );
};

const SidebarMenu = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={() => navigation.navigate('Lecture')}>
        <Text>+ Add Lecture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddNotes')}>
        <Text>+ Add Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddStudents')}>
        <Text>+ Add Students</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#145AAC',
    padding: 35,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoText: {
    alignSelf: 'flex-end',
    color: 'white',
  },
  sidebar: {
    backgroundColor: '#145AAC',
    padding: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default TeacherHomeScreen;
