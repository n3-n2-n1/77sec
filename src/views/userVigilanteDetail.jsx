import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const UserDetailsScreen = ({ route }) => {

  const navigation = useNavigation();
  const { user } = route.params;

  
  const handleDeleteUser = async () => {
    try {
      // Eliminar el usuario de Firebase
      await database.collection('users').doc(user.id).delete();

      // Mostrar una alerta de éxito
      Alert.alert('Usuario Eliminado', 'El usuario ha sido eliminado exitosamente.');

      // Navegar de regreso a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      // Mostrar una alerta de error si la eliminación falla
      Alert.alert('Error', 'Hubo un error al intentar eliminar el usuario.');
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

      <Text style= {styles.textDetail}>Nombre: {user.name}</Text>
      <Text style= {styles.textDetail}>Email: {user.email}</Text>
      <Text style= {styles.textDetail}>Cuil: {user.cuil}</Text>
      <Text style= {styles.textDetail}>DNI: {user.dni}</Text>
      <Text style= {styles.textDetail}>Empresa: {user.empresa}</Text>
      <Text style= {styles.textDetail}>Rol: {user.role}</Text>

      </View>

      <TouchableOpacity onPress={handleDeleteUser} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar Usuario</Text>
      </TouchableOpacity>
      {/* Mostrar más detalles del usuario aquí si es necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#3780C3'
  },
  textDetail:{

    
    fontSize: 20,
    marginBottom: 5,
    color:'white'

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
    
  },deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
