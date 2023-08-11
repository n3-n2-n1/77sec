import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';


const AdminPanel = () => {
  const navigation = useNavigation();


  return (
    <ScrollView style={styles.container}>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#FDC826"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('calendar')} icon="calendar">
        <Text style={styles.buttonText}>Ver Calendario</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Empresas')}>
        <Text style={styles.buttonText}>Ver Lista de Empresas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('addCompany')}>
        <Text style={styles.buttonText}>Agregar Empresa</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('vigilantesView')}>
        <Text style={styles.buttonText}>Ver lista de Vigilantes</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Agregar Vigilante</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('reportHistory')}>
        <Text style={styles.buttonText}>Ver Lista de Reportes</Text>
      </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    backgroundColor: 'black',
    
  },
  buttonContainer:{
    gap:30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Epilogue-Variable',

  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    
    width: '100%',
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    fontFamily: 'Epilogue-Variable',



  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 30,
  },
});

export default AdminPanel;