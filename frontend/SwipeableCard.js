
import React, { useRef } from 'react';
import { Animated, Image, PanResponder, Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Toolbar from './Toolbar';


const SwipeableCard = ({ item,onSwipe,style}) => {
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

  const buttonImages = {
    button1: require('./assets/images/ToolbarImages/Vector.png'),
    button2: require('./assets/images/ToolbarImages/Vector1.png'),
    button3: require('./assets/images/ToolbarImages/Vector2.png'),
    overlay1: require('./assets/images/ToolbarImages/Ellipse1.png'),
    overlay2: require('./assets/images/ToolbarImages/Ellipse3.png'),
    overlay3: require('./assets/images/ToolbarImages/Ellipse2.png'),
  };

  const onButton1Press = () => {
    console.log('Make left swipe !');
    acceptSwipe(-width, 0);
  }

  const onButton2Press = () => {
    console.log('Make up swipe !')
    acceptSwipe(0, -height);
    
  }
  const onButton3Press = () => {
    console.log('Make right swipe !')
    acceptSwipe(width, 0);
  }

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
      <View style={styles.toolbar}>
      {/* Button 1 */}
      <TouchableOpacity style={styles.button} onPress={onButton1Press}>
        <Image source={buttonImages.button1} style={styles.buttonBackground} />
        <Image source={buttonImages.overlay1} style={styles.buttonOverlay} />
      </TouchableOpacity>

      {/* Button 2 */}
      <TouchableOpacity style={styles.button} onPress={onButton2Press}>
        <Image source={buttonImages.button2} style={styles.buttonBackground} />
        <Image source={buttonImages.overlay2} style={styles.buttonOverlay} />
      </TouchableOpacity>

      {/* Button 3 */}
      <TouchableOpacity style={styles.button} onPress={onButton3Press}>
        <Image source={buttonImages.button3} style={styles.buttonBackground} />
        <Image source={buttonImages.overlay3} style={styles.buttonOverlay} />
      </TouchableOpacity>
    </View>
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
    resizeMode: 'contain', // 'cover' will fill the area and might cut off parts, 'contain' will make sure all parts are visible.
    borderRadius: 32, // Half of the overlay size to make it circular.
    // Remove top and left percentages. Instead, center using the following technique:
    alignSelf: 'center',
    // Negative margins will effectively expand the touchable area and allow the overlay to be fully visible.
    marginVertical: -(64 - 60) / 2, // Adjust this value based on your overlay size.
  },
});

export default SwipeableCard;
