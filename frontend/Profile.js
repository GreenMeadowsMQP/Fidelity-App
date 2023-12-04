import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import Header from './Header';
import HomeBar from './HomeBar';
import styles from './styles';
import Overlay from './Overlay';
import { myIP } from './config';



const Profile = ({ navigation }) => {
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [accountHoldings, setAccountHoldings] = useState([]);
  const [accountValue, setAccountValue] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const widthArray = [80, 100, 110, 80, 100, 80, 80, 100, 100]

  const handleButtonPress = (holding, navigation) => {
    console.log("BUTTON PRESS LOG: ", holding)
    if (holding[0] !== 'GCASH' && holding[0] !== undefined) {
      console.log(`Button ${holding[0]} pressed`);
      const symbol = holding[0];
      const price = holding[2];
      const change = holding[3];
      console.log('Symb: ', symbol, ' Price: ', price, ' Change: ', change)
      navigation.navigate('StockPage', { symbol, price, change });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://' + myIP + ':3000/getAccountNumber');
      console.log('Get Account Nums Response: ', response);
      console.log('Get Account Nums Response DATA: ', response.data);
      setAccountNumbers(response.data.accounts[0]);

      try {
        if (response.data.accounts[0].accountNumber !== undefined) {
          const dataToSend = {
            account: response.data.accounts[0].accountNumber,
          };
          console.log('account num: ', response.data.accounts[0].accountNumber);
          const postResponse = await axios.post('http://' + myIP + ':3000/getPositions', dataToSend);
          const postResponse2 = await axios.post('http://' + myIP + ':3000/getAccountBalance', dataToSend);

          console.log('Account Holdings: ', postResponse.data);
          console.log('Account Balance: ', postResponse2.data);

          setAccountHoldings(postResponse.data.content.sort((a, b) => (a.symbol === 'GCASH' ? 1 : b.symbol === 'GCASH' ? -1 : 0)));
          setAccountValue(postResponse2.data.content[0]);
        }
      } catch (error) {
        console.error('Error fetching account info:', error);
      }
    } catch (error) {
      console.error('Error fetching account numbers:', error);
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

  console.log('acccount holdings var: ', accountHoldings);

  const tableHead = ['Symbol', 'Shares', 'Current Price', 'Change', 'Value', 'Today\'s Gain/Loss', 'Total Gain/Loss', 'Cost Basis', 'Avg. Cost Per Share'];
  const tableData = accountHoldings.map(holding => [
    holding.symbol,
    holding.tdQuantity.toString(),
    holding.lastPrice !== null ? holding.lastPrice.toFixed(2) : '(null)',
    holding.lastPriceChange !== null ? holding.lastPriceChange.toFixed(2) : '(null)',
    holding.currentValue.toFixed(2),
    holding.todayGainLoss.toFixed(2),
    holding.totalGainLoss.toFixed(2),
    holding.costBasis.toFixed(2),
    (holding.costBasis/holding.tdQuantity).toFixed(2),
  ]);

  return (
    <SafeAreaView style={styles.unsafearea}>
      <View style={styles.container}>
        <Header title={'Profile'} onInfoPress={openPopup}/>
        <View style={[styles.tickerList, { flex: 1 }]}>
          <View style={styles.accountInfo}>
            <Text style={styles.whiteButtonText}>Account: {accountNumbers.accountNumber}</Text>
            <Text style={styles.AccountValueText}>${accountValue.accountNetworth ? accountValue.accountNetworth.toLocaleString('en-US') : accountValue.accountNetworth}</Text>
          </View>

          {Array.isArray(accountHoldings) && (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View>
                {/* Header of table */}
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <Row data={tableHead} widthArr={widthArray} style={styles.cellStyle} textStyle={styles.holdingsText} />
                </Table>
                {/* Data Rows in table */}
                <Table flex={1}>
                  {
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        style={styles.cellStyle2}
                        widthArr={widthArray}
                        textStyle={styles.holdingsText}
                        onPress={() => handleButtonPress(rowData, navigation)}
                      />
                    ))
                  }

                </Table>
              </View>
            </ScrollView>
          )}
        </View>
        <HomeBar navigation={navigation} />

        
      </View>
      {showPopup && (
        <Overlay onClose={closePopup}>
          <Text style={styles.overlayText}>This is your profile page, where you can see your account holdings</Text>
          <Text style={styles.overlayText}>Your account number and current value is shown at the top</Text>
          <Text style={styles.overlayText}>You can go to a stock page by tapping on the symbol</Text>
        </Overlay>
      )}
    </SafeAreaView>
    
  );
};

export default Profile;
