import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, Modal, ScrollView, View, Button } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';


const Home = () => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserDisplayName, setCurrentUserDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

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
        setIsLoading(false); // Datos cargados, cambiar estado de isLoading
      });
    } else {
      console.log('No hay usuario autenticado.');
      setIsLoading(false);
    }

    
  },
   []);

   


  const handleCall = () => {
    console.log('1132369112');
  };

  const handleReport = () => {
    navigation.navigate('Form');
  };

  const handleChat = () => {
    navigation.navigate('ChatScreen');
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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View>

          <View style={styles.navbar}>
            <Text style={styles.title}>¡Bienvenido, {currentUserDisplayName || 'Invitado'}!</Text>
            <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
              <Text style={styles.profileButton}>Perfil</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.gridContainer}>
            <GridButton size="large" onPress={handleReport} title="Reportar" icon="alert-circle" />
            <GridButton onPress={() => navigation.navigate('Alerta')} title="Alerta" icon="alert-octagon" />
          </View>
          
          <View style={styles.gridContainer}>

            <TouchableOpacity style={styles.gridButtonContainer} onPress={() => navigation.navigate('LoadPresentismo')} title="Escanear QR" icon="qrcode-scan">
              <Text style= {styles.gridButtonText}>Presentismo</Text>

            </TouchableOpacity>
             
            
            <TouchableOpacity style={styles.gridButtonContainer} onPress={() => navigation.navigate('ChatScreen')} title="Chat" icon="alert-octagon" >
            <Text style={styles.gridButtonText}>
              Chat
            </Text>
            </TouchableOpacity>
          </View>
          
          {isAdmin && (
            <View style={styles.gridContainer}>
              
              <ScrollView>
                
                

                <TouchableOpacity style={styles.gridButtonContainer} onPress={() => navigation.navigate('AdminDashboard')} icon="file-text" >
                <Text style={styles.gridButtonText}>Panel de Administrador</Text>  
                  </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('NotificationSender')}
                  title="NotificationSender"
                  icon="file-text"
                  style={styles.gridButtonContainer}
                >
                  <Text style={styles.gridButtonText}>Notificaciones</Text>
                </TouchableOpacity>
              
              </ScrollView>

            </View>
          )}
          <View style={styles.gridContainer}>
          
          </View>

        </View>
      )}

      {/* Modal para el menú desplegable */}
      <Modal visible={isMenuVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setIsMenuVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Atras</Text>
          </TouchableOpacity>
          {/* Aquí puedes agregar los botones adicionales del menú desplegable */}

          <View style={styles.modalInContainer}>


          <TouchableOpacity onPress={handleProfile} onPressOut={() => setIsMenuVisible(false)} style={styles.logoutButton2}>
            <Text style={styles.logoutButtonText2} >Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>


          </View>
        
        </View>
      </Modal>
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
  chatButton:{
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    color: 'white'
  },
  logoutButtonText2: {
    color: 'black',
    fontSize: 18,
  },
  gridButtonContainer:{
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    color:'white',
    marginBottom: 20,
    
  },
  logoutButton2: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalInContainer:{
    width: '100%',
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbar: {
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    paddingBottom: 40,
    paddingHorizontal: 10,
    gap: 30,
    
  },
  ButtonList:{
    paddingBottom: 30,
  },
  gridButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'black',    
    top: 32,
  },
  gridButtonInner:{
    marginBottom: 30,
  },
  largeButton: {
    backgroundColor: 'white',
  },
  smallButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  gridButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },  
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileButton: {
    color:'white',
    fontSize: 18,
    width: '100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 32,
    right: 20,
    zIndex: 1,
    backgroundColor:'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 18,
  },
  menuButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;