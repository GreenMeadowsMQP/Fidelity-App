import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

import axios from 'axios';
import Toolbar from './Toolbar.js'; 





export default function App() {
  
  const [firstItem, setFirstItem] = useState(null);
 

  // useEffect(() => {
  //   async function fetchNews() {
  //     try {
  //       const response = await axios.get('http://192.168.1.12:3000/getNews'); // Make sure the IP is correct and if using on phone look up the IP on the expo app 
  //       const newsContent = response.data.content;
  //       if (newsContent && Array.isArray(newsContent) && newsContent.length > 0) {
  //         setFirstItem(newsContent[0]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching news:', error);
  //     }
  //   }
  //   fetchNews();
  // }, []);
  const handleButton1Press = () => {
    console.log('Button 1 pressed');
    // Handle Button 1 Press
  };

  const handleButton2Press = () => {
    console.log('Button 2 pressed');
    // Handle Button 2 Press
  };

  const handleButton3Press = () => {
    console.log('Button 3 pressed');
    // Handle Button 3 Press
  };

  // If there is no data yet placeholder 
  if (!firstItem) {
    return (
      <View style={styles.container}>
         <View style={styles.header}>
        <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
        <Text style={styles.name}>StockADE</Text> 
      </View>
        <View style={styles.newsItem}>
        <Text>Loading...</Text>
        </View>
        <Toolbar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>StockADE</Text> 
        <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
      <View style={styles.newsItem}>
        <Text style={styles.symbol}>{firstItem.symbol}</Text>
        <Text style={styles.headline}>{firstItem.headline}</Text>
      </View>
      <Toolbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Aligns children vertically in the middle
    alignItems: 'center', // Aligns children horizontally in the middle
    backgroundColor: '#F2E8CF', // White background
    paddingTop:5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // This will align items vertically in the center.
    alignSelf: 'flex-start', // Aligns the header view to the start of the cross axis (left side).
    padding: 0, // Adjust padding as needed.
  },
  newsItem: {
    width: '100%', // Takes up 80% of the container width
    height:'70%',
    padding: 20, // Inner spacing for the news item
    marginBottom:5, // Outer spacing for the news item
    backgroundColor: '#A7C957', // Changed color for the news item to be visible
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android (shadow for iOS is handled above)
  },
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8, // Space between the symbol and headline
  },
  headline: {
    fontSize: 16,
  },
  logo: {
    width: 70, // Set the width as needed.
    height: 70, // Set the height as needed.
    resizeMode: 'contain', // Keeps the aspect ratio of the image.
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30, 
    marginLeft:-15,
    
  }

});
