import React, { useState, useEffect } from 'react';
import { View, Modal, Animated, Text, Image, Button, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'; 
import Icon1Svg from './assets/images/square-plus.svg';
import Icon2Svg from './assets/images/angle-small-down.svg';
import styles from './styles';
import { myIP } from './config';

const TradeActionModal = ({ visible, onClose,symbol }) => {
  const [animation] = useState(new Animated.Value(0));
  const [accounts, setAccounts] = useState([]); // State for storing accounts
  const [selectedAccount, setSelectedAccount] = useState(null); // State for the selected account
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [lastTrade, setLastTrade] = useState(null);
  const [dollarValue,setDollarValue]= useState('');
  const [stockQuantity,setStockQuantity] = useState('');
  const imageSources = {
    icon1: require('./assets/images/HomebarImages/square-plus.png'), // Replace with actual path
    icon2: require('./assets/images/HomebarImages/Vector.png'), // Replace with actual path
  };
  const handleDollarChange = (value) => {
    setDollarValue(value);
    const quantity = value/ lastTrade;
    setStockQuantity(quantity.toFixed(2));
  }
  const handleStockQuantityChange =(quantity) =>{
    setStockQuantity(quantity);
    const value = quantity * lastTrade;
    setDollarValue(value.toFixed(2));
  }
  const handleSubmitOrder = async (action) => {
    try {
      let quantityToSend;
      let quantityType;
  
      // Check if stockQuantity is a whole number
      if (Number.isInteger(parseFloat(stockQuantity))) {
        quantityToSend = parseFloat(stockQuantity); // Use stockQuantity as a number
        quantityType = 100; // Type for quantity
      } else {
        quantityToSend = parseFloat(dollarValue); // Use dollarValue for non-whole numbers
        quantityType = 200; // Type for value
      }

      // Make a POST request to the /postOrder endpoint
      const payload = {
        quantity:quantityToSend,
        quantityType:quantityType,
        action:action,
        instrumentId: symbol,

      }
      const response = await axios.post(`http://${myIP}:3000/postOrder`,payload);
      console.log("Order Response:", response.data);
      // Handle the response here
      // For example, you might want to display a success message or update the UI
    } catch (error) {
      console.error('Error posting order:', error);
      // Handle errors here
      // For example, you might want to display an error message
    }
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
        <Animated.View style={[styles.tradecard, modalStyle]}>
          {/* Your modal content here */}
          <TouchableOpacity onPress={() => setShowAdvancedOptions(prev => !prev)} style={{ position: 'absolute', top: 25, left: 20 }}>
          {renderIcon('icon1')}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleModalClose} style={{ position: 'absolute', top: 15, right: 20 }}>
          {renderIcon('icon2')}
          </TouchableOpacity>
          <Text style={styles.boldTextG} >Trade</Text>
          <View style={{flexDirection:"row", justifyContent:'space-between',width:'90%'}}>
            <Text style={styles.boldTextG}>{symbol}</Text> 
            <Text style={styles.boldTextG}>{lastTrade !== null ? lastTrade : 'Loading...'}</Text>
          </View>
          
          {/* Dropdown for account selection */}
          
          
          
          <TextInput style={styles.inputField } placeholder="$:"value={dollarValue.toString()}onChangeText={handleDollarChange} keyboardType='numeric'/>
          <TextInput style={styles.inputField } placeholder="Stock:" value={stockQuantity.toString()}onChangeText={handleStockQuantityChange} keyboardType='numeric'/>
          
          <View style={styles.pickerContainer}>
          <View style={{ backgroundColor: '#386641', padding: 5,height:"100%", borderRadius: 5, marginRight: 10 }}>
          <Text style={styles.buttonText}>Account</Text>
          </View>

            <RNPickerSelect
              style={pickerSelectStyles}
              value={selectedAccount}
              onValueChange={(value) => setSelectedAccount(value)}
              items={accounts.map(account => ({
                label: account.nickname ? account.nickname : account.accountNumber.toString(),
                value: account.accountNumber,
              }))}
            />
          </View>
         
          {/* Implement Picker or another dropdown component */}
          <View style ={styles.buttonContainer}>
          <TouchableOpacity style={[styles.tradebutton, styles.buyButton]} onPress={() => handleSubmitOrder(100)}>
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tradebutton, styles.sellButton]} onPress={() => handleSubmitOrder(200)}>
            <Text style={styles.buttonText}>Sell</Text>
          </TouchableOpacity>
          </View>
          
          {showAdvancedOptions && (
          <View>
          {/* Place additional buttons or options here */}
          </View>
          )}
          {/* <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity> */}
        </Animated.View>
      </View>
    </Modal>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 4,
    color: 'black',
    backgroundColor:'#F2E8CF',
    paddingRight: 40, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default TradeActionModal;