import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchPresentismo = async () => {
      try {
        const usersSnapshot = await firebase.firestore().collection('users').get();
        const presentismoData = {};

        await Promise.all(usersSnapshot.docs.map(async userDoc => {
          const userDni = userDoc.data().dni;
          const horasTrabajadasSnapshot = await userDoc.ref.collection('horasTrabajadas').get();
          const horasTrabajadasArray = [];

          horasTrabajadasSnapshot.forEach(doc => {
            horasTrabajadasArray.push(doc.data());
          });

          horasTrabajadasArray.forEach(data => {
            const fecha = data.fecha;
            const entrada = data.entrada;
            const salida = data.salida;


            //Valores convertidos SOLO PARA CALCULAR HORAS, CON ESTO NO FILTRAS

            const diffInMilliseconds = (salida - entrada).toString;
            const hoursWorked = diffInMilliseconds / (1000 * 60 * 60);
            //Valores convertidos SOLO PARA CALCULAR HORAS, CON ESTO NO FILTRAS


            if (!presentismoData[fecha]) {
              presentismoData[fecha] = {};
            }

            if (!presentismoData[fecha][userDni]) {
              presentismoData[fecha][userDni] = [];
            }


            presentismoData[fecha][userDni].push({
              entrada: entrada,
              salida: salida,
              horasTotal: hoursWorked,
            });
          });
        }));

        setEvents(presentismoData);
      } catch (error) {
        console.error('Error al cargar los datos de presentismo:', error);
      }
    };

    fetchPresentismo();
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
      theme={{
        arrowWidth: 3,
        arrowColor: 'black',
        backgroundColor: '#ffffff',
        calendarBackground: 'white',
        textSectionTitleColor: 'white',
        selectedDayBackgroundColor: 'black',
        selectedDayTextColor: 'red',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e'}}
        
        markedDates={events}
        onDayPress={day => {
          setSelectedDate(day.dateString);
        }}
      />
      <SafeAreaView style={styles.contentContainer}>
        {selectedDate && events[selectedDate] && (
          <ScrollView style={styles.eventContainer}>
            <Text style={styles.eventTitle}>Registros el {selectedDate}:</Text>
            {Object.entries(events[selectedDate]).map(([dni, registrosArray], index) => (
              <ScrollView key={index} style={styles.eventCard}>
                <Text style={styles.cardTextDNI}>#{dni}</Text>
                {registrosArray.map((registro, index) => (
                  <View key={index} style={styles.eventContainerIn}>
                    <Text style={styles.cardText}>DNI: {dni}</Text>
                    <Text style={styles.cardText}>Entrada: {registro.entrada}</Text>
                    <Text style={styles.cardText}>Salida: {registro.salida}</Text>
                    <Text style={styles.cardText}>Trabajado: {registro.horasTotal}</Text>
                  </View>
                ))}
              </ScrollView>
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
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  eventContainer: {
    flex: 1,
  },
  eventContainerIn:{
    backgroundColor:'white',
    padding: 10,
    borderRadius: 25,
    margin: 15
  },
  cardTextDNI:{
    color: 'white',
    fontSize: 15,
    alignSelf: 'center'
    
  },

  eventTitle: {
    fontSize: 20,
    padding: 25,
    fontFamily: 'Epilogue-Variable',
    fontWeight: 'bold',
    color: '#CACACA',
    marginVertical: 10,
  },
  eventCard: {
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 25,
    padding: 6,
    marginBottom: 10,
    backgroundColor:'rgb(55,128,195)'

  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Epilogue-Variable',
  },
});

export default CalendarScreen;
