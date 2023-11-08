import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import axios from 'axios';
import SwipeableCard from './SwipeableCard'; // Make sure the path is correct
import Toolbar from './Toolbar';
import HomeBar from './homebar';

const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY
export let cards = [];

export default function App() {
  const [newsContent, setNewsContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get('http://'+ myIP +':3000/getNews');
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
  const renderCards = () => {
    // cards = [];
    if(cards.length > 1){
      cards = [];
    }
  
    // Add the current card to the cards array.
    if (newsContent[currentIndex]) {
      cards.push(
        <SwipeableCard
          key={`card-${currentIndex}`}
          item={newsContent[currentIndex]}
          
          onSwipe={currentIndex < newsContent.length - 1 ? handleSwipe : null}
          style={styles.topCard}
        />
      );
    }
    
    // Add the next card to the cards array if it exists.
    const nextIndex = currentIndex + 1;
    if (nextIndex < newsContent.length) {
      cards.push(
        <SwipeableCard
          key={`card-${nextIndex}`}
          item={newsContent[nextIndex]}
          
          style={styles.behindCard}
        />
      );
    }
    
    return cards;
  };
  
  

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
      <Text style={styles.appTitle}>StockADE</Text>
    </View>
    <View style={styles.cardStack}>
      {renderCards()}
      
    </View>
    <HomeBar />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F2E8CF', 
    paddingTop:5,
    zIndex:0,
  },
  cardStack: {
    width: '98%',
    height: '70%',
    position: 'relative',
  },
  behindCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1, 
  },
  topCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
    alignSelf: 'flex-start', 
    padding: 0, 
  },
  logo: {
    width: 70, 
    height: 70, 
    resizeMode: 'contain', 
  },
  appTitle: {
    fontWeight: 'bold',
    fontSize: 30, 
    marginLeft:-15,
  }
  
});

