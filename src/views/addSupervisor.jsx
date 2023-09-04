import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firebase from '../database/firebaseC'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { database } from '../database/firebaseC'
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';

const AddSupervisor = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [dni, setDNI] = useState('');
  const [cuil, setCuil] = useState('');





  const handleRegisterSupervisor = async () => {
    try {
      // Guardamos el usuario en la colección "users" de Firestore junto con el token de registro
      const userRef = await database.collection('users').add({
        name: name,
        email: email,
        role: 'supervisor',
        location: location,
        dni: dni,
        cuil: cuil,
        horasTrabajadas: []
      });

      const userId = userRef.id; // Obtener el ID del usuario recién agregado

      console.log('Usuario agregado a Firestore con ID:', userId);
      await userRef.update({ uid: userId });
      // Obtener el token de registro

      setEmail('');
      setPassword('');
      setName('');
      setRole('');
      setLocation('');
      setDNI('');
      setCuil('');

      alert('Usuario creado exitosamente')

      // Redirigimos al usuario a la pantalla de inicio de sesión
      navigation.navigate('Home');
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
        <Text style={styles.title}>Agregar Supervisor</Text>
      </View>

      <ScrollView style={styles.container}>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor='gray'
          placeholder='Ingrese su nombre'
        />


        <Text style={styles.label}>DNI:</Text>
        <TextInput
          style={styles.input}
          value={dni}
          onChangeText={(text) => setDNI(text)}
          placeholderTextColor='gray'
          placeholder='Ingrese DNI del supervisor'

        />

        <Text style={styles.label}>CUIL:</Text>
        <TextInput
          style={styles.input}
          value={cuil}
          onChangeText={(text) => setCuil(text)}
          placeholderTextColor='gray'
          placeholder='Ingrese CUIL del supervisor'

        />


        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor='gray'
          placeholder='Ingrese email del supervisor'

        />

        <Text style={styles.label}>Predio</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholderTextColor='gray'
          placeholder='Ingrese predio a cargo del supervisor'

        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          placeholder='Ingrese contraseña del supervisor'
          placeholderTextColor='gray'
          onChangeText={(text) => setPassword(text)}
        />


        <TouchableOpacity title="Registrarse" onPress={handleRegisterSupervisor} style={styles.action}>
          <Text style={styles.actionText2}>Registrar</Text>
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
  objectiveContainer: {
    padding: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Epilogue-Variable',
    color: 'white'

  },
  input: {
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'white',
    backgroundColor: 'white',
    
    borderWidth: 2,
  },

  action2:{
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    justifyContent:'center',
    alignItems:'center'
  },
  input2: {
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'gray',
    borderWidth: 2,
    color: 'black',
  },
  action: {
    backgroundColor: '#F89A53',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'white',
    borderWidth: 2,
    color: 'black',
    justifyContent:'center',
    alignItems:'center'
  },
  actionText2: {
    color: 'white', // Color del texto del título
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',

  },
  actionText: {
    color: 'black', // Color del texto del título
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

  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',

  },
});

export default AddSupervisor;
