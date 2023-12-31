import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import { database } from '../database/firebaseC';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment'; // Importa la librería moment para manipular fechas
import LoadingSpinner from 'react-native-loading-spinner-overlay';




const MarcarSalida = ({}) => {
    const [dni, setDni] = useState('');
    const [guardadoExitoso, setGuardadoExitoso] = useState(false);
    const [location, setLocation] = useState(null);
    const navigation = useNavigation();
    const [qrValue, setQRValue] = useState('');
    const [loading, setLoading] = useState(true); // Inicialmente, muestra la pantalla de carga
  
    useEffect(() => {
      const getLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
          } else {
            console.log('Permiso de ubicación no otorgado.');
          }
        } catch (error) {
          console.error('Error al obtener la ubicación:', error);
        } finally {
          setLoading(false); // Cuando se obtiene la ubicación, oculta la pantalla de carga
        }
      };
  
      getLocation();
    }, []);
  
    useEffect(() => {
      if (location) {
        const currentDate = new Date().toLocaleString();
        const qrData = `DNI: ${dni}\nUbicación: Lat ${location.coords.latitude}, Long ${location.coords.longitude}\nFecha y Hora: ${currentDate}`;
        setQRValue(qrData);
      }
    }, [location, dni]);
  
    const handleMarcarSalida = async () => {
      setLoading(true);
  
      try {
        if (!location) {
          console.log('Aún no se ha obtenido la ubicación.');
          return;
        }
  
        const user = firebase.auth().currentUser;
        if (!user) {
          console.log('Usuario no autenticado.');
          return;
        }
  
        const userDni = dni;
        const userSnapshot = await database.collection('users').where('dni', '==', userDni).get();
  
        if (userSnapshot.empty) {
          console.log('No se encontró información del usuario.');
          return;
        }
  
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
  
        const nombre = userData.name;
  
        const horasTrabajadasRef = userDoc.ref.collection('horasTrabajadas');
        const querySnapshot = await horasTrabajadasRef.where('salida', '==', '').orderBy('entrada', 'desc').limit(1).get();
  
        if (!querySnapshot.empty) {
          const documentId = querySnapshot.docs[0].id;
          const salidaTimestamp = firebase.firestore.Timestamp.now();
  
          await horasTrabajadasRef.doc(documentId).update({
            salida: moment(salidaTimestamp.toDate()).format('HH:mm:ss'),
            nombre: nombre,
          });
  
          setGuardadoExitoso(true);
          console.log('Marca de salida registrada con éxito.');
          alert('Marca de salida registrada con éxito.');
          navigation.goBack();
        } else {
          console.log('No se encontró registro de entrada sin salida para este DNI.');
        }
      } catch (error) {
        console.error('Error al marcar la salida:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>


            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
                        <Path
                            d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                            fill="#ffffff"
                        />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.title}>Marcar salida</Text>

            </View>

            <View style={styles.container2}>
                <View style={styles.containerIn}>
                    <View style={styles.qr}>
                        {loading ? (
                            <LoadingSpinner visible={loading} textContent={'Obteniendo tu ubicación...'} animation={'slide'} textStyle={{ color: '#FFF' }} overlayColor={'black'} />
                        ) : qrValue ? (
                            <View style={styles.qrContainer}>
                                <QRCode value={qrValue} size={200} />
                            </View>
                        ) : (
                            <Text style={styles.instructions}>Generando Código QR...</Text>
                        )}
                    </View>
                    <Text style={styles.instructions}>Ingresa tu DNI</Text>
                    <TextInput
                        placeholder="Ingrese el DNI"
                        value={dni}
                        onChangeText={setDni}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleMarcarSalida}>
                        <Text style={styles.buttonText}>Guardar salida</Text>
                    </TouchableOpacity>
                    {guardadoExitoso && <Text style={styles.successText}>Presentismo guardado con éxito.</Text>}
                </View>
            </View>


        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3780C3',
        padding: 15
    },

    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 800,
        paddingRight: 16,
        fontFamily: 'Epilogue-Variable',

    },
    qr: {
        padding: 15,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    container2: {
        flex: 1,
        backgroundColor: '#3780C3',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    containerIn: {
        alignItems: 'center',
    },
    input: {
        width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontFamily: 'Epilogue-Variable',

    },
    instructions: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: '#333',
        fontFamily: 'Epilogue-Variable',
        color: 'white'
    },
    qrContainer: {
    },
    qrText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
        fontFamily: 'Epilogue-Variable',
    },
    coordinatesContainer: {
        borderColor: 'black',
        borderWidth: 3,
        padding: 15,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBotton: 15,
    },
    coordinatesText: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Epilogue-Variable',
        width: 178,
        textAlign: 'center'
    },
    successText: {
        fontSize: 16,
        color: 'green',
        marginTop: 10,
        fontFamily: 'Epilogue-Variable',

    },
    button: {
        backgroundColor: '#F89A53',
        padding: 10,
        marginTop: 20,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Epilogue-Variable',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 5,
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
});


export default MarcarSalida;
