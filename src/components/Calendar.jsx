import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';

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
            const nombre = data.nombre;


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
              nombre: nombre
            
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
    <View>
        <Calendar
          theme={{
            borderRadius: 15,
            todayDotColor: 'black',
            selectedDotColor: 'red',
            arrowWidth: 40,
            arrowHeight: 40,
            arrowColor:' black',
            backgroundColor: '#ffffff',
            calendarBackground: 'white',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: 'black',
            selectedDayTextColor: 'red',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#gray'
          }}
          
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
                      <Text style={styles.cardText}>Nombre: {registro.nombre}</Text>
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
    padding: 15,
    backgroundColor: '#3780C3',
    fontFamily: 'Epilogue-Variable',
  },
  containerCalendar:{
    padding: 15,
    paddingTop:10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 5,
    paddingBottom: 30,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',
  },
  contentContainer: {
    flex: 1,
  },
  eventContainer: {
    flex: 1,
  },
  eventContainerIn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    margin: 15
  },
  cardTextDNI: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center'

  },

  eventTitle: {
    fontSize: 20,
    padding: 15,
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
    backgroundColor: 'rgb(55,128,195)'

  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Epilogue-Variable',
  },
});

export default CalendarScreen;
