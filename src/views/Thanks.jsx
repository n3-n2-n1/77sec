import React from "react";


import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ThankYouScreen = ({route}) => {
    
    const navigation = useNavigation();

    const { onFormRestart } = route.params;

    const handleFormRestart = () => {
        // Navigate back to the Form screen
        
        onFormRestart();
        navigation.navigate('Home');
    };



    return (
        <View style={styles.thankYouContainer}>
            <Text style={styles.thankYouText}>¡Gracias por enviar el formulario!</Text>
            <TouchableOpacity style={styles.restartButton} onPress={handleFormRestart}>
                <Text style={styles.restartButtonText}>Volver a llenar el reporte</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    thankYouContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3780C3', // You can change the background color as needed
    },
    thankYouText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    restartButton: {
        backgroundColor: 'blue',
        padding: 15,
        backgroundColor:'white',
        paddingHorizontal: 24,
        borderRadius: 25,
    },
    restartButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ThankYouScreen