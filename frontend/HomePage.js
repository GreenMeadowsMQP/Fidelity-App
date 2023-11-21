// HomePage.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwipeableCard from './SwipeableCard';
import TradeActionModal from './TradeActionModal';
import HomeBar from './HomeBar';
import Header from './Header';
import axios from 'axios';
import styles from './styles';
import Overlay from './Overlay';



const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY


export let cards = [];

const HomePage = ({ route, navigation }) => {
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [newsContent, setNewsContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

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
          style={[styles.absoluteFill,{zIndex:2}]}
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
          style={[styles.absoluteFill,{zIndex:1}]}
        />
      );
    }

    return cards;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
    <Header title ={'StockADE'} onInfoPress={openPopup}/>
      <View style={styles.card}>{renderCards()}</View>
      <HomeBar navigation={navigation} />
      <TradeActionModal visible={showTradeModal}onClose={() => setShowTradeModal(false)}/> 

      {showPopup && (
        <Overlay onClose={closePopup}>
          <Text>Swipe Left: Ignore Stock</Text>
          <Text>Swipe Right: Add to Watchlist</Text>
          <Text>Swipe Up: Trade Stock</Text>
          <Text>The buttons at the bottom of the card correspond to each swipe</Text>
        </Overlay>
      )}

    </View>


    </SafeAreaView>
  );
};


export default HomePage;
