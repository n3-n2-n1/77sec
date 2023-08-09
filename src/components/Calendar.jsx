import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [scanData, setScanData] = useState([]);

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
      setShowDatePicker(false);
    }
  };

  // Función para manejar el escaneo de QR y agregar datos al estado
  const handleScan = (scanInfo) => {
    setScanData([...scanData, scanInfo]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButton}>Seleccionar Fecha</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Mostrar las fechas escaneadas debajo del calendario */}
      <View style={styles.scanDataContainer}>
        {scanData.map((scan, index) => (
          <Text key={index}>
            Fecha: {scan.date}, Hora: {scan.time}, Datos: {JSON.stringify(scan.data)}
          </Text>
        ))}
      </View>

      {/* Botón para simular el escaneo de QR (esto es solo un ejemplo) */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() =>
          handleScan({
            date: selectedDate.toDateString(),
            time: selectedDate.toTimeString(),
            data: { example: 'Datos del escaneo' },
          })
        }
      >
        <Text>Escanear QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  dateButton: {
    fontSize: 18,
    color: 'blue',
  },
  scanDataContainer: {
    marginTop: 20,
  },
  scanButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
  },
});

export default CalendarView;
