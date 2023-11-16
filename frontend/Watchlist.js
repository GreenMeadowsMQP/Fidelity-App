import React, { useEffect, useState }  from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import HomeBar from './HomeBar';
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
          <Text style={styles.buttonText}>{symbolData.symbol}</Text>
          <View style={styles.rightContainer}>
            <Text style={styles.priceText}>{symbolData.price.toFixed(2)}  </Text>
            <Text style={[styles.priceText, getButtonStyle(symbolData.change)]}>{symbolData.change.toFixed(2)}</Text>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2E8CF',
      paddingTop: 5,
      zIndex: 0,
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
      marginLeft: -15,
    },
    tickerList: {
      width: '98%', 
      height: Dimensions.get('window').height * 0.7,
      padding: 0, 
      marginBottom:5, 
      backgroundColor: '#A7C957', 
      borderRadius: 10, 
      boxShadowColor: '#000', 
      boxShadowOffset: { width: 0, height: 2 },
      boxShadowOpacity: 0.25,
      boxShadowRadius: 3.84,
      elevation: 5, 
    },
    button: {
      backgroundColor: '#386641',
      padding: 10,
      marginVertical: 8,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between', 
    },
    rightContainer: {
      flexDirection: 'row', // Align children horizontally
    },
    buttonText: {
      color: '#F2E8CF',
      fontWeight: 'bold',
      fontSize: 24,
    },
    priceText: {
      color: '#F2E8CF',
      fontWeight: 'bold',
      fontSize: 24,
    },
    priceChangeText:{
      color: '#F2E8CF',
      fontWeight: 'bold',
      fontSize: 24,
    },
  });

export default Watchlist;