import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, StyleSheet } from 'react-native';

const StockTransactionForm = () => {
  const [ticker, setTicker] = useState('');
  const [amount, setAmount] = useState('');
  const [shares, setShares] = useState('');
  const [account, setAccount] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BUY/SELL</Text>
      <Text/>AAPL<TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        placeholder="$"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setShares}
        value={shares}
        placeholder="Shares"
        keyboardType="numeric"
      />
      <Picker
        selectedValue={account}
        style={styles.input}
        onValueChange={(itemValue) => setAccount(itemValue)}
      >
        {/* Add Picker.Item for each account */}
        <Picker.Item label="Select Account" value="" />
        <Picker.Item label="Account 1" value="account1" />
        <Picker.Item label="Account 2" value="account2" />
        {/* ... other accounts */}
      </Picker>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 6,
    backgroundColor: 'darkgreen',
    alignItems: 'stretch',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
   
  }
});
export default StockTransactionForm;

