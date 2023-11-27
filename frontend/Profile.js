import React, { useEffect, useState }  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import HomeBar from './HomeBar';
import axios from 'axios';
import Header from './Header';
import styles from './styles';


const myIP = 'localhost'; //CHANGE IP TO RUN LOCALLY


const Profile = ({navigation}) => {

  const [accountNumbers, setAccountNumbers] = useState([]);
  const [accountHoldings, setAccountHoldings] = useState([]);
  const [accountValue, setAccountValue] = useState([]);
  //accountNumbers stores an array of accounts, access via accountNumbers.accounts[x]

  const handleButtonPress = (holding) => {
    if(holding.symbol != "GCASH"){
    console.log(`Button ${holding.symbol} pressed`);
    
    const symbol = holding.symbol;
    const price = holding.lastPrice;
    const change = holding.lastPriceChange;
    navigation.navigate('StockPage', {symbol, price, change});}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://' + myIP + ':3000/getAccountNumber');
        console.log('Get Account Nums Response: ',response)
        console.log('Get Account Nums Response DATA: ',response.data)
        setAccountNumbers(response.data.accounts[0]); // Assuming the response is an array of button names

        try{
          if(response.data.accounts[0].accountNumber !== undefined){
            const dataToSend = {
              account: response.data.accounts[0].accountNumber,
            };
            console.log("account num: ", response.data.accounts[0].accountNumber)
          const postResponse = await axios.post('http://localhost:3000/getPositions', dataToSend)
          const postResponse2 = await axios.post('http://localhost:3000/getAccountBalance', dataToSend)

          console.log('Account Holdings: ', postResponse.data)
          console.log('Account Balance: ', postResponse2.data)

          setAccountHoldings(postResponse.data.content)
          setAccountValue(postResponse2.data.content[0])

        }
        }catch(error){
          console.error('Error fetching account info:', error);
        }

      } catch (error) {
        console.error('Error fetching account numbers:', error);
      }
    };

    fetchData();
  }, []);

  console.log("acccount holdings var: ", accountHoldings);
  
    return( 
    <View style={styles.unsafearea}>
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <Header title ={'Profile'}/>
      <View style={[styles.tickerList, {flex:1}]} >
        <Text style={styles.infoTextWL}>Account: {accountNumbers.accountNumber}</Text>
        <Text style={styles.infoTextWL}>Value: {accountValue.accountNetworth}</Text>

        {Array.isArray(accountHoldings) && accountHoldings.map((holding, index) => (
        <Pressable key={index} onPress={() => handleButtonPress(holding)}>
          <View style={styles.button}>
          {holding.symbol === 'GCASH' ? (
            <>
              <Text style={styles.holdingsText}>Available {holding.symbol}</Text>
              <Text style={styles.holdingsText}>{holding.tdQuantity}</Text>
            </>
          ) : (
            <>
              <Text style={styles.holdingsText}>Symbol: {holding.symbol}</Text>
              <Text style={styles.holdingsText}>Num Shares: {holding.tdQuantity}</Text>
              <Text style={styles.holdingsText}>Current Price: {holding.lastPrice}</Text>
              <Text style={styles.holdingsText}>Change: {holding.lastPriceChange}</Text>
              <Text style={styles.holdingsText}>Current Value: {holding.currentValue}</Text>
              <Text style={styles.holdingsText}>Today's Gain/Loss: {holding.todayGainLoss}</Text>
              <Text style={styles.holdingsText}>Total Gain/Loss: {holding.totalGainLoss}</Text>
              <Text style={styles.holdingsText}>Cost Basis: {holding.costBasis}</Text>
            </>
          )}
          </View>
        </Pressable>
        ))}

      </View>
      <HomeBar navigation={navigation} />
    </View>
      </SafeAreaView>
    </View>
    )
  };

export default Profile;