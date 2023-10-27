import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Image1 from './path-to-image1.svg';
import Image2 from './path-to-image2.svg';
import Image3 from './path-to-image3.svg';

const YourComponent = () => {
  return (
    <View style={styles.container}>
      {/* First SVG Image */}
      <Image1 width={100} height={100} />

      {/* Second SVG Image */}
      <Image2 width={100} height={100} />

      {/* Third SVG Image */}
      <Image3 width={100} height={100} />

      {/* 3/4 Circle */}
      <View style={styles.circleContainer}>
        <Svg height="200" width="200">
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke="blue"
            strokeWidth="20"
            fill="transparent"
            strokeDasharray={`${(Math.PI * 2 * 90) * 0.75} ${(Math.PI * 2 * 90)}`}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

export default YourComponent;
