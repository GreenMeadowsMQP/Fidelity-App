// App.js
import React, { useState, useEffect } from 'react';
import HomePage from './HomePage'; // Import the new component
import Watchlist from './Watchlist';
import Profile from './Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Trading from './Trading.js';
import { View } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="HomePage">
    //     <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
    //     <Stack.Screen name="WatchList" component={Watchlist}  options={{ headerShown: false }}/>
    //     <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false }}/>
    //   </Stack.Navigator>
    // </NavigationContainer> 
    <View>
      <Trading></Trading>
    </View>

  );
}
