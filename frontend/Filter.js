import React, { useEffect, useState, useCallback }  from 'react';
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
      setStocks(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleToggleSwitch = async (symbol, isActive) => {
    try {
      await axios.put('your-api-endpoint', { symbol, isActive });
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
        <View style={styles.container}>
          <Header title ={'Filter'}/>
          <View style={[styles.tickerList, {flex:1}]} >
          {stocks.map((stock,index) => (
                <View key={index} style={styles.stockItem}>
                    <Text>{stock.Symbol}</Text>
                    <Switch
                        value={stock.Active}
                        onValueChange={() => handleToggleSwitch(stock.Symbol, stock.Active)}
                    />
                </View>
            ))}
          </View>
          <HomeBar navigation={navigation} />
        </View>
        )

}

export default Filter;