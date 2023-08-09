import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const AddCompanyScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [chief, setChief] = useState('');
  const [objectives, setObjectives] = useState([]); // Cambio: usar una lista para los objetivos

  const handleAddObjective = () => {
    setObjectives([...objectives, '']); // Agregar un elemento vacío a la lista de objetivos
  };

  const handleRemoveObjective = (index) => {
    const updatedObjectives = [...objectives];
    updatedObjectives.splice(index, 1);
    setObjectives(updatedObjectives);
  };

  const handleAddCompany = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user && user.uid) {
        const companyData = {
          name,
          address,
          tel,
          chief,
          objectives,
          // ... otras propiedades de la empresa
        };

        await firebase.firestore().collection('empresas').add(companyData);

        // Limpiar los campos después de agregar la empresa
        setName('');
        setAddress('');
        setTel('');
        setChief('');
        setObjectives([]);
        // ... limpiar otras propiedades

        console.log('Empresa agregada exitosamente.');
      }
    } catch (error) {
      console.error('Error al agregar la empresa:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre de la empresa:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre"
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Ingrese la dirección"
      />

      <Text style={styles.label}>Celular:</Text>
      <TextInput
        style={styles.input}
        value={tel}
        onChangeText={setTel}
        placeholder="Ingrese el numero"
      />

      <Text style={styles.label}>Nombre Encargado:</Text>
      <TextInput
        style={styles.input}
        value={chief}
        onChangeText={setChief}
        placeholder="Ingrese el nombre del encargado"
      />

      <Text style={styles.label}>Objetivos (predios que la empresa cuida):</Text>
      <ScrollView horizontal>
        {objectives.map((objective, index) => (
          <View key={index} style={styles.objectiveContainer}>
            <TextInput
              style={[styles.input, styles.objectiveInput]}
              value={objective}
              onChangeText={(text) => {
                const updatedObjectives = [...objectives];
                updatedObjectives[index] = text;
                setObjectives(updatedObjectives);
              }}
              placeholder="Ingrese un objetivo"
            />
            <Button title="Eliminar" onPress={() => handleRemoveObjective(index)} />
          </View>
        ))}
      </ScrollView>
      <Button title="Agregar Objetivo" onPress={handleAddObjective} />

      <Button title="Agregar Empresa" onPress={handleAddCompany} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default AddCompanyScreen;
