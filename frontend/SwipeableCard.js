
import React, { useState,useRef,useEffect } from 'react';
import {Animated, Image, PanResponder, Dimensions, StyleSheet, View, Text ,Pressable} from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis,Tooltip } from 'react-native-responsive-linechart';
import axios from 'axios';
import moment from 'moment';
const myIP = '192.168.56.1'; //CHANGE IP TO RUN LOCALLY
const SwipeableCard = ({ item,onSwipe,style}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Live'); // Default to 1M
  const [timeframeGraphData, setTimeframeGraphData] = useState([]);
  const pan = useRef(new Animated.ValueXY()).current;
  const { width, height } = Dimensions.get('screen');
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease(e, { dx, dy }) {
      acceptSwipe(dx, dy);
    },
  });

  const acceptSwipe = (dx, dy) => {
    const isHorizSwipe = Math.abs(dx) > width * 0.25; // consider a swipe if it's more than half the width of the screen
    const isVertSwipe = dy < -height * 0.2;
    //Negative dx = Left swipe, Positive dx = Right swipe
    //negative dy = up swipe
    
    if (isHorizSwipe || isVertSwipe) {
      // Continue the animation off the screen
      // Determine type of swipe and therefore type of animation 
      var toVal = { x: dx > 0 ? width : -width, y: dy };
      if(isVertSwipe) toVal = { x: dx, y: dy < 0 ? -height : dy};
      
      Animated.timing(pan, {
        toValue: toVal,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if(!isVertSwipe){
        if(dx > 0){
          //Right swipe
          //TODO: HANDLE ADDING TO WATCHLIST 
          console.log('Right swipe: Handle adding to watchlist');
          sendDataToServer(item.symbol, item.headline)
        } else{
          console.log('Left swipe: Nothing to do here');
        }

        // Call function to go to next card or handle the swipe off logic
        } else{
          // Handle vertical swipe
          console.log('Up swipe: Handle Trade action');
          
        }
        onSwipe();
      });
    } else {
      // Snap back if not swiped off
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }

  const sendDataToServer = (symb, hdln) => {
    const dataToSend = {
      Symbol: symb,
      Headline: hdln,
    };

    axios.post('http://localhost:3000/storeData', dataToSend)
  .then((response) => {
    // Handle the response from the server, e.g., show a success message to the user
    console.log(response.data);
  })
  .catch((error) => {
    // Handle any errors, e.g., display an error message to the user
    console.error(error);
  });
  }

  const buttonImages = {
    button1: require('./assets/images/ToolbarImages/Vector.png'),
    button2: require('./assets/images/ToolbarImages/Vector1.png'),
    button3: require('./assets/images/ToolbarImages/Vector2.png'),
    overlay1: require('./assets/images/ToolbarImages/Ellipse1.png'),
    overlay2: require('./assets/images/ToolbarImages/Ellipse3.png'),
    overlay3: require('./assets/images/ToolbarImages/Ellipse2.png'),
  };
  
  const onButton1Press = () => {
    acceptSwipe(-width, 0);
  }

  const onButton2Press = () => {
    acceptSwipe(0, -height);
    
  }
  const onButton3Press = () => {
    acceptSwipe(width, 0);
  }
  // Function to fetch graph data
  const fetchGraphData = async (symbol, timeframe) => {
    let startDate;
    const endDate = moment().format('YYYY-MM-DD'); // End date is always the current date

    switch (timeframe) {
    case 'Live':
      // For live data, you might want to fetch the most recent data or set a very short interval
      startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
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
      startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    }

    try {
      const response = await axios.get('http://' + myIP + ':3000/getGraphData?symbols='+symbol+'&startDate='+startDate+'&endDate='+ endDate);
      const newGraphData = response.data.content[0].records
      console.log("Fetched data: ", newGraphData);
      setTimeframeGraphData(newGraphData);
      console.log("State update called");
      
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
            <Pressable
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
            </Pressable>
          );
        })}
      </View>
    );
  };
  const transformedData = timeframeGraphData.map((item,index) => {
    return {
      x: index, // or convert the date to a more suitable format if needed
      y: item.price,
    };
    
  });
  useEffect(() => {
    console.log('Graph Data:', timeframeGraphData);
    console.log("Data", transformedData);
  }, [timeframeGraphData,item,selectedTimeframe]);
 
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
  const maxYValue = Math.max(...transformedData.map(item => item.y));
  const maxXValue = Math.max(...transformedData.map(item => item.x));
  if (!transformedData || transformedData.length === 0) {
    // Handle the case where data is not available
    return <Text>Loading data...</Text>; // Or any other placeholder
  }

  return (
    <Animated.View
      style={[styles.card, cardAnimatedStyle, style]} 
      {...panResponder.panHandlers}
    >
      {/* Render Content Graph and stuff Here */}
      <Text style={styles.symbol}>{item.symbol}</Text>
      <Text style={styles.headline}>{item.headline}</Text>
      <Text style={styles.price}>Price</Text>
      
        <Chart
            style={{ height: 200, width: '100%' }}
            data={transformedData}
            padding={{ left: 0, bottom: 0, right: 0, top: 20 }}
            xDomain={{ min: (Math.min(...transformedData.map(item => item.x))), max: (Math.max(...transformedData.map(item => item.x)))}}
            yDomain={{ min: (Math.min(...transformedData.map(item => item.y))), max:( Math.max(...transformedData.map(item => item.y))) }}
        >
            <VerticalAxis tickCount={10} theme={{grid:{visible:false},axis:{visible:false},ticks:{visible:false}, labels:{visible:false} }} />
            <HorizontalAxis tickCount={transformedData.length} theme={{axis:{visible:false},ticks:{visible:false},grid:{visible:false},labels:{visible:false}}} />
            <Area smoothing='cubic-spline' theme={{ gradient: { from: { color: '#BC4749' }, to: { color: '#A7C957', opacity: 0.2 } } }} />
            <Line
            tooltipComponent={<Tooltip  />}
            
            theme={{ stroke: { color: '#BC4749', width: 5 } }}
            />
            
        </Chart>     
      <TimeframeButtons
      selectedTimeframe={selectedTimeframe}
      onSelectTimeframe={handleTimeframeChange}
      />
      <View style={styles.toolbar}>
        {/* Button 1 */}
        <Pressable style={styles.button} onPress={onButton1Press}>
          <Image source={buttonImages.button1} style={styles.buttonBackground} />
          <Image source={buttonImages.overlay1} style={styles.buttonOverlay}resizeMode="contain" />
        </Pressable>

        {/* Button 2 */}
        <Pressable style={styles.button} onPress={onButton2Press}>
          <Image source={buttonImages.button2} style={styles.buttonBackground} />
          <Image source={buttonImages.overlay2} style={styles.buttonOverlay}resizeMode="contain" />
        </Pressable>

        {/* Button 3 */}
        <Pressable style={styles.button} onPress={onButton3Press}>
          <Image source={buttonImages.button3} style={styles.buttonBackground} />
          <Image source={buttonImages.overlay3} style={styles.buttonOverlay}resizeMode="contain" />
        </Pressable>
      </View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%', 
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
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop:20,
    marginLeft:20, 
  },
  headline: {
    fontSize: 16,
    margin:20,
  },
  price:{
    marginTop:10,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    
  },
  button: {
    // Set the dimensions large enough to fit the background and overlay.
    width: 60, // Width of the button; you might not need to change this.
    height: 60, // Height must be large enough to accommodate the overlay.
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30, // This adds space between the buttons.
    // If the overlay is still cut off, you might need to increase the height even more.
  },
  buttonBackground: {
    position: 'absolute',
    width: '100%', // Full width of the button.
    height: '100%', // Full height of the button.
    borderRadius: 30, // Half of the width to make it circular, adjust if needed.
  },
  buttonOverlay: {
    position: 'absolute',
    width: 80, // Width of the overlay in pixels.
    height: 80, // Height of the overlay in pixels.
    borderRadius: 32, // Half of the overlay size to make it circular.
    // Remove top and left percentages. Instead, center using the following technique:
    alignSelf: 'center',
    // Negative margins will effectively expand the touchable area and allow the overlay to be fully visible.
    marginVertical: -(64 - 60) / 2, // Adjust this value based on your overlay size.
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
    // Add boxShadow or other styling for "smoothed rectangular shading" here
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.2,
    boxShadowRadius: 3,
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
