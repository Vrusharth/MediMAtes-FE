import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import GetStarted from '../screens/authentication/Welcome/GetStarted'

export default function StackNavigation() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='GetStarted' component={GetStarted} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})