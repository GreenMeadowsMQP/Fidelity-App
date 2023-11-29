
import React, { useState } from 'react';
import { View, Image,Text, Pressable } from 'react-native';
import styles from './styles';
import CompanyLogo from './assets/images/HomebarImages/Homelogo.svg';
import InfoIcon from './assets/images/HomebarImages/info.svg';
import SliderIcon from './assets/images/HomebarImages/settings-sliders.svg';

const Header = ({title, onInfoPress}) => {

  return (
    <View style={styles.header}>
    <View style={styles.leftcontainer}>
    <CompanyLogo width={70} height={70}style={styles.logo} />
      <Text style={styles.appTitle}>{title}</Text>
    </View>
    <View style={styles.rightcontainer}>

      <Pressable onPress={onInfoPress}>
      <InfoIcon width={40} height={40} fill='#386641' />
      </Pressable>

      <SliderIcon width={40}height={40} fill='#386641' />
    </View>
  </View>
  );
};

export default Header;