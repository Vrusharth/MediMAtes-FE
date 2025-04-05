import React from 'react';
import Details from '../screens/Patient/Appointment/Details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientDrawer from './PatientNavigation/PatientDrawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function PatientStackNavigation() {
    const Stack = createNativeStackNavigator()
    return (
        <GestureHandlerRootView>
            <Stack.Navigator initialRouteName='PatientDrawer'>
                <Stack.Screen name='PatientDrawer' component={PatientDrawer} options={{ headerShown: false }} />
                <Stack.Screen name='Details' component={Details} options={{ headerShown: false }} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    )
}