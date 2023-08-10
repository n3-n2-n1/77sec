import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'; // Asegúrate de haber instalado esta librería
import firebase from '../database/firebaseC';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const AlertComponent = () => {
  const [canMakeCall, setCanMakeCall] = useState(false);
  
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(countdownTimer);
      setCanMakeCall(true);
    }

    return () => clearInterval(countdownTimer);
  }, [countdown]);

  const handleCallButtonPress = () => {
    if (canMakeCall) {
      const phoneNumber = '1234567890'; // Cambia esto al número de teléfono deseado
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      console.log('Espera 30 segundos antes de poder realizar la llamada.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Tiempo restante: {countdown} segundos</Text>
      <TouchableOpacity
        style={[styles.callButton, canMakeCall ? styles.enabledCallButton : styles.disabledCallButton]}
        onPress={handleCallButtonPress}
        disabled={!canMakeCall}
      >
        <Text style={styles.callButtonText}>Llamar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    marginBottom: 20,
  },
  callButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  enabledCallButton: {
    backgroundColor: 'green',
  },
  disabledCallButton: {
    backgroundColor: 'gray',
  },
  callButtonText: {
    color: 'white',
  },
});

export default AlertComponent;