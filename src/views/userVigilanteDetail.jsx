import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDetailsScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Usuario</Text>
      <Text>Nombre: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      {/* Mostrar más detalles del usuario aquí si es necesario */}
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
});

export default UserDetailsScreen;
