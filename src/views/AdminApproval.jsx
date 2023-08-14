import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/firestore';
import Svg, { Path } from 'react-native-svg';

const AdminApprovalScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snapshot = await firebase.firestore().collection('registrationRequests').get();
        const requestList = snapshot.docs.map((doc) => doc.data());
        setRequests(requestList);

        
      } catch (error) {
        console.error('Error al cargar las solicitudes de registro:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (request) => {
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(request.email, 'tempPassword');

      // Obtener el ID del usuario creado
      const userId = userCredential.user.uid;

      // Guardar el usuario en la colección "users" de Firestore
      await database.collection('users').doc(userId).set({
        name: request.name,
        email: request.email,
        role: request.role,
        location: request.location,
        dni: request.dni,
        uid: userId,
      });

      // Eliminar la solicitud aprobada de la colección "registrationRequests"
      await firebase.firestore().collection('registrationRequests').doc(request.uid).delete();
      const updatedRequests = requests.filter((req) => req.uid !== request.uid);
      setRequests(updatedRequests);
      console.log('Requests after approve:', updatedRequests);
      // Mostrar mensaje de éxito o redirigir a otra pantalla
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
    }
  };

  const handleReject = async (request) => {
    try {
      await firebase.firestore().collection('registrationRequests').doc(request.uid).delete();
      const updatedRequests = requests.filter((req) => req.uid !== request.uid);
      setRequests(updatedRequests);
      console.log('Requests after reject:', updatedRequests);
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
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
                <Text style={styles.title}>
                    Solicitudes
                </Text>
            </View>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.requestContainer}>
            <Text style={styles.requestText}>Nombre: {item.name}</Text>
            <Text style={styles.requestText}>Correo electrónico: {item.email}</Text>
            <Text style={styles.requestText}>Rol: {item.role}</Text>
            <Text style={styles.requestText}>Predio: {item.location}</Text>
            <Text style={styles.requestText}>DNI: {item.dni}</Text>
            <Button title="Aprobar" onPress={() => handleApprove(item)} />
            <Button title="Rechazar" onPress={() => handleReject(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
    fontFamily: 'Epilogue-Variable',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    fontFamily: 'Epilogue-Variable',

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  
});

export default AdminApprovalScreen;
