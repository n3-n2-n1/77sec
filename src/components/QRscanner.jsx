import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleScan = ({ data }) => {
        console.log('QR escaneado:', data);
        navigation.navigate('LoadPresentismo', { userIdFromQR: data });
        setScanned(true);
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
