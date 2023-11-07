
import React, { useRef } from 'react';
import { Animated, PanResponder, Dimensions, StyleSheet, View, Text } from 'react-native';

const SwipeableCard = ({ item,onSwipe,style}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const { width, height } = Dimensions.get('screen');
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, { dx, dy }) => {
      const isSwipeOffScreen = Math.abs(dx) > width * 0.25; // consider a swipe if it's more than half the width of the screen
      const isVertSwipe = dy < -height * 0.2;
      //Negative dx = Left swipe, Positive dx = Right swipe
      //negative dy = up swipe
      
      if (isSwipeOffScreen || isVertSwipe) {
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
            console.log('Left swipe');
          }

          onSwipe(); 
          // Call function to go to next card or handle the swipe off logic
          } else{
            // Handle vertical swipe
            console.log('Handle vertical swipe');
            onSwipe();
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
