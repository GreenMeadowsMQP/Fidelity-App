
import React, { useRef } from 'react';
import { Animated, PanResponder, Dimensions, StyleSheet, View, Text } from 'react-native';

const SwipeableCard = ({ item,onSwipe,style}) => {
  // Set up animated values
  const pan = useRef(new Animated.ValueXY()).current;

  // Get the screen's width and height for later use
  const { width, height } = Dimensions.get('screen');

  // Create a pan responder to handle the gesture
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

  const cardStyle = {
    ...styles.card,
    transform: pan.getTranslateTransform(),
  };
  const cardAnimatedStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      // ... you might want to add rotation or other transforms
    ],
  };

  return (
    <Animated.View
      style={[styles.card, cardAnimatedStyle, style]} // make sure to include the `style` prop
      {...panResponder.panHandlers}
    >
      {/* Render Content Graph and stuff Here */}
      <Text style={styles.symbol}>{item.symbol}</Text>
      <Text style={styles.headline}>{item.headline}</Text>
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
});

export default SwipeableCard;
