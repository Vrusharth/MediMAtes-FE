import React from 'react';
import Details from '../screens/Patient/Appointment/Details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientDrawer from './PatientNavigation/PatientDrawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Serach from '../screens/Patient/Home/Serach';
import CallIntialize from '../screens/Patient/Appointment/VideoCall/CallIntialize';
import VideoCall from '../screens/Patient/Appointment/VideoCall/VideoCall';
import SearchResult from '../screens/Patient/Home/SearchResult';
import AppointmentDetail from '../screens/Patient/Appointment/AppointmentDetail';


export default function PatientStackNavigation() {
    const Stack = createNativeStackNavigator()
    return (
        <GestureHandlerRootView>
            <Stack.Navigator initialRouteName='PatientDrawer'>
                <Stack.Screen name='PatientDrawer' component={PatientDrawer} options={{ headerShown: false }} />
                <Stack.Screen name='Details' component={Details} options={{ headerShown: false }} />
                <Stack.Screen name='AppointmentDetail' component={AppointmentDetail} options={{ headerShown: false }} />
                <Stack.Screen name='Search' component={Serach} options={{ headerShown: false }} />
                <Stack.Screen name='SearchResult' component={SearchResult} options={{ headerShown: false }} />
                <Stack.Screen name='CallIntialize' component={CallIntialize} options={{ headerShown: false }} />
                <Stack.Screen name='VideoCall' component={VideoCall} options={{ headerShown: false }} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    )
}