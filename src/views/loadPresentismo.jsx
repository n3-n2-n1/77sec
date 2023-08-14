import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase/compat/app';
import { database } from '../database/firebaseC';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment'; // Importa la librería moment para manipular fechas
import { Svg, Path } from 'react-native-svg';
import 'firebase/compat/auth';


const LoadPresentismo = ({ route }) => {
    const [dni, setDni] = useState('');
    const [guardadoExitoso, setGuardadoExitoso] = useState(false);
    const [location, setLocation] = useState(null);
    const navigation = useNavigation();
    const [qrValue, setQRValue] = useState('');

    useEffect(() => {
        // Pedir permiso para acceder a la ubicación
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                // Obtener la ubicación actual
                const currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
            }
        })();
    }, []);

    useEffect(() => {
        if (location) {
            // Genera la información del QR con el DNI del vigilante, la ubicación y la hora actual
            const currentDate = new Date().toLocaleString();
            const qrData = `DNI: ${dni}\nUbicación: Lat ${location.coords.latitude}, Long ${location.coords.longitude}\nFecha y Hora: ${currentDate}`;
            setQRValue(qrData);
            console.log(currentDate);
        }
    }, [location, dni]);

    const handleGuardarPresentismo = async () => {
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

            const userDni = dni; // Usar el DNI ingresado
            const userSnapshot = await database.collection('users').where('dni', '==', userDni).get();

            if (userSnapshot.empty) {
                console.log('No se encontró información del usuario.');
                return;
            }

            const userDoc = userSnapshot.docs[0];
            const userData = userDoc.data();

            const horasTrabajadasRef = userDoc.ref.collection('horasTrabajadas'); // Obtener la referencia a la subcolección

            const presentismoData = {
                fecha: moment().format('LL'),
                entrada: moment().format('LTS'),
                salida: '',
                dni: userDni
            };

            console.log(presentismoData)

            await horasTrabajadasRef.add(presentismoData); // Agregar a la subcolección

            setGuardadoExitoso(true);
            console.log('Horas trabajadas guardadas con éxito.');
            alert('Horas trabajadas guardadas con éxito');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error al guardar las horas trabajadas:', error);
        }
    };


    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container2}>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
                        <Path
                            d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                            fill="#ffffff"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.containerIn}>
                    <View style={styles.qr}>
                        {qrValue ? (
                            <View style={styles.qrContainer}>
                                <QRCode value={qrValue} size={200} />
                            </View>
                        ) : (
                            <Text style={styles.instructions}>Generando Código QR...</Text>
                        )}
                    </View>
                    <View style={styles.coordinatesContainer}>
                        <Text style={styles.coordinatesText}>
                            Coordenadas: {location ? `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}` : 'Obteniendo ubicación...'}
                        </Text>
                    </View>
                    <Text style={styles.instructions}>Insertar DNI del Vigilador</Text>
                    <TextInput
                        placeholder="Ingrese el DNI"
                        value={dni}
                        onChangeText={setDni}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleGuardarPresentismo} onFocus={'white'}>
                        <Text style={styles.buttonText}>Guardar Presentismo</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    qr:{
        padding: 15,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 25,
        justifyContent: 'center'

    },
    container2: {
        flex: 1,
        backgroundColor: 'black',
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
    coordinatesContainer:{
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
        flex: 1,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: 245,
        marginTop: 26,
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
        marginBottom: 20,
        paddingTop: 30,
        paddingLeft: 30,
      },
});

export default LoadPresentismo;
