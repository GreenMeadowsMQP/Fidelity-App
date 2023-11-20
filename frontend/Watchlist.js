import React, { useEffect, useState }  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import HomeBar from './HomeBar';
import styles from './styles';
import axios from 'axios';


const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY

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
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch button names from your database
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
    
  <View style={styles.container}>
    <View style={styles.header}>
      <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
      <Text style={styles.appTitle}>Watchlist</Text>
    </View>
    <ScrollView style={styles.tickerList} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
    {Array.isArray(symbolNames) && symbolNames.map((symbolData, index) => (
        <Pressable key={index} onPress={() => handleButtonPress(symbolData)}>
          <View style={styles.button}>
          <Text style={styles.boldText}>{symbolData.symbol}</Text>
          <View style={styles.rightcontainer}>
            <Text style={styles.boldText}>{symbolData.price.toFixed(2)}  </Text>
            <Text style={[styles.boldText, getButtonStyle(symbolData.change)]}>{symbolData.change.toFixed(2)}</Text>
          </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
    <HomeBar navigation={navigation} />
  </View>
  )
};

const getButtonStyle = (change) => {
  if (parseFloat(change) > 0) {
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