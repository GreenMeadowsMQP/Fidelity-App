import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get('http://192.168.1.12:3000/getNews');
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setData(response.data.slice(0, 20));  // Slice the array to get only the first 20 items
        }
      } catch (error) {
        console.error('Error fetching news from me:', error);
      }
    }
    fetchNews();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.headline}>{item.headline}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
