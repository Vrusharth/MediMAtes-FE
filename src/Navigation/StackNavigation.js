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
import DoctorNavigator from './DoctorNavigation'
import CompleteDoctorProfile from '../screens/authentication/CompleteProfile/DoctorProfile/CompleteDoctorProfile'
import DoctorAccountSetting from '../screens/authentication/CompleteProfile/DoctorProfile/DoctorAccountSetting'
import CompletePatientProfile from '../screens/authentication/CompleteProfile/PatientProfile/CompletePatientProfile'
import PatientPastMedicalHistory from '../screens/authentication/CompleteProfile/PatientProfile/PatientPastMedicalHistory'
import PatientHealthReport from '../screens/authentication/CompleteProfile/PatientProfile/PatientHealthReport'
import PatientStackNavigation from './PatentStackNavigation'

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
            <Stack.Screen name='CompleteDoctorProfile' component={CompleteDoctorProfile} options={{ headerShown: false }} />
            <Stack.Screen name='DoctorAccountSetting' component={DoctorAccountSetting} options={{ headerShown: false }} />
            <Stack.Screen name='CompletePatientProfile' component={CompletePatientProfile} options={{ headerShown: false }} />
            <Stack.Screen name='PatientPastMedicalHistory' component={PatientPastMedicalHistory} options={{ headerShown: false }} />
            <Stack.Screen name='PatientHealthReport' component={PatientHealthReport} options={{ headerShown: false }} />
            <Stack.Screen name='DoctorNavigator' component={DoctorNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='PatientStackNavigation' component={PatientStackNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})