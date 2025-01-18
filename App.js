import { View, Text } from 'react-native'
import React from 'react'
import './reanimatedConfig';
import Splash from './src/screens/Splash'
import GetStarted from './src/screens/authentication/Welcome/GetStarted'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './src/utils/navRef'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        <GetStarted />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}