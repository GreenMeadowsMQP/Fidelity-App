
import React, { useState,useRef,useEffect } from 'react';
import {Animated, PanResponder, Dimensions, StyleSheet, View, Text ,TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import moment from 'moment';



  

  
const SwipeableCard = ({ item,onSwipe,style}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M'); // Default to 1M
  const [timeframeGraphData, setTimeframeGraphData] = useState([]);
  const pan = useRef(new Animated.ValueXY()).current;
  const { width, height } = Dimensions.get('screen');
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, { dx, dy }) => {
      const isSwipeOffScreen = Math.abs(dx) > width * 0.5; // consider a swipe if it's more than half the width of the screen
      if (isSwipeOffScreen) {
        // Continue the animation off the screen
        Animated.timing(pan, {
          toValue: { x: dx > 0 ? width : -width, y: dy },
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSwipe(); 
          // Call function to go to next card or handle the swipe off logic
        });
      } else {
        // Snap back if not swiped off
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  // Function to fetch graph data
  const fetchGraphData = async (symbol, timeframe) => {
    let startDate;
    const endDate = moment().format('YYYY-MM-DD'); // End date is always the current date

    switch (timeframe) {
    case 'Live':
      // For live data, you might want to fetch the most recent data or set a very short interval
      startDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
      break;
    case '1W':
      startDate = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
      break;
    case '1M':
      startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
      break;
    case '3M':
      startDate = moment().subtract(3, 'months').format('YYYY-MM-DD');
      break;
    case '1Y':
      startDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
      break;
    case '5Y':
      startDate = moment().subtract(5, 'years').format('YYYY-MM-DD');
      break;
    default:
      startDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
    }

    try {
      const response = await axios.get(`http://192.168.1.29:3000/getGraphData?symbols=${symbol}&startDate=${startDate}&endDate=${endDate}`);
      const newGraphData = response.data.content[0].records;
      setTimeframeGraphData(newGraphData); // Update the state with the new graph data
    } catch (error) {
      console.error('Error fetching graph data:', error);
      // Handle the error, e.g., by setting an error message in the state and displaying it to the user
    }
  };
  useEffect(() => {
    if (item && item.symbol) {
      fetchGraphData(item.symbol, selectedTimeframe);
    }
  }, [item, selectedTimeframe]); 
  const TimeframeButtons = ({ selectedTimeframe, onSelectTimeframe }) => {
    const timeframes = ['Live', '1W', '1M', '3M', '1Y', '5Y'];
  
    return (
      <View style={styles.timeframeButtonsContainer}>
        {timeframes.map((timeframe) => {
          const isSelected = selectedTimeframe === timeframe;
          return (
            <TouchableOpacity
              key={timeframe}
              style={[
                styles.timeframeButton,
                isSelected && styles.selectedTimeframeButton // Apply additional styles if selected
              ]}
              onPress={() => onSelectTimeframe(timeframe)}
            >
              <Text style={[
                styles.timeframeButtonText,
                isSelected && styles.selectedTimeframeButtonText // Bold text if selected
              ]}>
                {timeframe}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const data = {
    labels: timeframeGraphData.map((record) => record.date), // Replace with your actual data keys
    datasets: [
      {
        data: timeframeGraphData.map((record) => record.price), // Replace with your actual data keys
      },
    ],
  };
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    fetchGraphData(item.symbol, timeframe);
  };

  const cardStyle = {
    ...styles.card,
    transform: pan.getTranslateTransform(),
  };
  const cardAnimatedStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      
    ],
  };

  return (
    <Animated.View
      style={[styles.card, cardAnimatedStyle, style]} 
      {...panResponder.panHandlers}
    >
      {/* Render Content Graph and stuff Here */}
      <Text style={styles.symbol}>{item.symbol}</Text>
      <Text style={styles.headline}>{item.headline}</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width * 0.9}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <TimeframeButtons
      selectedTimeframe={selectedTimeframe}
      onSelectTimeframe={handleTimeframeChange}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%', 
    height:'70%',
    padding: 20, 
    marginBottom:5, 
    backgroundColor: '#A7C957', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8, 
  },
  headline: {
    fontSize: 16,
  },
  timeframeButtonsContainer: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-around', // Evenly space the buttons
    paddingVertical: 10, // Add some vertical padding
  },
  timeframeButton: {
    padding: 10, // Padding for touchable area
    borderRadius: 15, // Rounded corners
  },
  selectedTimeframeButton: {
    backgroundColor: '#386641', // Background color for selected button
    // Add shadow or other styling for "smoothed rectangular shading" here
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  timeframeButtonText: {
    fontWeight: 'normal', // Default weight
  },
  selectedTimeframeButtonText: {
    fontWeight: 'bold', // Bold text for selected button
  },
});

export default SwipeableCard;
