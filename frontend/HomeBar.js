import React from 'react';
import { View, Pressable, StyleSheet ,Platform, Image} from 'react-native';
import WatchlistIcon from './assets/images/HomebarImages/bookmark.svg';
import HomeIcon from './assets/images/HomebarImages/Homelogo.svg';
import ProfileIcon from './assets/images/HomebarImages/user.svg';


const HomeBar = ({ navigation }) => {
  const buttonImages = {
    watchlist: {
      svg: <WatchlistIcon width={45} height={45} fill="#386641" />,
      png: require('./assets/images/HomebarImages/watchlist.png'),
    },
    home: {
      svg: <HomeIcon width={80} height={80} />,
      png: require('./assets/images/HomebarImages/homelogo.png'),
    },
    profile: {
      svg: <ProfileIcon width={50} height={50} fill="#386641" />,
      png: require('./assets/images/HomebarImages/profile.png'),
    },
  };

  const renderIcon = (key) => {
    // Check if the platform is web
    if (Platform.OS === 'web') {
      // Return PNG for web
      return <Image source={buttonImages[key].png} style={styles.buttonBackground} />;
    } else {
      // Return SVG for iOS and other platforms
      return buttonImages[key].svg;
    }
  };

  return (
    <View style={{marginBottom:-35,marginTop:-30,flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {/* Watchlist Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('WatchList')} >
        {renderIcon('watchlist')}
      </Pressable>

        {/* Home Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('HomePage')} >
        {renderIcon('home')}
      </Pressable>

        {/* Profile Button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')} >
        {renderIcon('profile')}
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