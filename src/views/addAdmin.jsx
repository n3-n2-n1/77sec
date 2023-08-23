import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import firebase from '../database/firebaseC'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { database } from '../database/firebaseC'
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';

const AddAdmin = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [dni, setDNI] = useState('');
  const [cuil, setCuil] = useState('');





  const handleRegister = async () => {
    try {
      // Lógica para registrar un nuevo usuario...
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Obtenemos el ID del usuario creado
      const userId = userCredential.user.uid;

      // Obtener el token de registro

      // Guardamos el usuario en la colección "users" de Firestore junto con el token de registro
      await database.collection('users').doc(userId).set({
        name: name,
        email: email,
        role: 'admin',
        location: location,
        uid: userId,
        dni: dni,
        cuil: cuil,
        horasTrabajadas: []
      });

      // Redirigimos al usuario a la pantalla de inicio de sesión
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
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
        <Text style={styles.title}>Agregar Admin</Text>
      </View>

      <ScrollView style={styles.container}>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />


        <Text style={styles.label}>DNI:</Text>
        <TextInput
          style={styles.input}
          value={dni}
          onChangeText={(text) => setDNI(text)}
        />

        <Text style={styles.label}>CUIL:</Text>
        <TextInput
          style={styles.input}
          value={cuil}
          onChangeText={(text) => setCuil(text)}
        />


        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Predio</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={(text) => setLocation(text)}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        
        <View style={styles.roleButtons}>

        <TouchableOpacity style= {styles.button} title="Registrarse" onPress={handleRegister} >
          <Text style= {styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>




      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#3780C3',
    fontFamily: 'Epilogue-Variable',
  },
  objectiveContainer: {
    padding: 15,
  },
  button: {
    backgroundColor: '#F89A53',
    padding: 10,
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Epilogue-Variable',
    color: 'white'

  },
  input: {
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'white',
    backgroundColor: 'white',
    
    borderWidth: 2,
  },

  action2:{
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    justifyContent:'center',
    alignItems:'center'
  },
  input2: {
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'gray',
    borderWidth: 2,
    color: 'black',
  },
  action: {
    backgroundColor: '#F89A53',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    fontFamily: 'Epilogue-Variable',
    borderColor: 'white',
    borderWidth: 2,
    color: 'black',
    justifyContent:'center',
    alignItems:'center'
  },
  actionText2: {
    color: 'white', // Color del texto del título
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',

  },
  actionText: {
    color: 'black', // Color del texto del título
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 5,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',
  },
});

export default AddAdmin;
