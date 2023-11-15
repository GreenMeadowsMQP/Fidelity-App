import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import HomeBar from './HomeBar';
import StockGraph from './StockGraph';
import axios from 'axios';

const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY


const StockPage = ({ route, navigation }) => {

    const { symbol, price, change } = route.params;
    const [pricingProduct, setPricingProduct] = useState([]);

    
    const myItem = {
        symbol:symbol,
        price:price,
        change:change
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://' + myIP + ':3000/getPricingProduct?symbols=' + symbol);
          console.log(response)
          console.log(response.data.content[0])
          setPricingProduct(response.data.content[0]); 
        } catch (error) {
          console.error('Error fetching pricing product names:', error);
        }
      };
  
      fetchData();
    }, []);

    const percentChange = change/price * 100;

    const getChangeStyle = (change) => {
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

    console.log('Pricing product data: ', pricingProduct)

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
            <Text style={styles.appTitle}>{symbol}</Text>
          </View>
          <View style={{width: '100%', height: '90%', background: '#A7C957', borderTopLeftRadius: 38, borderTopRightRadius: 38}}>
            
            <Text style={styles.symbolText}>{symbol}</Text>
            <Text style={styles.infoText}> Company Name</Text>
            <Text style={styles.symbolText}>{price.toFixed(2)}</Text>
            <Text style={[styles.infoText, getChangeStyle(change)]}> {change.toFixed(2)} ({percentChange.toFixed(2)}%)</Text>

            <StockGraph item={myItem}/>

            <Text style={styles.infoText}>Last: {price.toFixed(2)}</Text>
            <Text style={styles.infoText}>Volume: vol</Text>
            <Text style={styles.infoText}>P/E: pe ratio</Text>
            <Text style={styles.infoText}>Market Cap: {pricingProduct.marketCap}</Text>
            <Text style={styles.infoText}>Day High/Low: {pricingProduct.lowPrice}   {pricingProduct.highPrice}</Text>
            <Text style={styles.infoText}>52 Week High/Low: {pricingProduct.week52Low}   {pricingProduct.week52High}</Text>





          </View>
          {/* <HomeBar navigation={navigation} /> */}
        </View>
      );

}

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
    symbolText: {
      color: '#00',
      fontWeight: 'bold',
      fontSize: 36,
    },
    infoText: {
      color: '#00',
      fontWeight: 'bold',
      fontSize: 16,
    },
    
  });

export default StockPage;
