import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScan = async ({ data }) => {
    // Aquí puedes procesar los datos del escaneo, como la hora y el día
    console.log('QR escaneado:', data);
  
    // Obtén los datos del usuario desde Firebase usando el ID o algún identificador único
    try {
      const userId = getUserIdFromQR(data); // Asume que tienes una función para obtener el ID del usuario desde el QR
      const userSnapshot = await firebase.firestore().collection('users').doc(userId).get();
      const userData = userSnapshot.data();
  
      if (userData) {
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  
    setScanned(true);
    // Aquí puedes enviar los datos a tu base de datos o realizar otras acciones
  };

  
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScan}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
          <Text>Escanear nuevamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanDataContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  scanAgainButton: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default QRScanner;