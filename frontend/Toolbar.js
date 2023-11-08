import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { cards } from './App';

const Toolbar = ({ onButton1Press, onButton2Press, onButton3Press }) => {
  // Define your button and overlay images
  const buttonImages = {
    button1: require('./assets/images/ToolbarImages/Vector.png'),
    button2: require('./assets/images/ToolbarImages/Vector1.png'),
    button3: require('./assets/images/ToolbarImages/Vector2.png'),
    overlay1: require('./assets/images/ToolbarImages/Ellipse1.png'),
    overlay2: require('./assets/images/ToolbarImages/Ellipse3.png'),
    overlay3: require('./assets/images/ToolbarImages/Ellipse2.png'),
  };

  onButton1Press = () => {
    console.log('Make left swipe');
    let curCard = cards[0];
    console.log(curCard);
    curCard.panResponder.onPanResponderRelease(null, {dx:-width, dy:0});
  }

  onButton2Press = () => {
    console.log('Make up swipe')
    
  }
  onButton3Press = () => {
    console.log('Make right swipe')
    
  }

  return (
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
  );
};

const styles = StyleSheet.create({
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

export default Toolbar;
