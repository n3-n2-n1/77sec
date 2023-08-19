import React, { useState, useEffect } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Estado para la opacidad del logo

  useEffect(() => {
    startAnimation(); // Comienza la animación cuando el componente se monta
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, // Duración de la animación en milisegundos
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, // Duración de la animación en milisegundos
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1, // -1 para que se repita indefinidamente
      }
    ).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/logo.png')} // Ajusta la ruta de la imagen si es necesario
        style={{ ...styles.logo, opacity: fadeAnim }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#3780C3'
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LoadingScreen;
