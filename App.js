import { View, Text } from 'react-native'
import React from 'react'
import './reanimatedConfig';
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './src/utils/navRef'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import StackNavigation from './src/Navigation/StackNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProviders } from './AppProvider';


const queryClient = new QueryClient();

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <AppProviders>
          <NavigationContainer ref={navigationRef}>
            <StackNavigation />
          </NavigationContainer>
        </AppProviders>
      </QueryClientProvider>
  )
}