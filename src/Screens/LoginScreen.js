import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
    const theme = useTheme();
    const LoginAs = [
        {Author: 'Teacher'},
        {Author: 'Student'}
    ];
    const [selectedAuthor, setselectedAuthor] = useState('Login As');
    const [isPressed, setisPressed] = useState(false);
    const [data, setData] = useState(LoginAs);
    
    const handleLogin = () =>{
        if(selectedAuthor === 'Teacher'){
            navigation.navigate("TeacherHomeScreen")
        }
        else if(selectedAuthor === 'Student'){
            navigation.navigate("StudentHomeScreen")
        }
    }
  return (
    <SafeAreaView>
        <View style={
            styles.container
        }> 
            <TouchableOpacity 
            onPress={()=>{
                setisPressed(!isPressed)
            }}
            style={
               styles.loginasopacity
            }>
                <Text 
                style={
                    styles.loginastext
                }>{selectedAuthor}</Text>
                {isPressed?
                (
                    <Entypo name="chevron-up" size={25}/>
                ):(
                    <Entypo name="chevron-down" size={25}/>
                )}   
            </TouchableOpacity>
            {isPressed?(
                <View style={
                    styles.dropdowncontainer
                }>
                    <FlatList 
                        data={data}
                        renderItem={({
                            item, index
                        }) =>{
                            return(
                                <TouchableOpacity 
                                style={
                                    styles.dropdownopacity
                                }
                                    onPress={()=>{
                                        setselectedAuthor(item.Author)
                                        setisPressed(false)
                                    }}
                                >
                                    <Text style={
                                        styles.dropdowntext
                                    }>
                                        {item.Author}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            ):null}
            <View></View>
            <View style={
                styles.emailcontainer
            }>
            <Ionicons name="mail-outline" size={25} style={
                styles.emailicon
            }/>
            <TextInput 
                label='Email'
                style={
                    styles.emailinput
                }
                keyboardType='email-address'
            />
            </View>
            <View style={
                styles.passwordcontainer
            }>
            <Feather name="lock" size={25} style={
               styles.passwordicon 
            }/>
            <TextInput 
                label='Password'
                secureTextEntry
                style={
                    styles.passwordinput    
                }
            />
            </View>
            <TouchableOpacity 
            onPress={()=>{
                console.log("Ready to Login")
                handleLogin()
            }}
            style={
                styles.loginopacity
            }>
                <Text style={
                    styles.logintext
                }>
                    Login
                </Text>
            </TouchableOpacity>
            <Text style={
                styles.loginwithtext
            }>or Login with</Text>
            <TouchableOpacity 
            onPress={()=>{
                console.log("Ok Google")
            }}
            style={
                styles.googleopacity
            }>
                <Image source={require('../assets/Images/Google.png')} 
                style={
                    styles.googleimage
                }/>
            </TouchableOpacity>
            <Image source={require('../assets/Images/image_12.png')} 
                style={
                    styles.decorativeimage
                }
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    loginasopacity: {
        marginTop: 150,
        alignSelf: 'center',
        borderWidth: 1,
        padding: 3,
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loginastext: {
        fontSize: 20,
        color: 'black',
        marginLeft: 5
    },
    emailcontainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    emailicon: {
        marginTop: 60,
        borderBottomWidth: 1
    },
    emailinput:{
        width: '50%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 40
    },
    passwordcontainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    passwordicon: {
        marginTop: 25,
        borderBottomWidth: 1
    },
    passwordinput: {
        width: '50%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 10
    },
    loginopacity: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: '#145AAC',
        width: '70%',
        padding: 12,
        borderRadius: 10,
    },
    logintext: {
        color: 'white',
        fontSize: 17
    },
    loginwithtext: {
        alignSelf: 'center',
        marginTop: 15,
        color: 'black',
        fontSize: 17,
        fontWeight: '400'
    },
    googleopacity: {
        alignSelf: 'center'
    },
    googleimage: {
        width: 10,
        height: 20,
        padding: 30,
        marginTop: 20
    },
    decorativeimage: {
        width: 310,
        height: 300,
        alignSelf: 'center'
    },
    dropdowncontainer: {
        width: '40%',
        height: 100,
        marginTop: 10,
        elevation: 5,
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    dropdowntext: {
        alignSelf: 'center',
        marginTop: 18,
        fontSize: 18,
        color: 'black',
        borderBottomWidth: 1,
    },
    dropdownopacity: {
        alignSelf: 'center',
        width: '70%',
    }
})

export default LoginScreen;