import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from '../components/ErrorModal'; // Importa el componente ErrorModal

const LoginScreen = ({ navigation }) => {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleRegistration = () => {
    navigation.navigate('Register')

  }
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('La dirección de correo electrónico tiene un formato incorrecto. Por favor, verifica tu correo electrónico.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Ocurrió un error al iniciar sesión. Por favor, verifica tu contraseña');
        } else {
          setErrorMessage('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
        setErrorModalVisible(true);
      });
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <View style={styles.navbar}>

      </View>
      <View style={styles.container}>
        <View style={styles.titleContainer}>

          <Text style={styles.title}>
            Bienvenido de nuevo, ingresa tus datos para iniciar sesión.
          </Text>
        </View>


        <View style={styles.inputContainer}>
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

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('AddAdmin')}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        </View>

        <View style={styles.actions}>


          <ErrorModal
            visible={errorModalVisible}
            message={errorMessage}
            onClose={handleCloseErrorModal}
          />
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
    padding: 16,
    backgroundColor: 'black',
    gap: 20,
    fontFamily: 'Epilogue-Variable'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  actions: {
    gap: 30,
    paddingTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  inputContainer: {
    width: 300,
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginBottom: 15,

  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',

  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',

  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Epilogue-Variable',
    marginBottom: 25,


  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
export default LoginScreen;
