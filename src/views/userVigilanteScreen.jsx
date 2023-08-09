import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../database/firebaseC';

const UserVigilantesView = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
          <View key={user.id} style={styles.card}>
            <Text style={styles.cardText}>{user.name}</Text>
            <Text style={styles.cardText}>Email: {user.email}</Text>
            {/* Mostrar más detalles del usuario si es necesario */}
          </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  searchInput: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default UserVigilantesView;
