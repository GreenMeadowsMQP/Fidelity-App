
import React, { useState } from 'react';
import { View, Image,Text, Pressable } from 'react-native';
import styles from './styles';

const Header = ({title, onInfoPress, navigation}) => {

  return (
    <View style={styles.header}>
    <View style={styles.leftcontainer}>
      <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
      <Text style={styles.appTitle}>{title}</Text>
    </View>
    <View style={styles.rightcontainer}>

      <Pressable onPress={onInfoPress}>
        <Image source={require('./assets/images/HomebarImages/info.png')} style={styles.icon}/>
      </Pressable>
      
      <Pressable onPress={() => navigation?.navigate('Filter')}>
        <Image source={require('./assets/images/HomebarImages/slider.png')} style={styles.icon}/>
      </Pressable>

    </View>
  </View>
  );
};

export default Header;