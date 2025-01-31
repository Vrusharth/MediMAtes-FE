// AppProviders.js
import React from 'react';
import UserProvider from './src/Context/UserContext';

export const AppProviders = ({ children }) => {
    return (
        <UserProvider>
            {/* any new provider  */}
            {children}
        </UserProvider>
    );
};