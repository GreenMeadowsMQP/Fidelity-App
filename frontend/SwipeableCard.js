
import React, { useState,useRef,useEffect } from 'react';
import {Animated, Image, PanResponder, Dimensions, StyleSheet, View, Text ,Pressable,Platform} from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis,Tooltip } from 'react-native-responsive-linechart';
import axios from 'axios';
import moment from 'moment';
import StockGraph from './StockGraph';
import styles from './styles';
// Import SVGs
import Button1IconSvg from './assets/images/ToolbarImages/cross-circle.svg';
import Button2IconSvg from './assets/images/ToolbarImages/usd-circle.svg';
import Button3IconSvg from './assets/images/ToolbarImages/add.svg';
import OverlayIconSvg from './assets/images/ToolbarImages/Circle.svg';

const myIP = 'localhost'; //CHANGE IP TO RUN LOCALLY
// Button and overlay images
const buttonImages = {
  button1: require('./assets/images/ToolbarImages/Vector.png'),
  button2: require('./assets/images/ToolbarImages/Vector1.png'),
  button3: require('./assets/images/ToolbarImages/Vector2.png'),
  overlay1: require('./assets/images/ToolbarImages/Ellipse1.png'),
  overlay2: require('./assets/images/ToolbarImages/Ellipse3.png'),
  overlay3: require('./assets/images/ToolbarImages/Ellipse2.png'),
};


const SwipeableCard = ({ item,onSwipe,style,onUpSwipe}) => {
  const[lastTrade,setLastTrade]=useState([]);
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
          onSwipe();
        } else{
          console.log('Left swipe: Nothing to do here');
          onSwipe();
        }

        // Call function to go to next card or handle the swipe off logic
        } else{
          // Handle vertical swipe
          console.log('Up swipe: Handle Trade action');
          onSwipe();
          onUpSwipe();
          
        }
        
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
  const renderIcon = (iconType, additionalProps = {}) => {
    // Determine which icon to render
    switch (iconType) {
      case 'button1':
        return Platform.OS === 'web' ?
          <Image source={buttonImages.button1} style={styles.buttonBackground} /> :
          <Button1IconSvg width={60} height={60} fill='#BC4749' {...additionalProps} />;
      case 'button2':
        return Platform.OS === 'web' ?
          <Image source={buttonImages.button2} style={styles.buttonBackground} /> :
          <Button2IconSvg width={60} height={60} fill='#6A994E' {...additionalProps} />;
      case 'button3':
        return Platform.OS === 'web' ?
          <Image source={buttonImages.button3} style={styles.buttonBackground} /> :
          <Button3IconSvg width={60} height={60} fill="#386641" {...additionalProps} />;
      case 'overlay':
        return Platform.OS === 'web' ?
          <Image source={buttonImages[`overlay${additionalProps.index}`]} style={styles.buttonOverlay} resizeMode="contain" /> :
          <OverlayIconSvg width={85} height={85} style={{ position: 'absolute', transform: [{ rotate: additionalProps.rotate }] }} />;
      default:
        return null;
    }
  };
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

  
  
  const onButton1Press = () => {
    acceptSwipe(-width, 0);
  }

  const onButton2Press = () => {
    acceptSwipe(0, -height);
    
  }
  const onButton3Press = () => {
    acceptSwipe(width, 0);
  }
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
  // Function to fetch graph data
  
  useEffect(() => {
    if (item && item.symbol) {
      fetchLastTrade(item.symbol); 
    }
  }, []);
  
  
  
  // useEffect(() => {
  //   console.log('Graph Data:', timeframeGraphData);
  //   console.log("Data", transformedData);
  // }, [timeframeGraphData,item,selectedTimeframe]);
 
  

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

  // const maxYValue = Math.max(...transformedData.map(item => item.y));
  // const maxXValue = Math.max(...transformedData.map(item => item.x));
  

  return (
    <Animated.View
      style={[styles.card, cardAnimatedStyle, style]} 
      {...panResponder.panHandlers}
    >
      {/* Render Content Graph and stuff Here */}
      <View>
        <Text style={styles.symbolTextWL}>{item.symbol}</Text>
        <Text style={styles.symbolTextWL}>{lastTrade ? `$${lastTrade}` : 'Loading...'}</Text> 
      </View>
      
      <Text style={styles.infoTextWL}>{item.headline}</Text>
      
      <StockGraph item={item}/>   

      <View style={styles.toolbar}>
        {/* Button 1 */}
        <Pressable style={styles.individualButton} onPress={onButton1Press}>
          {renderIcon('button1')}
          {renderIcon('overlay', { rotate: '-90deg', index: 1 })}
        </Pressable>

        {/* Button 2 */}
        <Pressable style={styles.individualButton} onPress={onButton2Press}>
          {renderIcon('button2')}
          {renderIcon('overlay', { rotate: '0deg', index: 2 })}
        </Pressable>

        {/* Button 3 */}
        <Pressable style={styles.individualButton} onPress={onButton3Press}>
          {renderIcon('button3')}
          {renderIcon('overlay', { rotate: '90deg', index: 3 })}
        </Pressable>
      </View>

    </Animated.View>
  );
};



export default SwipeableCard;
