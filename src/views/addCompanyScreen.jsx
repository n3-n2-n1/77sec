import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';


const AddCompanyScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [chief, setChief] = useState('');
  const [objectives, setObjectives] = useState([]); // Cambio: usar una lista para los objetivos
  const [chiefDNI, setchiefDNI] = useState([]); // Cambio: usar una lista para los objetivos

  const navigation = useNavigation();

  const handleAddObjective = () => {
    setObjectives([...objectives, '']); // Agregar un elemento vacío a la lista de objetivos
  };

  const handleRemoveObjective = (index) => {
    const updatedObjectives = [...objectives];
    updatedObjectives.splice(index, 1);
    setObjectives(updatedObjectives);
  };

  const handleAddCompany = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user && user.uid) {
        const companyData = {
          name,
          address,
          tel,
          chief,
          objectives,
          chiefDNI,
          // ... otras propiedades de la empresa
        };

        await firebase.firestore().collection('empresas').add(companyData);

        // Limpiar los campos después de agregar la empresa
        setName('');
        setAddress('');
        setTel('');
        setChief('');
        setObjectives([]);
        setchiefDNI([]);
        // ... limpiar otras propiedades

        alert('Empresa agregada exitosamente')
        navigation.navigate('AdminDashboard');
        console.log('Empresa agregada exitosamente.');
      }
    } catch (error) {
      console.error('Error al agregar la empresa:', error);
    }
  };

  return (


    <ScrollView contentContainerStyle={styles.container}>

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
          Agregar Empresa
        </Text>
      </View>

      <View style={styles.container}>

        <Text style={styles.label}>Nombre de la empresa:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ingrese el nombre"
        />

        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Ingrese la dirección"
        />

        <Text style={styles.label}>Celular:</Text>
        <TextInput
          style={styles.input}
          value={tel}
          onChangeText={setTel}
          placeholder="Ingrese el numero"
        />

        <Text style={styles.label}>Nombre Encargado:</Text>
        <TextInput
          style={styles.input}
          value={chief}
          onChangeText={setChief}
          placeholder="Ingrese el nombre del encargado"
        />

        <Text style={styles.label}>DNI Encargado:</Text>
        <TextInput
          style={styles.input}
          value={chiefDNI}
          onChangeText={setchiefDNI}
          placeholder="Ingrese el DNI del encargado"
        />

        <Text style={styles.label}>Objetivos (predios que la empresa cuida):</Text>
        <TouchableOpacity style={styles.action} onPress={handleAddObjective}>
          <Text style={styles.actionText2}>Agregar Objetivo</Text>
        </TouchableOpacity>
        <ScrollView vertical  >
          {objectives.map((objective, index) => (
            <View key={index} style={[styles.objectiveContainer, styles.input]}>
              <TextInput
                style={styles.input}
                value={objective}
                placeholderTextColor={'gray'}
                onChangeText={(text) => {
                  const updatedObjectives = [...objectives];
                  updatedObjectives[index] = text;
                  setObjectives(updatedObjectives);
                }}
                placeholder="Ingrese un objetivo"
                
              />
              <TouchableOpacity style={styles.input} onPress={() => handleRemoveObjective(index)} >
                <Text style={styles.actionText}>
                  Eliminar objetivo
                </Text>
                </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.action} onPress={handleAddCompany} >
          <Text style={styles.actionText2}>
            Agregar empresa
          </Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Epilogue-Variable',
    backgroundColor: 'black'
  },
  objectiveContainer: {
    padding: 15,
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
    borderColor: 'gray',
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
  actionText2: {
    color: 'black', // Color del texto del título
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionText: {
    color: 'white', // Color del texto del título
    fontWeight: 'bold',
    fontSize: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
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
  },
});

export default AddCompanyScreen;
