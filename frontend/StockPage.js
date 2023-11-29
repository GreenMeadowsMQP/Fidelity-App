import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import StockGraph from './StockGraph';
import axios from 'axios';
import styles from './styles';
import Header from './Header';

const myIP = 'localhost'; //CHANGE IP TO RUN LOCALLY


const StockPage = ({ route, navigation }) => {

    const { symbol, price, change } = route.params;
    const [pricingProduct, setPricingProduct] = useState([]);
    const [volumeProduct, setVolumeProduct] = useState([]);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [watchlistStatus, setWatchlistStatus] = useState();

    
    const myItem = {
        symbol:symbol,
        price:price,
        change:change
    }

    const symbolPayload = {
      Symbol:symbol
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

          await axios.post('http://' + myIP + ':3000/isOnWatchlist',  symbolPayload).then((resp) => {
            console.log('Watchlist status: ', resp.data)
            setWatchlistStatus(resp.data);
          }).catch((error) => {
            console.error(error);
          })

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

    const deleteWatchlist = async () =>{
      await axios.post('http://' + myIP + ':3000/removeWatchlist',  symbolPayload).then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      setWatchlistStatus(!watchlistStatus)
    }

    const addWatchlist = () => {
      axios.post('http://localhost:3000/storeData', symbolPayload)
    .then((response) => {
      // Handle the response from the server, e.g., show a success message to the user
      console.log(response.data);
    })
    .catch((error) => {
      // Handle any errors, e.g., display an error message to the user
      console.error(error);
    });
    setWatchlistStatus(!watchlistStatus)
    }

    console.log('company Info: ', companyInfo)

    return (
      <View style={styles.unsafearea}>
          <SafeAreaView style={{flex:1}}>
          <View style={styles.container}>

<Header title ={symbol}>
  <Pressable onPress={() => navigation.goBack()}>
    <Image source={require("./assets/images/backarrow.png")} style={styles.buttonBackground} />
  </Pressable>
</Header>



<View style={{width: '100%', height: '90%', background: '#A7C957', borderTopLeftRadius: 38, borderTopRightRadius: 38,flex: 1}}>
  
  <View>
    {/* <Text style={styles.symbolTextWL}>{symbol}</Text> */}
    {companyInfo && companyInfo.legalName && (
      <Text style={styles.symbolTextWL}>{companyInfo.legalName}</Text>
    )}

    {companyInfo && companyInfo.stockExchange && companyInfo.sector && (
      <Text style={styles.infoTextWL}>{companyInfo.stockExchange} - {companyInfo.sector}</Text>
    )}
    <Text style={styles.symbolTextWL}>{price.toFixed(2)}</Text>
    <Text style={[styles.infoTextWL, getChangeStyle(change)]}> {change > 0 ? `+${change.toFixed(2)}`:change.toFixed(2)} ({percentChange.toFixed(2)}%)</Text>
  </View>

  <StockGraph item={myItem}/>

  <Text style={styles.infoTextWL}>Last: {price.toFixed(2)}</Text>
  <Text style={styles.infoTextWL}>Volume: {volumeProduct.today}</Text>
  {/* <Text style={styles.infoText}>P/E: pe ratio</Text> */}
  <Text style={styles.infoTextWL}>Market Cap: {pricingProduct.marketCap}</Text>
  <Text style={styles.infoTextWL}>Day High/Low: {pricingProduct.lowPrice}  -  {pricingProduct.highPrice}</Text>
  <Text style={styles.infoTextWL}>52 Week High/Low: {pricingProduct.week52Low}  -  {pricingProduct.week52High}</Text>

  <View style={{alignItems: 'center'}}>
    <Pressable style={styles.buySellButton} onPress={() => console.log('Buy sell button!')}>
    <Text style={styles.whiteButtonText}>Buy/Sell</Text>
    </Pressable>

    <Pressable
      style={{
        backgroundColor: watchlistStatus ? '#FF0000' : '#386641',
        ...styles.addRemoveButton,
      }}
      onPress={() => (watchlistStatus ? deleteWatchlist() : addWatchlist())}
    >
      <Text style={styles.whiteButtonText}>
        {watchlistStatus ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </Text>
    </Pressable>

              <Pressable style={styles.buySellButton} onPress={() => navigation.goBack()}>
              <Text style={styles.whiteButtonText}> Back </Text>
              </Pressable>
            </View>

</View>
</View>
          </SafeAreaView>
      </View>
    
        
      );

}

export default StockPage;
