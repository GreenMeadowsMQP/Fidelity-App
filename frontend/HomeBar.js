import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeBar = () => {
    
    const buttonImages = {
        watchlist: require('./assets/images/HomebarImages/watchlist.png'),
        home: require('./assets/images/HomebarImages/homelogo.png'),
        profile: require('./assets/images/HomebarImages/profile.png'),
      };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {/* Watchlist Button */}
      <TouchableOpacity style={styles.button} >
        <Image source={buttonImages.watchlist} style={styles.buttonBackground} />
      </TouchableOpacity>

        {/* Home Button */}
      <TouchableOpacity style={styles.button} >
        <Image source={buttonImages.home} style={styles.buttonBackground} />
      </TouchableOpacity>

        {/* Profile Button */}
      <TouchableOpacity style={styles.button} >
        <Image source={buttonImages.profile} style={styles.buttonBackground} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
    width: 60, 
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30, // This adds space between the buttons.
    },
    buttonBackground: {
        position: 'absolute',
        width: '100%', // Full width of the button.
        height: '100%', // Full height of the button.
    },
});

export default HomeBar;