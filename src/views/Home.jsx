import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Button } from 'react-native';
import CrimeForm from '../components/Form';
import ProfileScreen from './ProfileScreen';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';

const Home = () => {


  const navigation = useNavigation();

  const handleCall = () => {
    console.log('1132369112')
  }

  const handleReport = () => {
    navigation.navigate('Form'); // Or navigate to any other screen you need
  }

  const handleProfile = () => {
    navigation.navigate('Profile')
  }

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

  const isUserAdmin = () => {
    const currentUser = firebase.auth().currentUser;
    return currentUser && currentUser.role === 'admin';
  };

  useEffect(() => {
    // Verificar el rol del usuario actual
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log('Rol del usuario:', userData.role);
        } else {
          console.log('No se encontró información para el usuario.');
        }
      });
    } else {
      console.log('No hay usuario autenticado.');
    }
  }, []);

  return (
    <View style = {styles.container}>
      
      
      <View style = {styles.btnCall}>
        <TouchableOpacity onPress={handleCall}>
          <Text style= {styles.btnCall}>Llamar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
      <TouchableOpacity onPress={handleReport}>
        <Text style={styles.btnCall}>Reportar</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.btnCall}>
      <TouchableOpacity onPress={handleReport}>
        <Text style={styles.btnCall}>Ayuda</Text>
      </TouchableOpacity>
      </View>

      {isUserAdmin() && (
        <View style={styles.btnCall}>
          <TouchableOpacity onPress={handleReport}>
            <Text style={styles.btnCall}>Reportes Historial</Text>
          </TouchableOpacity>
        </View>
      )}

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
      backgroundColor: 'black',
      paddingBottom: 16,
      paddingTop: 16,
      color: 'white',
      flex: 1,
      fontSize: 25,
      justifyContent: 'center'
  },
  btnCall:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 200,
    borderWidth: '1',
    borderColor: 'red',
    color:'black',
    fontSize: 40,
    justifyContent: 'center',
    alignSelf:'center'
  },
  callContainer:{
    width:'100%',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
})
export default Home;
