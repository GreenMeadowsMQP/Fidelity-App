
import React, { useState } from 'react';
import { View, Image,Text, Pressable ,Platform} from 'react-native';
import styles from './styles';
import CompanyLogoSvg from './assets/images/HomebarImages/Homelogo.svg';
import InfoIconSvg from './assets/images/HomebarImages/info.svg';
import SliderIconSvg from './assets/images/HomebarImages/settings-sliders.svg';

const Header = ({title, onInfoPress, navigation}) => {
  const renderIcon = (iconType) => {
    // Determine which icon to render
    switch (iconType) {
      case 'companyLogo':
        if (Platform.OS === 'web') {
          return <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />;
        } else {
          return <CompanyLogoSvg width={70} height={70} style={styles.logo} />;
        }
      case 'info':
        if (Platform.OS === 'web') {
          return <Image source={require('./assets/images/HomebarImages/info.png')} style={styles.icon} />;
        } else {
          return <InfoIconSvg width={40} height={40} fill='#386641' />;
        }
      case 'slider':
        if (Platform.OS === 'web') {
          return <Image source={require('./assets/images/HomebarImages/slider.png')} style={styles.icon} />;
        } else {
          return <SliderIconSvg width={40} height={40} fill='#386641' />;
        }
      default:
        return null;
    }
  };
  return (
    <View style={styles.header}>
      <View style={styles.leftcontainer}>
        {renderIcon('companyLogo')}
        <Text style={styles.appTitle}>{title}</Text>
      </View>
      <View style={styles.rightcontainer}>
        <Pressable onPress={onInfoPress}>
          {renderIcon('info')}
        </Pressable>
        <Pressable onPress={() => navigation?.navigate('Filter')}>
          {renderIcon('slider')}
        </Pressable>
      </View>
    </View>
  );
};


export default Header;