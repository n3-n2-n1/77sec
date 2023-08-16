import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlightBase } from 'react-native';
import firebase from '../database/firebaseC'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { database } from '../database/firebaseC'
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';

const RegisterScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [dni, setDNI] = useState('');
  const [cuil, setCuil] = useState('');
  const [direction, setDirection] = useState('');





  const handleRegister = async () => {
    try {
      // Lógica para registrar un nuevo usuario...
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Obtenemos el ID del usuario creado
      const userId = userCredential.user.uid;

      // Obtener el token de registro

      // Guardamos el usuario en la colección "users" de Firestore junto con el token de registro
      await database.collection('users').doc(userId).set({
        name: name,
        email: email,
        role: 'vigilante',
        empresa: location,
        uid: userId,
        dni: dni,
        cuil: cuil,
        direccion: direction
      });

      // Crear la subcolección "horasTrabajadas" dentro del documento del usuario
      await database.collection('users').doc(userId).collection('horasTrabajadas').add({
        // Puedes agregar campos relevantes para la subcolección aquí
      });

      // Redirigimos al usuario a la pantalla de inicio de sesión
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#ffffff"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>Agregar Vigilante</Text>
      </View>

      <ScrollView style={styles.container}>

        <Text style={styles.text}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholderTextColor='gray'
          placeholder='Nombre'
          onChangeText={(text) => setName(text)}
        />


        <Text style={styles.text}>DNI:</Text>
        <TextInput
          style={styles.input}
          value={dni}
          placeholderTextColor='gray'
          placeholder='DNI del vigilante'
          onChangeText={(text) => setDNI(text)}
        />


        <Text style={styles.text}>CUIL:</Text>
        <TextInput
          style={styles.input}
          value={cuil}
          placeholderTextColor='gray'
          placeholder='CUIT del vigilante'
          onChangeText={(text) => setCuil(text)}
        />

        <Text style={styles.text}>Direccion:</Text>
        <TextInput
          style={styles.input}
          value={direction}
          placeholderTextColor='gray'
          placeholder='Dirección del vigilante'
          onChangeText={(text) => setDirection(text)}
        />



        <Text style={styles.text}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholderTextColor='gray'
          placeholder='Email del vigilante'
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.text}>Empresa:</Text>
        <TextInput
          style={styles.input}
          value={location}
          placeholderTextColor='gray'
          placeholder='Empresa'
          onChangeText={(text) => setLocation(text)}
        />

        <Text style={styles.text}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          placeholderTextColor='gray'
          placeholder='Contraseña'
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity title="Registrarse" onPress={handleRegister} style={styles.button}>
          <Text style={styles.text}>Registrar</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#3780C3',
    fontFamily: 'Epilogue-Variable',
  },
  button: {
    backgroundColor: '#F89A53',
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: '#D6803F',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
    color: 'white',
    fontWeight: 'bold',
    padding: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Epilogue-Variable',
    borderRadius: 25

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 5,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',

  },
});

export default RegisterScreen;
