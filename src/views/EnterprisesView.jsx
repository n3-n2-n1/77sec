import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Touchable } from 'react-native';
import { database } from '../database/firebaseC';
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';


const EnterprisesView = () => {
  const [empresas, setEmpresas] = useState([]);
  const [editingEmpresaId, setEditingEmpresaId] = useState(null);
  const [newData, setNewData] = useState({}); // Estado para almacenar los nuevos datos de edición

  const navigation = useNavigation();

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

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#ffffff"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>
          Lista de empresas
        </Text>
      </View>

      <View style={styles.container}>

        {empresas.map((empresa) => (
          <View key={empresa.id} style={styles.card}>
            {editingEmpresaId === empresa.id ? (
              // Formulario de edición

              <View>

                <Text style={styles.cardText}>
                  Nuevo nombre:
                </Text>
                <TextInput
                  placeholder="Nuevo nombre"
                  value={newData.name || empresa.name}
                  onChangeText={(text) => setNewData({ ...newData, name: text })}
                  style={styles.input}
                />

                <Text style={styles.cardText}>
                  Nueva direccion:
                </Text>
                <TextInput
                  placeholder="Nueva direccion"
                  value={newData.address || empresa.address}
                  onChangeText={(text) => setNewData({ ...newData, address: text })}
                  style={styles.input}
                />


                <Text style={styles.cardText}>
                  Nuevo encargado:
                </Text>
                <TextInput
                  placeholder="Nuevo Encargado"
                  value={newData.chief || empresa.chief}
                  onChangeText={(text) => setNewData({ ...newData, chief: text })}
                  style={styles.input}
                />


                <Text style={styles.cardText}>
                  Nuevo DNI:
                </Text>
                <TextInput
                  placeholder="Nuevo DNI"
                  value={newData.chiefDNI || empresa.chiefDNI}
                  onChangeText={(text) => setNewData({ ...newData, chiefDNI: text })}
                  style={styles.input}
                />


                <Text style={styles.cardText}>
                  Nuevo telefono:
                </Text>
                <TextInput
                  placeholderTextColor={'white'}
                  placeholder="Nuevo telefono"
                  value={newData.tel || empresa.tel}
                  onChangeText={(text) => setNewData({ ...newData, tel: text })}
                  style={styles.input}
                />

                <Text style={styles.cardText}>
                  Nuevo objetivo:
                </Text>
                <TextInput
                  placeholder="Nuevo objetivo"
                  value={newData.objectives || empresa.objectives}
                  onChangeText={(text) => setNewData({ ...newData, objectives: text })}
                  style={styles.input}
                />
                {/* ... otros campos de edición ... */}

                <View style={{padding: 15}}>

                <TouchableOpacity style={{ padding: 15, borderWidth: 2, borderColor: 'white', borderRadius: 25, backgroundColor:'#F89A53' }} title="Cancelar" onPress={handleCancelEdit} >
                  <Text style={{alignSelf: 'center', fontFamily: 'Epilogue-Variable', color: 'white'}}>
                    Cancelar
                  </Text>
                  </TouchableOpacity>

                <TouchableOpacity style={{ padding: 15, borderWidth: 2, borderColor: 'white', borderRadius: 25, backgroundColor:'#F89A53' }} title="Guardar" onPress={() => handleSaveEdit(empresa.id)} >
                  <Text style={{alignSelf: 'center', fontFamily: 'Epilogue-Variable', color: 'white'}}>
                    Guardar
                  </Text>
                  </TouchableOpacity>
                
                </View>
              
              
              </View>

            ) : (
              // Modo de visualización
              <View>
                <Text style={styles.cardTitle}>{empresa.name}</Text>
                <Text style={styles.cardText}>Direccion: {empresa.address}</Text>
                <Text style={styles.cardText}>Encargado General: {empresa.chief}</Text>
                <Text style={styles.cardText}>DNI Encargado General: {empresa.chiefDNI}</Text>
                <Text style={styles.cardText}>Objetivos: {empresa.objectives}</Text>
                <Text style={styles.cardText}>Contacto: {empresa.tel}</Text>
                {/* ... otros campos ... */}
                <TouchableOpacity title="Editar" onPress={() => handleEditClick(empresa.id)} style={styles.button} >
                  <Text style={styles.buttonText}> Editar </Text>
                </TouchableOpacity>
                <TouchableOpacity title="Eliminar" style={styles.buttonD} onPress={() => handleDeleteEmpresa(empresa.name)} >
                  <Text style={styles.buttonText}>
                    Eliminar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#3780C3',
    fontFamily: 'Epilogue-Variable',
  },
  input: {
    borderRadius: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Epilogue-Variable',
  },
  buttonD: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F89A53',
    padding: 10,
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Epilogue-Variable',
    paddingLeft: 5,
    paddingBottom: 5
  },
  cardText: {
    paddingLeft: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Epilogue-Variable',

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 5,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
});

export default EnterprisesView;
