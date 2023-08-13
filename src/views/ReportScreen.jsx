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
  const loadReports = () => {
    const reportsRef = firebase.firestore().collection('form');
    reportsRef.get().then((querySnapshot) => {
      const reportList = [];
      querySnapshot.forEach((doc) => {
        const reportData = { id: doc.id, ...doc.data() };
        reportList.push(reportData);
      });
      setReports(reportList);
    });
  };

  useEffect(() => {
    loadReports();
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
        placeholderTextColor={'white'}
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
            <Text style={styles.reportText}>
              
              <View>
                <Text style={styles.reportText}>
                  ID: {item.id}
                  </Text>
                  </View>
              
              </Text>
            <Text style={styles.reportText}>Novedad: {item.dataToSend.tipoNovedad}</Text>
            <Text style={styles.reportText}>Descripción: {item.dataToSend.predio}</Text>
            <Text style={styles.reportText}>Vigilador: {item.dataToSend.vigilador}</Text>
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
    backgroundColor: 'black'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 25
  },
  reportItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 10,

  },
  reportText: {
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
    fontWeight: 'bold',
    color: 'white'
  },
  
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
  },
});
export default ReportsScreen;
