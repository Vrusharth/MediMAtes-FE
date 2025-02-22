import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignupWithEmail from '../screens/authentication/Signup/SignupWithEmail';
import TermAndCondition from '../screens/authentication/Signup/TermAndCondition';

const Stack = createNativeStackNavigator();

const SignUpNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SignupWithEmail">
            <Stack.Screen name="SignupWithEmail" component={SignupWithEmail} options={{ headerShown: false }} />
            <Stack.Screen name="TermAndCondition" component={TermAndCondition} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default SignUpNavigator;