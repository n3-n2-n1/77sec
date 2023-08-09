import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import { database } from '../database/firebaseC'; // Importa la configuración de Firebase

const EnterprisesView = ({ onDeleteEmpresa }) => {
  const [empresas, setEmpresas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasSnapshot = await database.collection('empresas').get();
        const empresasData = empresasSnapshot.docs.map((doc) => doc.data());
        setEmpresas(empresasData);
      } catch (error) {
        console.error('Error al cargar las empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleDeleteEmpresa = async (empresaName) => {
    try {
      await database.collection('empresas').doc(empresaName).delete();
      setEmpresas((prevEmpresas) => prevEmpresas.filter((empresa) => empresa.name !== empresaName));
      console.log('Empresa eliminada:', empresaName);
    } catch (error) {
      console.error('Error al eliminar la empresa:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Enterprises</Text>
      {empresas.map((empresa, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{empresa.name}</Text>
          <Text style={styles.cardText}>{empresa.address}</Text>
          <Text style={styles.cardText}>{empresa.tel}</Text>
          {empresa.objectives && (
            <View style={styles.objectives}>
              {empresa.objectives.map((objective, objectiveIndex) => (
                <Text key={objectiveIndex} style={styles.objectiveText}>{objective}</Text>
              ))}
            </View>
          )}
          <Button
            title="Delete"
            onPress={() => handleDeleteEmpresa(empresa.name)}
          />

          <Button
            title="Editar"
            onPress={() => navigation.navigate('EditEmpresa', { empresaId: empresa.id })}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    marginBottom: 8,
  },
  objectives: {
    marginTop: 8,
  },
  objectiveText: {
    fontSize: 12,
    color: '#555',
  },
});

export default EnterprisesView;
