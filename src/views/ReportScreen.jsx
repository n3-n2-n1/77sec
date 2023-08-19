import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';


const ReportsScreen = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  // Cargar la lista de reportes desde Firebase
  const loadReports = async () => {
    const reportsRef = firebase.firestore().collection('form');
    try {
      const querySnapshot = await reportsRef.get();
      const reportList = [];
      querySnapshot.forEach((doc) => {
        const reportData = { id: doc.id, ...doc.data() };
        reportList.push(reportData);
      });
      setReports(reportList);
      console.log(reportList)
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };



  useEffect(() => {
    loadReports();
  }, []);
  
  const filteredReports = reports.filter((report) => {
    // Filtrar por empresaSeleccionada
    const empresas = report.id || []; // Asegúrate de manejar el caso en que empresaSeleccionada sea null o undefined
    for (const empresa of empresas) {
      const fieldValue = empresa.toString().toLowerCase();
      if (fieldValue.includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
  


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
        <Text style={styles.title}>Lista de Reportes</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor={'gray'}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
      data={filteredReports}
      keyExtractor={(item) => item.id} // Utiliza el campo "id" como clave
      renderItem={({ item }) => (
        <TouchableOpacity
        
            style={styles.card}
          onPress={() => navigation.navigate('ReportDetail', { report: item })}
        >
          <Text style={styles.cardText}>ID: {item.id}</Text>
          <Text style={styles.cardText}>Descripción: {item.predio}</Text>
          <Text style={styles.cardText}>Empresa: {item.empresaSeleccionada || item.empresa}</Text>
          <Text style={styles.cardText}>Predio: {item.predio}</Text>
        </TouchableOpacity>
      )}
    />

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3780C3'
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 25,
    fontFamily: 'Epilogue-Variable',
    backgroundColor: 'white'

  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  card: {
    marginBottom: 8,
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderColor: 'white',
    padding: 8,
    borderRadius: 15,
  },
  cardText: {
    paddingLeft: 5,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Epilogue-Variable',

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
  },
});
export default ReportsScreen;
