import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from '../database/firebaseC';


const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtén el usuario actual desde Firebase
    const currentUser = firebase.auth().currentUser;

    // Verifica si el usuario está autenticado
    if (currentUser) {
      // Obtén información adicional del usuario desde Firestore
      firebase.firestore().collection('users').doc(currentUser.uid).get()
        .then((doc) => {
          if (doc.exists) {
            // Actualiza el estado con los datos del usuario
            setUser(doc.data());
          } else {
            console.log('No se encontraron datos para el usuario actual.');
          }
        })
        .catch((error) => {
          console.error('Error al obtener datos del usuario:', error.message);
        });
    } else {
      console.log('No hay usuario autenticado.');
    }
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={styles.value}>{user.email}</Text>

          {/* Agrega más campos de datos del usuario aquí si es necesario */}
        </>
      ) : (
        <Text>No se pudo cargar la información del usuario.</Text>
      )}
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
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ProfileScreen;
