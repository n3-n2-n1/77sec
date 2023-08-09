import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const ReportsChart = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Cargar la lista de reportes desde Firebase
    const reportsRef = firebase.firestore().collection('form');
    reportsRef.get().then((querySnapshot) => {
      const reportList = [];
      querySnapshot.forEach((doc) => {
        reportList.push({ id: doc.id, ...doc.data() });
      });
      setReportData(reportList);
    });
  }, []);

  // Procesar los datos para el gráfico
  const monthlyCounts = {}; // Objeto para almacenar el recuento de reportes por mes
  reportData.forEach((report) => {
    const date = new Date(report.timestamp); // Asegúrate de que tengas un campo de timestamp en tus reportes
    const month = date.getMonth(); // Mes (0-11)
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });

  // Convertir el objeto en un array para usarlo en el gráfico
  const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: Array.from({ length: 12 }, (_, i) => monthlyCounts[i] || 0),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={1080}
        height={220}
        yAxisLabel="Cantidad"
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginBottom: 20,
    width: '100%'
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
export default ReportsChart;
