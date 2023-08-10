import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../database/firebaseC';
import EnterprisesView from './EnterprisesView';
import ReportsChart from '../components/chartAdmin';

const AdminPanel = () => {
  const navigation = useNavigation();


  return (
    <ScrollView style={styles.container}>


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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminPanel;