import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../database/firebaseC'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {database} from '../database/firebaseC'

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('vigilante');
  const [location, setLocation] = useState('');



  const handleRegister = () => {
    // Lógica para registrar un nuevo usuario...
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Obtenemos el ID del usuario creado
        const userId = userCredential.user.uid;

  
        // Guardamos el usuario en la colección "users" de Firestore
        database.collection('users').doc(userId).set({
          name: name,
          email: email,
          role: role,
          location: location,
        });
  
        // Redirigimos al usuario a la pantalla de inicio de sesión
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error al registrar el usuario:', error.message);
      });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
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
          title="Vigilante"
          onPress={() => setRole('vigilante')}
          color={role === 'vigilante' ? '#007BFF' : '#C7C57D'}
        />
        <Button
          title="Admin"
          onPress={() => setRole('admin')}
          color={role === 'admin' ? '#007BFF' : '#C7C57D'}
        />
      </View>

      <Button title="Registrarse" onPress={handleRegister} />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default RegisterScreen;
