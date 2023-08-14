import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchHorasTrabajadas = async () => {
      try {
        if (selectedDate) {
          const date = new Date(selectedDate);
          date.setHours(0, 0, 0, 0);

          const usersSnapshot = await firebase.firestore().collection('users').get();
          const presentismoData = {};

          for (const userDoc of usersSnapshot.docs) {
            const userDni = userDoc.data().dni;
            const horasTrabajadasSnapshot = await userDoc.ref.collection('horasTrabajadas')
              .where('entrada', '>=', date)
              .where('entrada', '<', new Date(date.getTime() + 24 * 60 * 60 * 1000))
              .get();

            horasTrabajadasSnapshot.forEach((doc) => {
              const data = doc.data();
              presentismoData[userDni] = presentismoData[userDni] || [];
              presentismoData[userDni].push({
                entrada: data.entrada.toDate(),
                salida: data.salida.toDate(),
                dni: userDni,
              });
            });
          }
          console.log(setEvents)
          setEvents(presentismoData);
        }
      } catch (error) {
        console.error('Error al cargar los datos de horasTrabajadas:', error);
      }
    };

    fetchHorasTrabajadas();
  }, [selectedDate]);

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
            <Text style={styles.eventTitle}>Registros el {selectedDate}:</Text>
            {Object.entries(events[selectedDate]).map(([dni, registros]) => (
              <View key={dni} style={styles.eventCard}>
                <Text style={styles.cardText}>DNI: {dni}</Text>
                {registros.map((registro, index) => (
                  <View key={index}>
                    <Text style={styles.cardText}>Entrada: {registro.entrada.toString()}</Text>
                    <Text style={styles.cardText}>Salida: {registro.salida.toString()}</Text>
                  </View>
                ))}
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
  eventContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  eventCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CalendarScreen;