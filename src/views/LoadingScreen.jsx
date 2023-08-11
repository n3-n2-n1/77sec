import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Animated, Easing, StyleSheet, Text } from 'react-native';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [progress]);

  const interpolatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: interpolatedWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 300,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    
    paddingLeft: 100,
  },
  loadingText:{
    color: 'white',
    fontSize: 15,
    fontFamily: 'Epilogue-Variable',
    alignContent: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: '50%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default LoadingScreen;
