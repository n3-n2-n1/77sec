import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import { database } from '../database/firebaseC';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment'; // Importa la librería moment para manipular fechas

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
        }
    }, [location, nombre]);

    const handleGuardarPresentismo = async () => {
        try {
            if (!location) {
                console.log('Aún no se ha obtenido la ubicación.');
                return;
            }
            const presentismoData = {
                nombre: nombre,
                timestamp: firebase.firestore.Timestamp.now(),
                coordenadas: location.coords,
                qrData: 'Presente',  // Guardar las coordenadas de ubicación
            };

            await database.collection('presentismo').add(presentismoData);

            setGuardadoExitoso(true);
            console.log('Presentismo guardado con éxito.');
            alert('Presentismo guardado con exito');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error al guardar el presentismo:', error);
        }
    };

    return (
        <View style={styles.container}>
            {qrValue ? (
                <QRCode value={qrValue} size={200} />
            ) : (
                <Text style={styles.instructions}>Generando QR...</Text>
            )}
            <Text>Insertar Nombre</Text>
            <Text>Coordenadas: {location ? `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}` : 'Obteniendo ubicación...'}</Text>
            <TextInput
                placeholder="Nombre del Vigilador"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
            <Button title="Guardar Presentismo" onPress={handleGuardarPresentismo} />
            {guardadoExitoso && <Text>Presentismo guardado con éxito.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    instructions: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LoadPresentismo;
