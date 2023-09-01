import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'; // Asegúrate de haber instalado esta librería
import firebase from '../database/firebaseC';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';


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

  const callCentral = () => {
    const phoneCentral = '12394384';
    const url = `tel:${phoneCentral}`;
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#FDC826"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>
          Nuevo Reporte
        </Text>
      </View>

      <View>
        <Flatlist>

          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Llamar policia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Llamar Central</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Llamar Supervisor</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Llamar SAME</Text>
          </TouchableOpacity>

        </Flatlist>
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
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 15,

  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',

  },
});

export default AlertComponent;