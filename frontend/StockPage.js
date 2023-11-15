import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import HomeBar from './HomeBar';
import StockGraph from './StockGraph';

const StockPage = ({ route, navigation }) => {

    const { symbol, price, change } = route.params;
    
    const myItem = {
        symbol:symbol,
        price:price,
        change:change
    }

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
            <Text style={styles.infoText}>Market Cap: no cap</Text>
            <Text style={styles.infoText}>Day High/Low: HL</Text>
            <Text style={styles.infoText}>52 Week High/Low: HL</Text>





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
