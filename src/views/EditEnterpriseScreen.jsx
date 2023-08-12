import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import firebase from '../database/firebaseC';

const EditEmpresaScreen = ({ route, navigation }) => {
  const { empresaId } = route.params;

  const [empresa, setEmpresa] = useState(null);
  const [updatedEmpresa, setUpdatedEmpresa] = useState({
    address: '',
    chief: '',
    name: '',
    objectives: [],
    tel: '',
  });

  useEffect(() => {
    // Cargar los detalles de la empresa desde Firebase
    const empresaRef = firebase.firestore().collection('empresas').doc(empresaId);
    empresaRef.get().then((doc) => {
      if (doc.exists) {
        const empresaData = doc.data();
        setEmpresa(empresaData);
        setUpdatedEmpresa(empresaData); // Inicializar los campos actualizados con los valores actuales
        console.log('Empresa cargada:', empresaData);
      }
    });
  }, [empresaId]);

  const handleUpdateEmpresa = () => {
    // Actualizar la información de la empresa en Firebase
    const empresaRef = firebase.firestore().collection('empresas').doc(empresaId);
    empresaRef.update(updatedEmpresa).then(() => {
      console.log('Empresa actualizada');
      navigation.goBack(); // Regresar a la pantalla anterior
    });
  };

  if (!empresa) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Empresa</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={updatedEmpresa.name}
        onChangeText={(text) => setUpdatedEmpresa({ ...updatedEmpresa, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={updatedEmpresa.address}
        onChangeText={(text) => setUpdatedEmpresa({ ...updatedEmpresa, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Jefe"
        value={updatedEmpresa.chief}
        onChangeText={(text) => setUpdatedEmpresa({ ...updatedEmpresa, chief: text })}
      />
      {/* Otros campos similares */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateEmpresa}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Epilogue-Variable',
    backgroundColor: 'black'
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
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
    paddingTop: 20,
  },
  
});

export default EditEmpresaScreen;
