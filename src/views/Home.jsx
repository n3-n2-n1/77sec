import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Button } from 'react-native';
import CrimeForm from '../components/Form';
import ProfileScreen from './ProfileScreen';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import AddCompanyScreen from './addCompanyScreen';

const Home = () => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar el rol del usuario actual
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log('Rol del usuario:', userData.role);
          setIsAdmin(userData.role === 'admin');
        } else {
          console.log('No se encontró información para el usuario.');
        }
      });
    } else {
      console.log('No hay usuario autenticado.');
    }
  }, []);

  const handleCall = () => {
    console.log('1132369112');
  };

  const handleReport = () => {
    navigation.navigate('Form');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    firebase.auth().signOut()
      .then(() => {
        console.log('Cierre de sesión exitoso.');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error.message);
      });
  };

  return (
    <View style={styles.container}>


      <View style={styles.btnCall}>
        <TouchableOpacity onPress={handleCall}>
          <Text style={styles.btnCall}>Llamar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
        <TouchableOpacity onPress={handleReport}>
          <Text style={styles.btnCall}>Reportar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
        <TouchableOpacity onPress={() => navigation.navigate('addCompany')}>
          <Text style={styles.btnCall}>Añadir Empresa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
        <TouchableOpacity onPress={() => navigation.navigate('Vigilantes')}>
          <Text style={styles.btnCall}>Añadir Vigilante</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
        <TouchableOpacity onPress={() => navigation.navigate('Vigilantes')}>
          <Text style={styles.btnCall}>Enviar Notif</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.btnCall}>
      <TouchableOpacity onPress={() => navigation.navigate('qr')}>
        <Text style={styles.btnCall}>Escanear QR</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
      <TouchableOpacity onPress={() => navigation.navigate('Alerta')}>
        <Text style={styles.btnCall}>ALERTA</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
      <TouchableOpacity onPress={() => navigation.navigate('calendar')}>
        <Text style={styles.btnCall}>Ver Calendario</Text>
      </TouchableOpacity>
      </View>


      
        <View style={styles.btnCall}>
          <TouchableOpacity onPress={() => navigation.navigate('reportHistory')}>
            <Text style={styles.btnCall}>Reportes Historial</Text>
          </TouchableOpacity>
        </View>
    
      <View style={styles.btnCall}>
        <TouchableOpacity onPress={handleProfile}>
          <Text style={styles.btnCall}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <Button title="Cerrar Sesión" onPress={handleLogout} />


    </View>





  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  btnCall: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default Home;
