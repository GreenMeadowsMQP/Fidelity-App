// App.js
import React, { useCallback,useState,useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import HomePage from './HomePage'; // Import the new component
import Watchlist from './Watchlist';
import Profile from './Profile';
import StockPage from './StockPage';
import Filter from './Filter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font'

//Force a change

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
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="WatchList" component={Watchlist}  options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false }}/>
        <Stack.Screen name="StockPage" component={StockPage}  options={{ headerShown: false }}/>
        <Stack.Screen name="Filter" component={Filter}  options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer> 
   
  );
}
