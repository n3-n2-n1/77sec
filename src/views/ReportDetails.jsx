import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Informe</Text>
      <Text>ID: {report.id}</Text>
      <Text>Descripción: {report.dataToSend.predio}</Text>
      <Text>Vigilador: {report.dataToSend.vigilador}</Text>
      <Text>Novedad: {report.dataToSend.tipoNovedad}</Text>
      {/* Agregar más detalles según sea necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ReportDetailScreen;
