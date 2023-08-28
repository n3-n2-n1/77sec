import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, View, Button, Alert } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import AdminHome from './AdminHome';
import UserHome from './UserHome';
import AdminHomeWeb from '../web/AdminHomeWeb';
import { Platform } from 'react-native' 



const Home = () => {

  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserDisplayName, setCurrentUserDisplayName] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [loading, setLoading] = useState(true);

  const closeMenu = () => {
    setIsMenuVisible(false);
  };



  if (Platform.OS === 'ios') {
    // Renderizar componente web


    useEffect(() => {


      // Verificar el rol del usuario actual
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // Guardar el nombre del usuario actual
        const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {

            const userData = doc.data();
            console.log('Rol del usuario:', userData.role);
            console.log('Nombre', userData.name);
            setCurrentUserDisplayName(userData.name);
            setIsAdmin(userData.role === 'admin');
          } else {
            console.log('No se encontró información para el usuario.');

          }
          setLoading(false); // Datos cargados, cambiar estado de isLoading

        });
      } else {
        console.log('No hay usuario autenticado.');
        setLoading(false);
      }


    },
      []);
    if (loading) {
      return <LoadingScreen />; // Muestra el loader mientras carga
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


    return (


      <View style={{ backgroundColor: '#318ADB' }}>

        {isAdmin ? (
          <AdminHome />
        ) : (
          <UserHome />
        )}

      </View>


    )
  } else {


    // ACA RENDERIZO WEB 
    useEffect(() => {


      // Verificar el rol del usuario actual
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // Guardar el nombre del usuario actual
        const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {

            const userData = doc.data();
            console.log('Rol del usuario:', userData.role);
            console.log('Nombre', userData.name);
            setCurrentUserDisplayName(userData.name);
            setIsAdmin(userData.role === 'admin');
          } else {
            console.log('No se encontró información para el usuario.');

          }
          setLoading(false); // Datos cargados, cambiar estado de isLoading

        });
      } else {
        console.log('No hay usuario autenticado.');
        setLoading(false);
      }


    },
      []);
    if (loading) {
      return <LoadingScreen />; // Muestra el loader mientras carga
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


    return (


      <View style={{ backgroundColor: '#318ADB' }}>

        {isAdmin ? (
          <AdminHomeWeb />
        ) : (
          <UserHome />
        )}

      </View>


    )

  }
}


const styles = StyleSheet.create({

  alerta: {
    borderRadius: 10,
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center', // Alinea los elementos de manera equitativa
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#C22626'

  },
  topBar: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#318ADB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOpacity: 0.9,
    elevation: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#318ADB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOffset: '30',
    shadowOpacity: 0.9,
    elevation: 1
  },
  secondaryText: {
    fontFamily: 'Epilogue-Variable',
    color: 'white',
    fontSize: 15
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonCircle: {
    alignItems: 'center',
    width: 50,
    aspectRatio: 1,
    marginBottom: 5,
    borderRadius: 99999,
    justifyContent: 'center',
    borderColor: 'black',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatButton: {
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
    color: 'black',
  },
  logoutButtonText2: {
    color: 'black',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
  },

  gridButtonContainer: {
    borderRadius: 10,
    padding: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'space-around',
    flex: 1,
    shadowColor: '#F89A53', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento en la sombra (horizontal, vertical)
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 20, // Radio de la sombra
    elevation: 2,
  },
  gridButtonContainerButton: {
    borderRadius: 10,
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center', // Alinea los elementos de manera equitativa
    flex: 1,
    alignContent: 'center',
  },
  gridButtonContainerButtonC: {
    borderRadius: 10,
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#F89A53',
    marginBottom: 20,
    justifyContent: 'center', // Alinea los elementos de manera equitativa
    flex: 1,
    alignContent: 'center',
  },
  gridButtonContainerButtonR: {
    borderRadius: 10,
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center', // Alinea los elementos de manera equitativa
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#CBA41C'
  },
  gridButtonContainerAlert: {

    borderRadius: 10,
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'red',
    marginBottom: 20,
    justifyContent: 'center', // Alinea los elementos de manera equitativa
    flex: 1,
    alignContent: 'center',

  },

  gridButtonContainerButtonV: {
    borderRadius: 5,
    height: 80,
    width: 'auto',
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'space-around', // Alinea los elementos de manera equitativa
    flex: 1,
  },
  gridButtonContainerButtonA: {
    borderRadius: 5,
    height: 80,
    width: 'auto',
    backgroundColor: 'red',
    marginBottom: 20,
    justifyContent: 'space-around', // Alinea los elementos de manera equitativa
    flex: 1,
  },
  gridButtonContainer2: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between', // Alinea los elementos de manera equitativa
    flexDirection: 'row'
  },
  logoutButton2: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    paddingRight: 15,
    marginBottom: 20,
    fontFamily: 'Epilogue-Variable',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 26,
  },
  ButtonList: {
    paddingBottom: 30,
  },
  gridButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    top: 32,
  },
  gridButtonInner: {
    marginBottom: 30,
  },
  largeButton: {
    backgroundColor: 'black',
  },
  smallButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  gridButtonText: {
    paddingTop: 10,
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable',
    paddingBottom: 10
  },
  gridButtonTextA: {
    paddingTop: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable',
    paddingBottom: 10
  },
  gridButtonTextR: {
    paddingTop: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable',
    paddingBottom: 10

  },
  gridButtonText2: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable',
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutButtonText: {

    color: 'white',
    fontSize: 18,
    fontFamily: 'Epilogue-Variable',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,

  },
  profileButton: {
    flex: 1,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 15,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#F89A53',
    padding: 10,
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 15
  },
  closeButtonText: {
    color: 'black',
    fontSize: 18,
    borderRadius: 25,
  },
  menuButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 25,
    paddingTop: 20
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
  },
});

export default Home;