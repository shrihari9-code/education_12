import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './src/Screens/LoginScreen'
import TeacherHomeScreen from './src/Screens/TeacherHomeScreen'
import StudentHomeScreen from './src/Screens/StudentHomeScreen'

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name='TeacherHomeScreen' component={TeacherHomeScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name='StudentHomeScreen' component={StudentHomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App