import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../database/firebaseC';
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';



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
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#FDC826"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>
          Detalles
        </Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuario..."
        placeholderTextColor={'gray'}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <View style={styles.section}>
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user.name}
            style={styles.card}
            onPress={() => {
              alert('Usuario creado')
              navigation.navigate('Home', { user }); // Navegar a la pantalla UserDetailsScreen
            }}
          >
            <Text style={styles.cardText}>{user.name}</Text>
            <Text style={styles.cardText}>{user.dni}</Text>
            <Text style={styles.cardText}>{user.email}</Text>
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
    padding: 15,
    backgroundColor: '#3780C3'
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 25,
    fontFamily: 'Epilogue-Variable',
    backgroundColor: 'white'

  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  card: {
    marginBottom: 8,
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderColor: 'white',
    padding: 8,
    borderRadius: 15,
  },
  cardText: {
    paddingLeft: 5,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Epilogue-Variable',

  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 14,
    fontFamily: 'Epilogue-Variable',

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
});

export default UserVigilantesView;