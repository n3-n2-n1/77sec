import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth';

const VigilantesScreen = ({ navigation }) => {
  const [vigilantes, setVigilantes] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dni, setDNI] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // New state for password input
  const [role, setRol] = useState(''); // New state for password input

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

  const addVigilanteToFirestore = async () => {
    const docRef = await firebase.firestore().collection('vigilantes').add({
      name: name,
      location: location,
      dni: dni,
      email: email,
      role: role
    });
    return docRef.id;
  };

  const createFirebaseUser = async (newEmail, newPassword) => {
    await firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword);
  };

  const handleAddVigilante = async () => {
    try {
      const newVigilanteId = await addVigilanteToFirestore();
      await createFirebaseUser(email, password); // Use the entered password

      // Save the vigilante information in the /users collection
      await firebase.firestore().collection('users').doc(newVigilanteId).set({
        name: name,
        location: location,
        dni: dni,
        email: email,
        role: role,
        uid: currentUser.uid,
      });

      setName('');
      setLocation('');
      setDNI('');
      setEmail('');
      setPassword(''); // Reset the password input
      setRol(''); // Reset the password input
    } catch (error) {
      console.error('Error al registrar el vigilante:', error);
    }
  }

  const handleDeleteVigilante = (id) => {
    try {
      // Eliminar el vigilante de la colección 'vigilantes'
      firebase.firestore().collection('vigilantes').doc(id).delete();
  
      // Eliminar la información del usuario de la colección 'users'
      firebase.firestore().collection('users').doc(id).delete();
  
      console.log('Vigilante eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el vigilante:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Vigilantes</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Rol:</Text>
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRol}
      />

      <Text style={styles.label}>Predio:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>DNI:</Text>
      <TextInput
        style={styles.input}
        value={dni}
        onChangeText={setDNI}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddVigilante}>
        <Text style={styles.buttonText}>Agregar Vigilante</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.vigilantesList}
        data={vigilantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vigilanteItem}>
            <Text style={styles.vigilanteName}>{item.name}</Text>
            <Text style={styles.vigilanteLocation}>{item.location}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                // Navegar a la pantalla de edición del vigilante con el ID
                navigation.navigate('EditVigilante', { vigilanteId: item.id });
              }}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteVigilante(item.id)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  vigilantesList: {
    marginTop: 20,
  },
  vigilanteItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vigilanteName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vigilanteLocation: {
    fontSize: 16,
    color: '#555',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
});

export default VigilantesScreen;
