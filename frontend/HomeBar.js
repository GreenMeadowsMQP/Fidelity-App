import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import WatchlistIcon from './assets/images/HomebarImages/bookmark.svg';
import HomeIcon from './assets/images/HomebarImages/Homelogo.svg';
import ProfileIcon from './assets/images/HomebarImages/user.svg';

const HomeBar = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      {/* Watchlist Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('WatchList')} >
        <WatchlistIcon width={45} height={45} fill="#386641" />
      </Pressable>

      {/* Home Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('HomePage')} >
        <HomeIcon width={80} height={80} />
      </Pressable>

      {/* Profile Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')} >
        <ProfileIcon width={50} height={50} fill="#386641"/>
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
    marginHorizontal: 30, // This adds space between the buttons.
    },
    buttonBackground: {
        position: 'absolute',
        width: '100%', // Full width of the button.
        height: '100%', // Full height of the button.
    },
});

export default HomeBar;