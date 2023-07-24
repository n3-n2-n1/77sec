import React from "react";


import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ThankYouScreen = () => {
    const navigation = useNavigation();

    const handleFormRestart = () => {
        // Navigate back to the Form screen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.thankYouContainer}>
            <Text style={styles.thankYouText}>¡Gracias por enviar el formulario!</Text>
            <TouchableOpacity style={styles.restartButton} onPress={handleFormRestart}>
                <Text style={styles.restartButtonText}>Volver a llenar el formulario</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    thankYouContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // You can change the background color as needed
    },
    thankYouText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    restartButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    restartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ThankYouScreen