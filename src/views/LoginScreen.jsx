import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {


  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    navigation.navigate('Register')

  }

  const handleLogin = () => {
    // Lógica para iniciar sesión con Firebase Authentication
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirigimos al usuario a la pantalla principal (Home) si está autenticado
      
          navigation.navigate('Home');
       
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        if (error.code === 'auth/invalid-email') {
          alert('La dirección de correo electrónico tiene un formato incorrecto. Por favor, verifica tu correo electrónico.');
        } else if (error.code === 'auth/wrong-password'){
          alert('Ocurrió un error al iniciar sesión. Por favor, verifica tu contraseña');
        } else{
          alert ('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.')

        }
      });
    }      

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.actions}>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'black',
  },
  actions:{
    width: '40%',
    gap: 30,
    paddingTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 60,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'yellow',
    padding: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
