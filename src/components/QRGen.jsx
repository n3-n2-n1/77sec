import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment'; // Importa la librería moment para manipular fechas
import { useState, useEffect } from 'react';
import LoadingSpinner from 'react-native-loading-spinner-overlay'; // Import a loading spinner component

const QRCodeGenerator = ({ userData }) => {
  const [qrValue, setQRValue] = useState('');

  useEffect(() => {
    // Genera el valor inicial del QR al cargar el componente
    generateQRValue(userData);

    // Establece un intervalo de 1 minuto para regenerar el valor del QR
    const interval = setInterval(() => generateQRValue(userData), 60);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [userData]);

  const generateQRValue = (user) => {
    // Genera la información del QR con el nombre o DNI del usuario, la hora y fecha actual
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const qrData = `Usuario: ${user}\nFecha y Hora: ${currentDate}`;
    setQRValue(qrData);
  };

  return (
    <View style={styles.container}>
      {qrValue ? (
        <QRCode value={qrValue} size={200} />
      ) : (
        <Text style={styles.instructions}>Generando QR...</Text>
      )}
    </View>
  );
      }  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QRCodeGenerator;