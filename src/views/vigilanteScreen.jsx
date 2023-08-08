import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth';

const VigilantesScreen = ({ navigation }) => {
  const [vigilantes, setVigilantes] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Obtener la lista de vigilantes de Firestore
    const unsubscribe = firebase.firestore().collection('vigilantes')
      .onSnapshot((querySnapshot) => {
        const vigilantesData = [];
        querySnapshot.forEach((doc) => {
          vigilantesData.push({ id: doc.id, ...doc.data() });
        });
        setVigilantes(vigilantesData);
      });

    return () => unsubscribe();
  }, []);

  const handleAddVigilante = () => {
    // Agregar un nuevo vigilante a Firestore
    firebase.firestore().collection('vigilantes').add({
      name: name,
      location: location,
    });
    setName('');
    setLocation('');
  };

  const handleDeleteVigilante = (id) => {
    // Eliminar un vigilante de Firestore
    firebase.firestore().collection('vigilantes').doc(id).delete();
  };

  return (
    <View>
      <Text>Nombre:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
      />

      <Text>Predio:</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Agregar Vigilante" onPress={handleAddVigilante} />

      <FlatList
        data={vigilantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.location}</Text>
            <Button
              title="Editar"
              onPress={() => {
                // Navegar a la pantalla de edición del vigilante con el ID
                navigation.navigate('EditVigilante', { vigilanteId: item.id });
              }}
            />
            <Button
              title="Eliminar"
              onPress={() => handleDeleteVigilante(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default VigilantesScreen;
