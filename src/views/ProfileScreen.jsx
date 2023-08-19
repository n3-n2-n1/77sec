import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from '../database/firebaseC';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  const navigation = useNavigation()

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

  
  const handleLogout = () => {
    // Lógica para cerrar sesión
    firebase.auth().signOut()
      .then(() => {
        console.log('Cierre de sesión exitoso.');
        alert('Cierre de sesion exitoso.')
        navigation.navigate('Login')
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="white"
            />
          </Svg>
        </TouchableOpacity>

        <Text style={styles.title}>
          Perfil
        </Text>

      </View>
      {user ? (
        <>
        <View style={{padding: 15, color: 'white'}}>

          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>

        
        </View>

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
    backgroundColor: '#3780C3',
  },

  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',

  },
  logoutButton2: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Epilogue-Variable',
    color: 'white'

  },
  value: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Epilogue-Variable',
    color: 'white'

  },
});

export default ProfileScreen;
