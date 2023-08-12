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
    const [nombre, setNombre] = useState('');
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
            // Genera la información del QR con el nombre del vigilador, la ubicación y la hora actual
            const currentDate = new Date().toLocaleString();
            const qrData = `Vigilador: ${nombre}\nUbicación: Lat ${location.coords.latitude}, Long ${location.coords.longitude}\nFecha y Hora: ${currentDate}`;
            setQRValue(qrData);
            console.log(currentDate)
        }
    }, [location, nombre]);

    const handleGuardarPresentismo = async () => {
        try {
            if (!location) {
                console.log('Aún no se ha obtenido la ubicación.');
                return;
            }
            const user = firebase.auth().currentUser;
            if (user) {
                const userEmail = user.email; // Obtiene el correo electrónico del usuario actual
                const presentismoData = {
                    nombre: nombre,
                    correo: userEmail, // Utiliza el correo electrónico del usuario
                    entrada: firebase.firestore.Timestamp.now(),
                    coordenadas: location.coords,
                    qrData: 'Presente',
                    salida: '',
                    timestamp: firebase.firestore.Timestamp.now(),
                };

                await database.collection('presentismo').add(presentismoData);

                setGuardadoExitoso(true);
                console.log('Presentismo guardado con éxito.');
                alert('Presentismo guardado con exito');
                navigation.navigate('Home');
            } else {
                console.log('Usuario no autenticado.');
            }
        } catch (error) {
            console.error('Error al guardar el presentismo:', error);
        }
    };

 
    return (

        
        <KeyboardAvoidingView behavior='padding' style={styles.container2}>


        <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
                        <Path
                            d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                            fill="#000000"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
        <View style={styles.container}>
            
            <View style={styles.containerIn}>
                {qrValue ? (
                    <View style={styles.qrContainer}>
                        <QRCode value={qrValue} size={200} />
                    </View>
                ) : (
                    <Text style={styles.instructions}>Generando Código QR...</Text>
                )}
                <Text style={styles.coordinatesText}>
                    Coordenadas: {location ? `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}` : 'Obteniendo ubicación...'}
                </Text>
                <Text>
                    
                </Text>

                <Text style={styles.instructions}>Insertar Nombre del Vigilador</Text>
                <TextInput
                    placeholder=""
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleGuardarPresentismo}>
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
        backgroundColor: '#F5F5F5',
    },
    container2: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    qrContainer: {
        marginBottom: 20,
    },
    qrText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
        fontFamily: 'Epilogue-Variable',
    },
    coordinatesText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
        fontFamily: 'Epilogue-Variable',
        width: 178,
        textAlign: 'left'

    },
    successText: {
        fontSize: 16,
        color: 'green',
        marginTop: 10,
        fontFamily: 'Epilogue-Variable',

    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: 245,
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
