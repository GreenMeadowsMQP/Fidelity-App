import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native';
export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchNews() {
        try {
            const response = await axios.get('http://130.215.213.15:3000/getNews');// dont forget to change ip every time network errors 
            console.log("API Response:", response.data);
            if (response.data.content && Array.isArray(response.data.content)) {
                setData(response.data.content);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }
    fetchNews();
}, []);

return (
    <ScrollView style={styles.container}>
    {data.map((item, index) => (
       <View key={index} style={styles.newsItem}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.headline}>{item.headline}</Text>
       </View>
    ))}
 </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16, // top green bar
    paddingBottom: 16, // bottom green bar
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF", // White background
  },
  newsItem: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 14,
    marginTop: 4,
  },
});
