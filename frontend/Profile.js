import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { Table, Row, Cell } from 'react-native-table-component';
import HomeBar from './HomeBar';
import axios from 'axios';
import Header from './Header';
import styles from './styles';

const myIP = '192.168.1.31'; //CHANGE IP TO RUN LOCALLY

const Profile = ({ navigation }) => {
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [accountHoldings, setAccountHoldings] = useState([]);
  const [accountValue, setAccountValue] = useState([]);

  const handleButtonPress = (holding) => {
    if (holding.symbol !== "GCASH") {
      console.log(`Button ${holding.symbol} pressed`);
      const { symbol, lastPrice: price, lastPriceChange: change } = holding;
      navigation.navigate('StockPage', { symbol, price, change });
    }
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
  
  return (
    <View style={styles.unsafearea}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title={'Profile'} />
          <View style={[styles.tickerList, { flex: 1 }]}>

            <View style={styles.accountInfo}>
              <Text style={styles.whiteButtonText}>Account: {accountNumbers.accountNumber}</Text>
              <Text style={styles.whiteButtonText}>Value: {accountValue.accountNetworth}</Text>
            </View>

            {Array.isArray(accountHoldings) && (
              <ScrollView horizontal={true}>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Symbol</Text>
                    <Text style={styles.headerText}>Shares</Text>
                    <Text style={styles.headerText}>Current Price</Text>
                    <Text style={styles.headerText}>Change</Text>
                    <Text style={styles.headerText}>Value</Text>
                    <Text style={styles.headerText}>Today's Gain/Loss</Text>
                    <Text style={styles.headerText}>Total Gain/Loss</Text>
                    <Text style={styles.headerText}>Cost Basis</Text>
                  </View>
                  <View style={styles.tableBody}>
                    {accountHoldings.map((holding, index) => (
                      <Pressable key={index} onPress={() => handleButtonPress(holding)} style={styles.tableRow}>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.symbol}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.tdQuantity}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.lastPrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.lastPriceChange.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.currentValue.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.todayGainLoss.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.totalGainLoss.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text style={styles.cellText}>{holding.costBasis.toFixed(2)}</Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </ScrollView>
            )}

          </View>
          <HomeBar navigation={navigation} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;