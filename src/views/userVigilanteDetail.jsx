import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { database } from '../database/firebaseC';
import { useState } from 'react';

const UserDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });


  const handleDeleteUser = async () => {
    try {
      // Eliminar el usuario de Firebase
      await database.collection('users').doc(user.id).delete();


      // Navegar de regreso a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    // Si estás entrando en modo de edición, copia los datos actuales del usuario a editedUser
    if (!isEditing) {
      setEditedUser({ ...user });
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Actualiza los datos del usuario en Firebase Firestore
      await database.collection('users').doc(editedUser.id).update(editedUser);
      console.log('Usuario actualizado con éxito.');

      // Después de guardar los cambios con éxito, actualiza el estado para salir del modo de edición
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  // Renderizar campos de entrada solo si está en modo de edición
  const renderEditFields = () => {
    if (isEditing) {
      return (
        <>
          <TextInput
            placeholder="Nuevo nombre"
            value={editedUser.name}
            onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
            style={styles.input}
          />
          {/* Renderizar otros campos de edición aquí */}
          <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.textDetail}>Nombre: {user.name}</Text>
          {/* Renderizar otros detalles del usuario aquí */}
          <TouchableOpacity onPress={handleToggleEdit} style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Usuario</Text>
          </TouchableOpacity>
        </>
      );
    }
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
        <Text style={styles.title}>
          Detalles del Usuario
        </Text>
      </View>

      <View style={styles.container}>
        {isEditing ? (
          // Modo de edición
          <>
            <TextInput
              value={editedUser.name}
              onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
              style={styles.input}
              placeholder="Nuevo nombre"
            />
            <TextInput
              value={editedUser.email}
              onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
              style={styles.input}
              placeholder="Nuevo email"
            />
            <TextInput
              value={editedUser.cuil}
              onChangeText={(text) => setEditedUser({ ...editedUser, cuil: text })}
              style={styles.input}
              placeholder="Nuevo cuil"
            />
            <TextInput
              value={editedUser.dni}
              onChangeText={(text) => setEditedUser({ ...editedUser, dni: text })}
              style={styles.input}
              placeholder="Nuevo DNI"
            />
            <TextInput
              value={editedUser.empresa}
              onChangeText={(text) => setEditedUser({ ...editedUser, empresa: text })}
              style={styles.input}
              placeholder="Nueva empresa"
            />
            <TextInput
              value={editedUser.role}
              onChangeText={(text) => setEditedUser({ ...editedUser, role: text })}
              style={styles.input}
              placeholder="Nuevo rol"
            />
            {/* Puedes agregar más campos de edición aquí */}
          </>
        ) : (
          // Modo de visualización
          <>
            <Text style={styles.textDetail}>Nombre: {user.name}</Text>
            <Text style={styles.textDetail}>Email: {user.email}</Text>
            <Text style={styles.textDetail}>Cuil: {user.cuil}</Text>
            <Text style={styles.textDetail}>DNI: {user.dni}</Text>
            <Text style={styles.textDetail}>Empresa: {user.empresa}</Text>
            <Text style={styles.textDetail}>Rol: {user.role}</Text>
            {/* Puedes agregar más campos de visualización aquí */}
          </>
        )}

        {/* Renderiza el botón "Editar Usuario" */}

      </View>

      <TouchableOpacity onPress={handleToggleEdit} style={styles.editButton}>
        <Text style={styles.editButtonText}>
          {isEditing ? 'Guardar Cambios' : 'Editar Usuario'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteUser} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar Usuario</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#3780C3'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 15,
  },
  textDetail: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white'
  },
  editButton: {
    backgroundColor: '#F89A53',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,

  },
  textDetail: {


    fontSize: 20,
    marginBottom: 5,
    color: 'white'

  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
    paddingLeft: 10,

  }, deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
    marginBottom:40,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
