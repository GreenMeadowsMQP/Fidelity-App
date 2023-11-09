// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './HomePage'; // Import the new component
import Watchlist from './Watchlist';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY
const Stack = createStackNavigator();


export default function App() {
  const [newsContent, setNewsContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get('http://' + myIP + ':3000/getNews');
        setNewsContent(response.data.content);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    fetchNews();
  }, []);

  const handleSwipe = () => {
    setCurrentIndex((prevIndex) => {
      // Increment the index unless we're at the last card.
      const nextIndex = prevIndex + 1;
      return nextIndex < newsContent.length ? nextIndex : prevIndex;
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage}
        initialParams={{
          newsContent: newsContent,
          currentIndex: currentIndex,
          handleSwipe: handleSwipe,
        }} />
        <Stack.Screen name="WatchList" component={Watchlist} 
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
