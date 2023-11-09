import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import HomeBar from './HomeBar';



const Watchlist = ({navigation}) => {
  return( 
  <View style={styles.container}>
  <View style={styles.header}>
    <Image source={require('./assets/images/HomebarImages/watchlist.png')} style={styles.logo} />
    <Text style={styles.appTitle}>Watchlist</Text>
  </View>
  <HomeBar navigation={navigation}/>
</View>)
};

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
  });

export default Watchlist;