import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const ReportsScreen = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Comprueba si el usuario actual es admin
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.firestore().collection('users').doc(currentUser.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData.role === 'admin') {
              // Si el usuario es admin, recupera los reportes de Firestore
              firebase.firestore().collection('forms').get()
                .then((querySnapshot) => {
                  const reportsData = [];
                  querySnapshot.forEach((doc) => {
                    reportsData.push({ id: doc.id, ...doc.data() });
                  });
                  setReports(reportsData);
                })
                .catch((error) => {
                  console.error('Error al obtener los reportes:', error.message);
                });
            }
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
      {reports.length > 0 ? (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reportItem}>
              <Text style={styles.reportText}>Reporte ID: {item.id}</Text>
              <Text style={styles.reportText}>Fecha: {item.date}</Text>
              {/* Agrega aquí los demás campos que deseas mostrar */}
            </View>
          )}
        />
      ) : (
        <Text>No hay reportes disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  reportItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  reportText: {
    fontSize: 16,
  },
});

export default ReportsScreen;
