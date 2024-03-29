import React, { useEffect, useState, useCallback }  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import HomeBar from './HomeBar';
import styles from './styles';
import axios from 'axios';
import Header from './Header';
import Overlay from './Overlay';

import { myIP } from './config';


const Watchlist = ({navigation}) => {
  const [symbolNames, setSymbolNames] = useState([]);
  
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleButtonPress = (symbolData) => {
    console.log(`Button ${symbolData.symbol} pressed`);
    // Add your logic for handling button press here
    //Will go to stock page for each symb
    const symbol = symbolData.symbol;
    const price = symbolData.price;
    const change = symbolData.change;
    navigation.navigate('StockPage', {symbol, price, change});
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://' + myIP + ':3000/getWatchlist');
      console.log(response)
      setSymbolNames(response.data); // Assuming the response is an array of button names
    } catch (error) {
      console.error('Error fetching button names:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Trigger the data fetching when the screen comes into focus
      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, [])
  );
  


  useEffect(() => {    
    fetchData();
  }, []);

  console.log('symbolData: ', symbolNames);

  return( 
  <View style={styles.unsafearea}>
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <Header title ={'Watchlist'} onInfoPress={openPopup}/>
      <ScrollView style={styles.tickerList} contentContainerStyle={{flexGrow: 1}}>
      {Array.isArray(symbolNames) && symbolNames.map((symbolData, index) => (
          <Pressable key={index} onPress={() => handleButtonPress(symbolData)}>
            <View style={styles.button}>
            {symbolData.symbol !== null ? (
                  <>
                    <Text style={styles.boldText}>{symbolData.symbol}</Text>
                    <View style={styles.rightcontainer}>
                      <Text style={styles.boldText}>{symbolData.price.toFixed(2)} </Text>
                      <Text style={[styles.boldText, getButtonStyle(symbolData.change)]}>
                        {symbolData.change > 0 ? `+${symbolData.change.toFixed(2)}`:symbolData.change.toFixed(2)}
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text style={styles.loadingText}>Loading...</Text>
                )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <HomeBar navigation={navigation} />

      

    </View>
    </SafeAreaView>
    {showPopup && (
        <Overlay onClose={closePopup}>
          <Text style={styles.overlayText}>This is your watchlist, where you can keep track of stocks you are interested in</Text>
          <Text style={styles.overlayText}>Tap any stock to view more information about it</Text>
          <Text style={styles.overlayText}>You can add or remove stocks from their stock page</Text>
        </Overlay>
      )}
  </View>
 
  )
};

const getButtonStyle = (change) => {
  if (parseFloat(change) >= 0) {
    return {
      color: '#00FF00', // Make Green
    };
  } else if (parseFloat(change) < 0) {
    return {
      color: '#FF5757', // Make Red
    };
  }
  // Default style for no change
  return {};
};


export default Watchlist;