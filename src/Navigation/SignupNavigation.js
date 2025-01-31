import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NameEmail from '../screens/authentication/Signup/NameEmail';
import TermAndCondition from '../screens/authentication/Signup/TermAndCondition';

const Stack = createNativeStackNavigator();

const SignUpNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="NameEmail">
            <Stack.Screen name="NameEmail" component={NameEmail} options={{ headerShown: false }} />
            <Stack.Screen name="TermAndCondition" component={TermAndCondition} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default SignUpNavigator;