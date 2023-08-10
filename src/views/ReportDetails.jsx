import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from '../database/firebaseC'; // Import your firebase configuration

const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;
  const navigation = useNavigation(); // Mover useNavigation aquí

  const handleDeleteReport = () => {
    // Lógica para eliminar el reporte desde Firebase
    const reportRef = firebase.firestore().collection('form').doc(report.id);

    reportRef
      .delete()
      .then(() => {
        console.log('Reporte eliminado exitosamente.');
        alert('Reporte eliminado', 'El reporte se eliminó correctamente.', [
          {
            text: 'Aceptar',
            onPress: () => {
              // Navegar de regreso a la página de reportHistory
              navigation.goBack(); // Usar navigation aquí
            },
          },
        ]);
      }).catch((error) => {
        console.error('Error al eliminar el reporte:', error);
        // Manejar el error si es necesario
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Informe</Text>
      <Text>ID: {report.id}</Text>
      <Text>Descripción: {report.dataToSend.predio}</Text>
      <Text>Vigilador: {report.dataToSend.vigilador}</Text>
      <Text>Novedad: {report.dataToSend.tipoNovedad}</Text>
      {/* Agregar más detalles según sea necesario */}

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteReport}>
        <Text style={styles.buttonText}>Eliminar Reporte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReportDetailScreen;
