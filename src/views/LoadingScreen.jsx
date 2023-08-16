import React, { useState, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import logoSvg from '../../assets/logo-invert.svg'; // Asegúrate de proporcionar la ruta correcta

const LoadingScreen = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bounce,
        useNativeDriver: false,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [progress]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const interpolatedOpacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });



  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: interpolatedOpacity }]}>
        {/* Utiliza el componente Svg para renderizar el archivo SVG */}
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 414,
    height: 816,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',

    opacity: 0,
  },
});

export default LoadingScreen;
