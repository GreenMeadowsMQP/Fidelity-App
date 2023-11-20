
import React from 'react';
import { View, Image,Text } from 'react-native';
import styles from './styles';

const Header = ({title}) => {


  return (
    <View style={styles.header}>
    <View style={styles.leftcontainer}>
      <Image source={require('./assets/images/CompanyLogo.png')} style={styles.logo} />
      <Text style={styles.appTitle}>{title}</Text>
    </View>
    <View style={styles.rightcontainer}>
      <Image source={require('./assets/images/HomebarImages/info.png')} style={styles.icon}/>
      <Image source={require('./assets/images/HomebarImages/slider.png')} style={styles.icon}/>
    </View>
  </View>
  );
};

export default Header;