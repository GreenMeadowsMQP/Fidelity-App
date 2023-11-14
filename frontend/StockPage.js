import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import HomeBar from './HomeBar';
import StockGraph from './StockGraph';

const StockPage = ({ route, navigation }) => {

    const { symbol, price } = route.params;
    
    const myItem = {
        symbol:symbol,
        price:price
    }

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
            <Text style={styles.appTitle}>{symbol}</Text>
          </View>
          <StockGraph item={myItem}/>
          <HomeBar navigation={navigation} />
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
    cardStack: {
      width: '98%',
      height: '70%',
      position: 'relative',
    },
    behindCard: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    topCard: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 2,
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
    
  });

export default StockPage;
