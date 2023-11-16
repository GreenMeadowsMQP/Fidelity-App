import React, { useState, useEffect } from 'react';
import { View, Modal, Animated, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; // Ensure Axios is imported

const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY

const TradeActionModal = ({ visible, onClose }) => {
  const [animation] = useState(new Animated.Value(0));
  const [accounts, setAccounts] = useState([]); // State for storing accounts
  const [selectedAccount, setSelectedAccount] = useState(null); // State for the selected account
  const {selectedPotato , setSelectedPotato} = useState(null)
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

    if (visible) {
      fetchAccountData();
      Animated.timing(animation, {  
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, animation]);


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
          <Text>Buy / Sell </Text>

          {/* Dropdown for account selection */}
          <Picker
            selectedValue={selectedAccount}
            onValueChange={(itemValue) => setSelectedAccount(itemValue)}
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
            <Text style={styles.buttonText}>Sell</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button, styles.cancellButton]} onPress={() => {}}>
            <Text style={styles.buttonText}>Cancell</Text>
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