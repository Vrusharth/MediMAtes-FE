import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginWithOTP from '../screens/authentication/Login/LoginWithOtp';
import LoginWithEmail from '../screens/authentication/Login/LoginWithEmail';
import ResetPassword from '../screens/authentication/Login/ResetPassword';
import SetPassword from '../screens/authentication/Login/SetPassword';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoginWithEmail">
            <Stack.Screen name="LoginWithOTP" component={LoginWithOTP} options={{ headerShown: false }} />
            <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
            <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default LoginNavigator;