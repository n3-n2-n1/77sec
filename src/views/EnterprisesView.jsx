import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { database } from '../database/firebaseC';

const EnterprisesView = () => {
  const [empresas, setEmpresas] = useState([]);
  const [editingEmpresaId, setEditingEmpresaId] = useState(null);
  const [newData, setNewData] = useState({}); // Estado para almacenar los nuevos datos de edición

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasSnapshot = await database.collection('empresas').get();
        const empresasData = empresasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmpresas(empresasData);
      } catch (error) {
        console.error('Error al cargar las empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleDeleteEmpresa = async (empresaName) => {
    try {
        const empresasRef = database.collection('empresas');
        const querySnapshot = await empresasRef.where('name', '==', empresaName).get();

        querySnapshot.forEach(async (doc) => {
            await doc.ref.delete();
            console.log('Empresa eliminada:', empresaName);
        });

        setEmpresas((prevEmpresas) => prevEmpresas.filter((empresa) => empresa.name !== empresaName));
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
    }
};

  const handleEditClick = (empresaId) => {
    setEditingEmpresaId(empresaId);
    setNewData({}); // Reiniciar los datos de edición
  };

  const handleCancelEdit = () => {
    setEditingEmpresaId(null);
    setNewData({}); // Reiniciar los datos de edición
  };

  const handleSaveEdit = async (empresaId) => {
    try {
      // Actualizar los datos de la empresa en la base de datos
      await database.collection('empresas').doc(empresaId).update(newData);

      // Actualizar la lista de empresas en el estado
      setEmpresas((prevEmpresas) =>
        prevEmpresas.map((empresa) =>
          empresa.id === empresaId ? { ...empresa, ...newData } : empresa
        )
      );

      // Finalizar el modo de edición
      setEditingEmpresaId(null);
      setNewData({}); // Reiniciar los datos de edición
    } catch (error) {
      console.error('Error al guardar la edición de la empresa:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Enterprises</Text>
      {empresas.map((empresa) => (
        <View key={empresa.id} style={styles.card}>
          {editingEmpresaId === empresa.id ? (
            // Formulario de edición
            <View>
              {/* Aquí puedes renderizar campos de edición según tus necesidades */}
              {/* Por ejemplo: */}
              <TextInput
                placeholder="Nuevo nombre"
                value={newData.name || empresa.name}
                onChangeText={(text) => setNewData({ ...newData, name: text })}
              />
              {/* ... otros campos de edición ... */}

              <Button title="Cancelar" onPress={handleCancelEdit} />
              <Button title="Guardar" onPress={() => handleSaveEdit(empresa.id)} />
            </View>
          ) : (
            // Modo de visualización
            <View>
              <Text style={styles.cardTitle}>{empresa.name}</Text>
              <Text style={styles.cardText}>{empresa.address}</Text>
              <Text style={styles.cardText}>{empresa.tel}</Text>
              {/* ... otros campos ... */}
              <Button title="Editar" onPress={() => handleEditClick(empresa.id)} />
              <Button title="Eliminar" onPress={() => handleDeleteEmpresa(empresa.name)} />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

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
  // ... otros estilos ...
});

export default EnterprisesView;
