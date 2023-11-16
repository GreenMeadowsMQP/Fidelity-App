import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import StockGraph from './StockGraph';
import axios from 'axios';

const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY


const StockPage = ({ route, navigation }) => {

    const { symbol, price, change } = route.params;
    const [pricingProduct, setPricingProduct] = useState([]);
    const [volumeProduct, setVolumeProduct] = useState([]);
    const [companyInfo, setCompanyInfo] = useState([]);


    
    const myItem = {
        symbol:symbol,
        price:price,
        change:change
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://' + myIP + ':3000/getPricingProduct?symbols=' + symbol);
          // console.log(response.data.content[0])          
          setPricingProduct(response.data.content[0]); 
          const response2 = await axios.get('http://' + myIP + ':3000/getVolumeProduct?symbols=' + symbol);
          // console.log(response2.data.content[0])          
          setVolumeProduct(response2.data.content[0]); 

          try{
          const response3 = await axios.get('http://' + myIP + ':3000/getCompanyInfo?symbols=' + symbol);
          console.log("company info: ", response3.data.content[0])          
          setCompanyInfo(response3.data.content[0]); }
          catch(error){
            console.error('Error fetching Company Info:', error);
          }

        } catch (error) {
          console.error('Error fetching API Info:', error);
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

    console.log('company Info: ', companyInfo)

    return (
        <View style={styles.container}>

          <View style={styles.header}>
            <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
            <Text style={styles.appTitle}>{symbol}</Text>

            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
              <Image source={require("./assets/images/backarrow.png")} style={styles.buttonBackground} />
            </Pressable>
          </View>

          

          <View style={{width: '100%', height: '90%', background: '#A7C957', borderTopLeftRadius: 38, borderTopRightRadius: 38}}>
            
            <View style={{marginLeft: 10}}>
              <Text style={styles.symbolText}>{symbol}</Text>
              {companyInfo && companyInfo.legalName && (
                <Text style={styles.infoText}>{companyInfo.legalName}</Text>
              )}

              {companyInfo && companyInfo.stockExchange && companyInfo.sector && (
                <Text style={styles.infoText}>{companyInfo.stockExchange} - {companyInfo.sector}</Text>
              )}
              <Text style={styles.symbolText}>{price.toFixed(2)}</Text>
              <Text style={[styles.infoText, getChangeStyle(change)]}> {change.toFixed(2)} ({percentChange.toFixed(2)}%)</Text>
            </View>

            <StockGraph item={myItem}/>

            <Text style={styles.infoText}>Last: {price.toFixed(2)}</Text>
            <Text style={styles.infoText}>Volume: {volumeProduct.today}</Text>
            {/* <Text style={styles.infoText}>P/E: pe ratio</Text> */}
            <Text style={styles.infoText}>Market Cap: {pricingProduct.marketCap}</Text>
            <Text style={styles.infoText}>Day High/Low: {pricingProduct.lowPrice}  -  {pricingProduct.highPrice}</Text>
            <Text style={styles.infoText}>52 Week High/Low: {pricingProduct.week52Low}  -  {pricingProduct.week52High}</Text>

            <View style={{alignItems: 'center'}}>
              <Pressable style={styles.buySellButton} onPress={() => console.log('Buy sell button!')}>
              <Text style={styles.bsText}>Buy/Sell</Text>
              </Pressable>
            </View>

          </View>
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
    button: {
      width: 60, 
      height: 60,
      marginLeft: '98%', // This adds space between the buttons.
      marginRight: -15,
    },
    buySellButton: {
      backgroundColor: '#386641',
      padding: 10,
      width: '98%',
      marginVertical: 8,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center', 
    },
    bsText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    buttonBackground: {
      position: 'absolute',
      width: '100%', // Full width of the button.
      height: '100%', // Full height of the button.
  },
    
  });

export default StockPage;
