import React, { useEffect, useState }  from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import HomeBar from './HomeBar';
import { SafeAreaView } from 'react-native-safe-area-context';
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

        <View style={styles.accountInfo}> 
          <Text style={styles.whiteButtonText}>Account: {accountNumbers.accountNumber}</Text>
          <Text style={styles.whiteButtonText}>Value: {accountValue.accountNetworth}</Text>
        </View>

        {Array.isArray(accountHoldings) && (
  <div style={{ overflowX: 'auto' }}>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.cellStyle}>Symbol</th>
          <th style={styles.cellStyle}>Shares</th>
          <th style={styles.cellStyle}>Current Price</th>
          <th style={styles.cellStyle}>Change</th>
          <th style={styles.cellStyle}>Value</th>
          <th style={styles.cellStyle}>Today's Gain/Loss</th>
          <th style={styles.cellStyle}>Total Gain/Loss</th>
          <th style={styles.cellStyle}>Cost Basis</th>
        </tr>
      </thead>
      <tbody>
        {accountHoldings.map((holding, index) => (
          <tr key={index}>
            <Pressable onPress={() => handleButtonPress(holding)}>
              <td style={styles.cellStyle2}>{holding.symbol}</td>
            </Pressable>
            <td style={styles.cellStyle2}>{holding.tdQuantity}</td>
            <td style={styles.cellStyle2}>{holding.lastPrice.toFixed(2)}</td>
            <td style={styles.cellStyle2}>{holding.lastPriceChange.toFixed(2)}</td>
            <td style={styles.cellStyle2}>{holding.currentValue.toFixed(2)}</td>
            <td style={styles.cellStyle2}>{holding.todayGainLoss.toFixed(2)}</td>
            <td style={styles.cellStyle2}>{holding.totalGainLoss.toFixed(2)}</td>
            <td style={styles.cellStyle2}>{holding.costBasis.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </View>
      <HomeBar navigation={navigation} />
    </View>
        </SafeAreaView>
      </View>
      
    )
  };



export default Profile;