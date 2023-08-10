import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../database/firebaseC';


const UserVigilantesView = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation(); // Agregar esta línea

  useEffect(() => {
    // Cargar la lista de usuarios desde Firebase
    const usersRef = firebase.firestore().collection('users');
    usersRef.get().then((querySnapshot) => {
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userList);
    });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lista de Usuarios</Text>
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.card}
            onPress={() => {
              navigation.navigate('UserDetails', { user }); // Navegar a la pantalla UserDetailsScreen
            }}
          >
            <Text style={styles.cardText}>{user.name}</Text>
            <Text style={styles.cardText}>Email: {user.email}</Text>
            {/* Mostrar más detalles del usuario si es necesario */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
  },
});

export default UserVigilantesView;