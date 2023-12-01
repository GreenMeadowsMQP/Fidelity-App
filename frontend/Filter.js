import React, { useEffect, useState, useCallback }  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Switch, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import HomeBar from './HomeBar';
import styles from './styles';
import axios from 'axios';
import Header from './Header';

const Filter = ({navigation}) => {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getAllSymbols');
      setStocks(response.data.sort((a, b) => {
        const stockA = a.Symbol;
        const stockB = b.Symbol;

        if (stockA < stockB) {
          return -1;
        }
        if (stockA > stockB) {
          return 1;
        }
        return 0;
      }));
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleToggleSwitch = async (symbol, isActive) => {
    try {
        const payload = {
            Symbol: symbol,
            Active: !isActive
        }
      await axios.post('http://localhost:3000/updateStockStatus', payload);
      setStocks(prevStocks =>
        prevStocks.map(stock =>
          stock.Symbol === symbol ? { ...stock, Active: !isActive } : stock
        )
      );
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  console.log('Stock Data saved: ',stocks)
    return( 
        
      <View style={styles.unsafearea}>
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
          <Header title ={'Filter'}/>
          <ScrollView style={[styles.tickerList]}  >
          {stocks.map((stock,index) => (
                <View key={index} style={styles.filterList}>
                    <Text style={styles.filterText} >{stock.Symbol}</Text>
                    <Switch
                        value={stock.Active}
                        style={{marginRight: 10, marginTop: 8}}
                        thumbColor= '#3e3e3e' //Color for false
                        activeThumbColor='#FFFFFF'  //Color for true
                        trackColor= {{ false: "#929292", true: "#386641"}}
                        
                        onValueChange={() => handleToggleSwitch(stock.Symbol, stock.Active)}
                    />
                </View>
            ))}
          </ScrollView>
          <HomeBar navigation={navigation} />
        </View>
      </SafeAreaView>
      </View>
        
        )

}

export default Filter;