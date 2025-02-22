import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import GetStarted from '../screens/authentication/Welcome/GetStarted'
import SignUpNavigator from './SignupNavigation'
import LoginNavigator from './LoginNavigation'
import SetPassword from '../screens/authentication/Login/SetPassword'
import VerificationCode from '../screens/authentication/VerificationCode'
import Success from '../screens/authentication/Success'

export default function StackNavigation() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='GetStarted' component={GetStarted} options={{ headerShown: false }} />
            <Stack.Screen name='SignUpNavigator' component={SignUpNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='LoginNavigator' component={LoginNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='VerificationCode' component={VerificationCode} options={{ headerShown: false }} />
            <Stack.Screen name='Success' component={Success} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})