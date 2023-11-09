import React from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';


const HomeBar = ({navigation}) => {
    
    const buttonImages = {
        watchlist: require('./assets/images/HomebarImages/watchlist.png'),
        home: require('./assets/images/HomebarImages/homelogo.png'),
        profile: require('./assets/images/HomebarImages/profile.png'),
      };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {/* Watchlist Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('WatchList')} >
        <Image source={buttonImages.watchlist} style={styles.buttonBackground} />
      </Pressable>

        {/* Home Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('HomePage')} >
        <Image source={buttonImages.home} style={styles.buttonBackground} />
      </Pressable>

        {/* Profile Button */}
      <Pressable style={styles.button} >
        <Image source={buttonImages.profile} style={styles.buttonBackground} />
      </Pressable>
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