import React, { useEffect, useState }  from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import HomeBar from './HomeBar';
import axios from 'axios';


const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY


const Profile = ({navigation}) => {

  const [accountNumbers, setAccountNumbers] = useState([]);
  //accountNumbers stores an array of accounts, access via accountNumbers.accounts[x]


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://' + myIP + ':3000/getAccountNumber');
        console.log('Get Account Nums Response: ',response)
        console.log('Get Account Nums Response DATA: ',response.data)
        setAccountNumbers(response.data); // Assuming the response is an array of button names

        try{
          if(response.data.accounts[0].accountNumber !== undefined){
            const dataToSend = {
              account: response.data.accounts[0].accountNumber,
            };
            console.log("account num: ", response.data.accounts[0].accountNumber)
          const postResponse = await axios.post('http://localhost:3000/getPositions', response.data.accounts[0].accountNumber)
          console.log('Account Holdings: ', postResponse.data)
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