import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';


const AdminPanel = () => {
  const navigation = useNavigation();


  return (
    <ScrollView style={styles.container}>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
    fontFamily: 'Epilogue-Variable',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
  },
  buttonContainer: {
    gap: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
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
    fontSize: 24,
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
  gridButtonContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    fontFamily: 'Epilogue-Variable',
  },
  gridButtonText: {
    color: 'black', // Color del texto del título
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Epilogue-Variable',
    paddingTop: 10 
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },

});

export default AdminPanel;