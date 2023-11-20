// HomePage.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import SwipeableCard from './SwipeableCard';
import TradeActionModal from './TradeActionModal';
import HomeBar from './HomeBar';
import axios from 'axios';
import styles from './styles';


const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY


export let cards = [];

const HomePage = ({ route, navigation }) => {
  const [showTradeModal, setShowTradeModal] = useState(false);
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
  const handleUpSwipe = () => {
    setShowTradeModal(true);
  };

    const renderCards = () => {
    if (newsContent.length > 1) {
      cards = [];
    }

    // Add the current card to the cards array.
    if (newsContent[currentIndex]) {
      cards.push(
        <SwipeableCard
          key={`card-${currentIndex}`}
          item={newsContent[currentIndex]}
          onSwipe={currentIndex < newsContent.length - 1 ? handleSwipe : null}
          onUpSwipe={handleUpSwipe}
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
      <View style={styles.card}>{renderCards()}</View>
      <HomeBar navigation={navigation} />
      <TradeActionModal visible={showTradeModal}onClose={() => setShowTradeModal(false)}/> 
    </View>
    
  );
};


export default HomePage;
