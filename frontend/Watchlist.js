import React, { useEffect, useState }  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import HomeBar from './HomeBar';
import styles from './styles';
import axios from 'axios';
import Header from './Header';

const myIP = 'localhost'; //CHANGE IP TO RUN LOCALLY

const Watchlist = ({navigation}) => {
  const [symbolNames, setSymbolNames] = useState([]);

  const handleButtonPress = (symbolData) => {
    console.log(`Button ${symbolData.symbol} pressed`);
    // Add your logic for handling button press here
    //Will go to stock page for each symb
    const symbol = symbolData.symbol;
    const price = symbolData.price;
    const change = symbolData.change;
    navigation.navigate('StockPage', {symbol, price, change});
  };


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://' + myIP + ':3000/getWatchlist');
        console.log(response)
        setSymbolNames(response.data); // Assuming the response is an array of button names
      } catch (error) {
        console.error('Error fetching button names:', error);
      }
    };

    fetchData();
  }, []);

  console.log('symbolData: ', symbolNames);

  return( 
   <View style={styles.unsafearea}>
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
    <Header title ={'Watchlist'}/>
    <ScrollView style={styles.tickerList} contentContainerStyle={{flexGrow: 1, justifyContent: 'center' }}>
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
      color: '#FF0000', // Make Red
    };
  }
  // Default style for no change
  return {};
};


export default Watchlist;