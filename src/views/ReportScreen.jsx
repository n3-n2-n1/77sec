import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation } from '@react-navigation/native';

const ReportsScreen = () => {

  const [reports, setReports] = useState([]);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Cargar la lista de reportes desde Firebase
    const reportsRef = firebase.firestore().collection('form');
    reportsRef.get().then((querySnapshot) => {
      const reportList = [];
      querySnapshot.forEach((doc) => {
        const reportData = { id: doc.id, ...doc.data() };
        reportList.push(reportData);
        console.log('Report data:', reportData);
      });
      setReports(reportList);
    });
  }, []);

  const filteredReports = reports.filter((report) => {
    for (const key in report.dataToSend) {
      if (report.dataToSend.hasOwnProperty(key) && report.dataToSend[key]) {
        const fieldValue = report.dataToSend[key].toString().toLowerCase();
        if (fieldValue.includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Lista de Reportes</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por predio"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reportItem}
            onPress={() => navigation.navigate('ReportDetail', { report: item })}
          >
            <Text style={styles.reportText}>ID: {item.id}</Text>
            <Text style={styles.reportText}>Descripción: {item.dataToSend.predio}</Text>
            <Text style={styles.reportText}>Vigilador: {item.dataToSend.vigilador}</Text>
            <Text style={styles.reportText}>Novedad: {item.dataToSend.tipoNovedad}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  reportItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  reportText: {
    fontSize: 16,
  },
});
export default ReportsScreen;
