import React, { useState, useEffect } from 'react';
import { View, Modal, Animated, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; 
import Icon1 from './assets/images/square-plus.svg';
import Icon2 from './assets/images/angle-small-down.svg';

const myIP = 'localhost'; //CHANGE IP TO RUN LOCALLY

const TradeActionModal = ({ visible, onClose,symbol }) => {
  const [animation] = useState(new Animated.Value(0));
  const [accounts, setAccounts] = useState([]); // State for storing accounts
  const [selectedAccount, setSelectedAccount] = useState(null); // State for the selected account
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [lastTrade, setLastTrade] = useState(null);
 
  const imageSources = {
    icon1: require('./assets/images/HomebarImages/square-plus.png'), // Replace with actual path
    icon2: require('./assets/images/HomebarImages/Vector.png'), // Replace with actual path
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get('http://' + myIP + ':3000/getAccountNumber');
        if (response && response.data) {
          setAccounts(response.data.accounts); // Assuming the response has an accounts array
          if (response.data.accounts.length > 0) {
            setSelectedAccount(response.data.accounts[0].accountNumber); // Set default selected account
            console.log('Account Number',response.data.accounts[0].accountNumber)
          }
        } else {
          console.log("No account data available");
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };
    const renderIcon = (iconType) => {
      switch (iconType) {
        case 'icon1':
          return Platform.OS === 'web' ?
            <Image source={imageSources.icon1} style={{ width: 40, height: 40 }} /> :
            <Icon1Svg width={40} height={40} fill={'#386641'} />;
        case 'icon2':
          return Platform.OS === 'web' ?
            <Image source={imageSources.icon2} style={{ width: 50, height: 50 }} /> :
            <Icon2Svg width={50} height={50} fill={'#386641'} />;
        default:
          return null;
      }
    };
    const fetchLastTrade = async (symbol)=>{
      try {
        const response = await axios.get('http://' + myIP + ':3000/getLastTrade?symbols='+ symbol);
        const lastTradeData = response.data.content[0];
        if (lastTradeData && lastTradeData.price) {
          setLastTrade(lastTradeData.price.toFixed(2)); // Update state with the price
          console.log("Fetched data: ", lastTrade);
        } else {
          console.log("No price data available");
        }
      } catch (error) {
        console.error('Error fetching Last Trade data for:', error);
      }
    }

    if (visible) {
      fetchAccountData();
      fetchLastTrade(symbol);
      Animated.timing(animation, {  
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [visible,symbol,animation]);


  const handleModalClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => onClose()); // Call onClose after the animation
  };
  const modalStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0] // Adjust these values for the slide effect
        })
      }
    ]
  };

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View style={[styles.card, modalStyle]}>
          {/* Your modal content here */}
          <TouchableOpacity onPress={() => setShowAdvancedOptions(prev => !prev)} style={{ position: 'absolute', top: 25, left: 20 }}>
          {renderIcon('icon1')}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleModalClose} style={{ position: 'absolute', top: 15, right: 20 }}>
          {renderIcon('icon2')}
          </TouchableOpacity>
          <Text>Buy / Sell </Text>
          <Text>{symbol}</Text> 
          {/* Dropdown for account selection */}
          <Text>Account</Text>
          <Picker
            selectedValue={selectedAccount}
            onValueChange={(itemValue) => setSelectedAccount(itemValue)}
            style={{ width: '100%', height: 300, zIndex: 1 }} // Ensure it has explicit dimensions
          >
            {accounts.map(account => (
              <Picker.Item 
                key={account.accountNumber} 
                label={account.nickname ? account.nickname : account.accountNumber.toString()} 
                value={account.accountNumber} 
              />
            ))}
          </Picker>
          
          <TextInput style={styles.inputField } placeholder="$:" />
          <TextInput style={styles.inputField } placeholder="Stock:" />
          
          {/* Implement Picker or another dropdown component */}
          <View style ={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buyButton]} onPress={() => {}}>
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.sellButton]} onPress={() => {}}>
            <Text style={styles.buttonText}>buy</Text>
          </TouchableOpacity>
          </View>
          <Text>{lastTrade !== null ? lastTrade : 'Loading...'}</Text>
          {showAdvancedOptions && (
          <View>
          {/* Place additional buttons or options here */}
          </View>
          )}
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  
  card: {
    paddingTop:30,
    height: '93%', 
    backgroundColor: '#A7C957', 
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    display:"flex",
    paddingHorizontal:30,
    gap:15,
    alignItems:"center",

  },
  button:{
    width:120,
    height:40,
    fontSize:25,
    borderRadius:5,
    color: "#F2E8CF",
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buyButton:{
    backgroundColor:'#386641'
  },
  sellButton:{
    backgroundColor:'#BC4749'

  },
  cancellButton:{
    backgroundColor:'#BC4749'

  },
  buttonText:{
    color:'#F2E8CF',
    textAlign:'center',
    flexDirection:'column',
    fontSize:25,
  },
  inputField:{
    backgroundColor:'#F2E8CF',
    borderRadius:5,
    width:300,
    height:40,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap:15,
  },

  // ... other styles ...
});
export default TradeActionModal;