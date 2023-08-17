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
                // Muestra un alert indicando que el DNI ingresado no coincide con ningún usuario
                alert('DNI ingresado no válido. Verifica el DNI.');
                return;
            }

            const userData = userSnapshot.docs[0].data();

            if (userDni !== userData.dni) {
                console.log(userData.dni)
                console.log('DNI ingresado no coincide con el DNI del usuario.');
                // Muestra un alert indicando que el DNI ingresado no coincide con el usuario autenticado
                alert('El DNI ingresado no coincide con el DNI del usuario autenticado.');
                return;
            }

            const horasTrabajadasRef = userSnapshot.docs[0].ref.collection('horasTrabajadas'); // Obtener la referencia a la subcolección
            const presentismoData = {
                fecha: moment().format('YYYY-MM-DD'), // Formato de fecha YYYY-MM-DD
                entrada: moment().format('HH:mm:ss'), // Formato de hora HH:mm:ss
                salida: '',
                dni: userDni,
                coordenadas: location
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
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
                        <Path
                            d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                            fill="white"
                        />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Agregar entrada
                </Text>
            </View>

            <View style={styles.container2}>
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
                    <Text style={styles.instructions}>Ingresa tu DNI</Text>
                    <TextInput
                        placeholder="Ingrese el DNI"
                        value={dni}
                        onChangeText={setDni}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleGuardarPresentismo}>
                        <Text style={styles.buttonText}>Guardar entrada</Text>
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

export default LoadPresentismo;
