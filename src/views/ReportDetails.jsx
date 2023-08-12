import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import firebase from '../database/firebaseC'; // Import your firebase configuration
import Svg, { Path } from 'react-native-svg';


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



      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#FDC826"
            />
          </Svg>
        </TouchableOpacity>
      <Text style={styles.title}>Detalle del Informe</Text>
      </View>

      <ScrollView>

      <Text style= {styles.data}>ID: {report.id}</Text>
      <Text style= {styles.data}>Lugar: {report.dataToSend.predio}</Text>
      <Text style= {styles.data}>Vigilador: {report.dataToSend.vigilador}</Text>
      <Text style= {styles.data}>Vigilador que lo detecta: {report.dataToSend.vigiladorNovedad}</Text>
      <Text style= {styles.data}>Descripcion: {report.dataToSend.novedad1}</Text>

      </ScrollView>
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
    backgroundColor: 'black',
    paddingHorizontal: 20,
    fontFamily: 'Epilogue-Variable',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 80,
  },
  data:{
    fontFamily: 'Epilogue-Variable',
    fontWeight: 'bold',
    fontSize: '20',
    color:'white'

  },
});

export default ReportDetailScreen;
