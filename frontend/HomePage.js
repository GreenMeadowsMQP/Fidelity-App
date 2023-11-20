// HomePage.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwipeableCard from './SwipeableCard';
import TradeActionModal from './TradeActionModal';
import HomeBar from './HomeBar';
import axios from 'axios';


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
    <SafeAreaView style={{ flex: 1 }}>
  
    
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftcontainer}>
          <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
          <Text style={styles.appTitle}>StockADE</Text>
        </View>
        <View style={styles.rightcontainer}>
          <Image source={require('./assets/images/HomebarImages/info.png')} style={styles.icon}/>
          <Image source={require('./assets/images/HomebarImages/slider.png')} style={styles.icon}/>
        </View>
      </View>
      <View style={styles.cardStack}>{renderCards()}</View>
      <HomeBar navigation={navigation} />
      <TradeActionModal visible={showTradeModal}onClose={() => setShowTradeModal(false)}/> 
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2E8CF',
    
    zIndex: 0,
  },
  cardStack: {
    width: '100%',
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
    justifyContent: 'space-between', // This ensures space between the left and right containers
    padding: 0,
    height: 50,
    width: '100%', // Make sure the header spans the full width
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  appTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: -15,
    fontFamily: 'Nunito'
  },
  icon:{
    width:40,
    height:40,
    alignSelf:'center',
    justifyContent:'flex-end'
  },
  leftcontainer: {
    flexDirection: "row",
    alignItems: 'center',
    // justifyContent: 'flex-start' // This is not needed as it's the default behavior
  },
  rightcontainer: {
    flexDirection: "row",
    alignItems: 'center', // Corrected typo here
    justifyContent: "flex-end",
    flex: 1, // This will push the right container to the end of the header
    marginRight:15,
    gap:15,
  },
  // ... other styles remain unchanged
});
  


export default HomePage;
