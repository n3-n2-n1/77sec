import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Button} from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <View style={styles.gridContainer}>
        <GridButton onPress={handleReport} title="Reportar" icon="alert-circle" />
        <GridButton onPress={handleCall} title="Llamar" icon="phone" />
      </View>
      <View style={styles.gridContainer}>
        <GridButton onPress={() => navigation.navigate('qr')} title="Escanear QR" icon="qrcode-scan" />
        <GridButton onPress={() => navigation.navigate('Alerta')} title="Alerta" icon="alert-octagon" />
      </View>
      {isAdmin && (
        <View style={styles.gridContainer}>
          <ScrollView style={styles.Container}>

          <GridButton onPress={() => navigation.navigate('calendar')} title="Ver Calendario" icon="calendar" />
          <GridButton onPress={() => navigation.navigate('qrGen')} title="Ver QR" icon="qrcode" />
          <GridButton onPress={() => navigation.navigate('AdminDashboard')} title="Admin Panel" icon="file-text" />
          <GridButton onPress={() => navigation.navigate('NotificationSender')} title="NotificationSender" icon="file-text" />
          
          </ScrollView>
        </View>
      )}
      <View style={styles.gridContainer}>
        <GridButton onPress={handleProfile} title="Perfil" icon="user" />
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const GridButton = ({ onPress, title, icon }) => (
  <TouchableOpacity onPress={onPress} style={styles.gridButton}>
    <Text style={styles.gridButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  Container:{
    width: '100%',
    gap: '30',
    paddingTop: 24,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 30,
  },
  gridButton: {
    width: '48%',
    gap: 30,
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    paddingTop: 20,
  },
  gridButtonIcon: {
    marginBottom: 12,
  },
  gridButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF4545',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
});


export default Home;
