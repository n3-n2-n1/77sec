import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchPresentismoData = async () => {
      try {
        const presentismoSnapshot = await firebase.firestore().collection('presentismo').get();
        const presentismoData = {};

        presentismoSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.timestamp) { // Verifica si la propiedad 'timestamp' existe en el objeto
            const timestamp = data.timestamp.toDate();
            const date = timestamp.toISOString().split('T')[0];

            if (!presentismoData[date]) {
              presentismoData[date] = [];
            }

            presentismoData[date].push(data); // Agregar 'data' directamente a la matriz
          }
        });

        setEvents(presentismoData);
      } catch (error) {
        console.error('Error al cargar los datos de presentismo:', error);
      }
    };

    fetchPresentismoData();
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={events}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />
      <SafeAreaView style={styles.contentContainer}>
  {selectedDate && events[selectedDate] && (
    <ScrollView style={styles.eventContainer}>
      <Text style={styles.eventTitle}>Presentes el {selectedDate}:</Text>
      {events[selectedDate].map((event, eventId) => (
        <View key={eventId} style={styles.eventCard}>
          <Text style={styles.cardText}>Nombre: {event.nombre}</Text>
          <Text style={styles.cardText}>Coordenadas:</Text>
          <Text style={styles.coordText}>Latitud: {event.coordenadas.latitude}</Text>
          <Text style={styles.coordText}>Longitud: {event.coordenadas.longitude}</Text>
          <Text style={styles.coordText}>Exactitud: {event.coordenadas.accuracy}</Text>
          <Text style={styles.coordText}>Altitud: {event.coordenadas.altitude}</Text>
          <Text style={styles.coordText}>Exactitud de Altitud: {event.coordenadas.altitudeAccuracy}</Text>
          <Text style={styles.coordText}>Rumbo: {event.coordenadas.heading}</Text>
          <Text style={styles.coordText}>Velocidad: {event.coordenadas.speed}</Text>
          <Text style={styles.cardText}>Fecha: {event.timestamp.toDate().toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  )}
</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  coordText:{
    color:'#4F7942',
  },
  eventContainer: {
    marginTop: 20,
    padding: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CalendarScreen;