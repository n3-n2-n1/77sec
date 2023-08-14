import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firebase from '../database/firebaseC'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { database } from '../database/firebaseC'
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';

const AddAdmin = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [dni, setDNI] = useState('');
  const [cuil, setCuil] = useState('');





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
        role: role,
        location: location,
        uid: userId,
        dni: dni,
        cuil: cuil,
        horasTrabajadas: []
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
              fill="#FDC826"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>Agregar Admin</Text>
      </View>

      <ScrollView style={styles.container}>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />


        <Text style={styles.label}>DNI:</Text>
        <TextInput
          style={styles.input}
          value={dni}
          onChangeText={(text) => setDNI(text)}
        />

        <Text style={styles.label}>CUIL:</Text>
        <TextInput
          style={styles.input}
          value={cuil}
          onChangeText={(text) => setCuil(text)}
        />


        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Predio</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={(text) => setLocation(text)}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Text style={styles.label}>Rol:</Text>
        <View style={styles.roleButtons}>

          <Button
            title="Admin"
            onPress={() => setRole('admin')}
            color={role === 'admin' ? '#007BFF' : '#C7C57D'}
          />
        </View>

        <Button title="Registrarse" onPress={handleRegister} />



      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Epilogue-Variable',
    backgroundColor: 'black'
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
    borderColor: 'gray',
    padding: 8,
    backgroundColor: 'white'
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  },
});

export default AddAdmin;
