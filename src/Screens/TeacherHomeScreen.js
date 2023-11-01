import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
// import BottomNavigator from '../src/BottomTabs/BottomNavigator';

const TeacherHomeScreen = ({navigation}) => {
  return (
    <View>
      <View style={{
        backgroundColor: '#145AAC',
        padding: 35,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <TouchableOpacity 
          onPress={()=>{
            navigation.navigate("Menu")
          }}
        >
          <Ionicons name="menu" size={30} color="white"/>
        </TouchableOpacity>
        <Text style={{
          alignSelf: 'flex-end',
          color: 'white'
        }}>Logo</Text>
        </View>
      </View>
      <View style={{
        backgroundColor: '#145AAC',
        padding: 35,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 760,
        position: 'absolute',
        width: "100%"
      }}>
        {/* <BottomNavigator/> */}
        {/* <Image source={require("../assets/Images/home.png")} style={{
          width: 30,
          height:30,
        }}/> */}
      </View>
    </View>
  )
}

export default TeacherHomeScreen

const styles = StyleSheet.create({})

//gear
//Google
//home
//image_12