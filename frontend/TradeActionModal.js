import React, { useState, useEffect } from 'react';
import { View, Modal, Animated, Text, Button, TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY
const TradeActionModal = ({ visible, onClose }) => {
  const [animation] = useState(new Animated.Value(0)); // Initial value for bottom: 0
  const fetchAccountData = async ()=>{
    try {
      const response = await axios.get('http://' + myIP + ':3000/getAccountNumber');
      if (response) {
        console.log("Fetched data: ", response);
        
      } else {
        console.log("No account data available");
      }
    } catch (error) {
      console.error('Error fetching account data for:', error);
    }
  }
  useEffect(() => {
    if (visible) {
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
            // onValueChange={(itemValue, itemIndex) => setSelectedAccount(itemValue)}
          >
            {accounts.map(account => (
              <Picker.Item key={account.id} label={account.number} value={account.id} />
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
    
    color: "#F2E8CF",
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
    flexDirection:'column'
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