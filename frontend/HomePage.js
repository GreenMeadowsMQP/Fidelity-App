// HomePage.js
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwipeableCard from './SwipeableCard';
import TradeActionModal from './TradeActionModal';
import HomeBar from './HomeBar';
import Header from './Header';
import axios from 'axios';
import styles from './styles';
import Overlay from './Overlay';
import { myIP } from './config';





export let cards = [];

const HomePage = ({ route, navigation }) => {
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [newsContent, setNewsContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSymbols, setActiveSybols] = useState([])
  const [currentSymbol, setCurrentSymbol] = useState('');


  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  useEffect(() => {
   
    fetchNews();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNews(); // Trigger the data fetching when the screen comes into focus
      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, [])
  );

  async function fetchNews() {
    try {
      const activeSymbolResponse = await axios.get('http://' + myIP + ':3000/getActiveSymbols');
      // const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];
      const symbols = activeSymbolResponse.data;
      if(activeSymbols.every((value, index) => value === symbols[index])){
        setNewsContent([])
      }
      setActiveSybols(symbols);
      for (const curSymbol of symbols) {
        console.log('Getting news of ', curSymbol)
        const response = await axios.get('http://' + myIP + ':3000/getNews?symbols=' + `${curSymbol}`);
        const first20Entries = response.data.content.slice(0,20)
        setNewsContent(prevNewsContent => [...prevNewsContent, ...first20Entries]);
      }
      setNewsContent(prevNewsContent => orderByDateTime(prevNewsContent));
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  function orderByDateTime(newsContentArray) {
    // Use the sort method with a comparison function
    newsContentArray.sort((a, b) => {
      // Convert dateTime strings to Date objects for comparison
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
  
      // Compare dates
      if (dateA > dateB) {
        return -1; // Return a negative value for descending order
      } else if (dateA < dateB) {
        return 1; // Return a positive value for ascending order
      } else {
        return 0; // Dates are equal
      }
    });
  
    // The array is now sorted by dateTime
    return newsContentArray;
  }
  
  const handleSwipe = () => {
    setCurrentIndex((prevIndex) => {
      // Increment the index unless we're at the last card.
      console.log('newsContent length: ', newsContent.length)
      const nextIndex = prevIndex + 1;
      console.log('Prev Index: ', prevIndex, ' next index: ', nextIndex)

      return nextIndex < newsContent.length ? nextIndex : prevIndex;
    });
  };
  const handleUpSwipe = () => {
    setShowTradeModal(true);
    setCurrentSymbol(newsContent[currentIndex].symbol);
  };

  const renderCards = () => {
    console.log('Rendering cards...')
    if (newsContent.length > 1) {
      cards = [];
    }

    console.log('News Content: ', newsContent, ' current index: ', currentIndex )

    // Add the current card to the cards array.
    if (newsContent[currentIndex]) {
      console.log('Pushing interactable card')
      cards.push(
        <SwipeableCard
          key={`card-${currentIndex}`}
          item={newsContent[currentIndex]}
          onSwipe={currentIndex < newsContent.length - 1 ? handleSwipe : null}
          onUpSwipe={handleUpSwipe}
          style={[styles.absoluteFill,{zIndex:2}]}
        />
      );
    }

    // Add the next card to the cards array if it exists.
    const nextIndex = currentIndex + 1;
    if (nextIndex < newsContent.length) {
      console.log('Pushing background card')
      cards.push(
        <SwipeableCard
          key={`card-${nextIndex}`}
          item={newsContent[nextIndex]}
          style={[styles.absoluteFill,{zIndex:1}]}
        />
      );
    }
    console.log('Returning cards')
    return cards;
  };

  return (
    <View style={styles.unsafearea}>
      <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Header title ={'StockADE'} onInfoPress={openPopup} navigation={navigation}/>
      <View style={styles.card}>{renderCards()}</View>
      <HomeBar navigation={navigation} />
      <TradeActionModal visible={showTradeModal}onClose={() => setShowTradeModal(false)}symbol={currentSymbol}/> 

      {showPopup && (
        <Overlay onClose={closePopup}>
          <Text style={styles.overlayText}>Swipe Left: Ignore Stock</Text>
          <Text style={styles.overlayText}>Swipe Right: Add to Watchlist</Text>
          <Text style={styles.overlayText}>Swipe Up: Trade Stock</Text>
          <Text style={styles.overlayText}>The buttons at the bottom of the card correspond to each swipe</Text>
        </Overlay>
      )}

    </View>


    </SafeAreaView>
    </View>
    
  );
};


export default HomePage;
