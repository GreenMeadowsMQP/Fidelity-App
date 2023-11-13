import React, { useEffect, useState }  from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import HomeBar from './HomeBar';

const Profile = ({navigation}) => {
  
  
    return( 
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
        <Text style={styles.appTitle}>Profile</Text>
      </View>
      <ScrollView style={styles.tickerList}>
      </ScrollView>
      <HomeBar navigation={navigation} />
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
    tickerList: {
      width: '98%', 
      height:'70%',
      padding: 0, 
      marginBottom:5, 
      backgroundColor: '#A7C957', 
      borderRadius: 10, 
      boxShadowColor: '#000', 
      boxShadowOffset: { width: 0, height: 2 },
      boxShadowOpacity: 0.25,
      boxShadowRadius: 3.84,
      elevation: 5, 
    },
    button: {
      backgroundColor: '#386641',
      padding: 10,
      marginVertical: 8,
      borderRadius: 8,
    },
    buttonText: {
      color: '#F2E8CF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default Profile;