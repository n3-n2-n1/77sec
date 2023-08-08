import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const AddCompanyScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  // ... otras propiedades de la empresa

  const handleAddCompany = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user && user.uid) {
        const companyData = {
          name,
          address,
          // ... otras propiedades
        };

        await firebase.firestore().collection('companies').add(companyData);

        // Limpiar los campos después de agregar la empresa
        setName('');
        setAddress('');
        // ... limpiar otras propiedades

        console.log('Empresa agregada exitosamente.');
      }
    } catch (error) {
      console.error('Error al agregar la empresa:', error);
    }
  };

  return (
    <View>
      <Text>Nombre de la empresa:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre"
      />

      <Text>Dirección:</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Ingrese la dirección"
      />

      {/* Otros campos de la empresa */}
      
      <Button title="Agregar Empresa" onPress={handleAddCompany} />
    </View>
  );
};

export default AddCompanyScreen;
