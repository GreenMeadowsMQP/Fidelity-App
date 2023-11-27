import React, { useCallback, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import HomePage from './HomePage';
import Watchlist from './Watchlist';
import Profile from './Profile';
import StockPage from './StockPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          animationEnabled: false,
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="WatchList" component={Watchlist} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="StockPage" component={StockPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
