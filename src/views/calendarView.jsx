import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';
import CalendarScreen from '../components/Calendar';
import { useNavigation } from '@react-navigation/native';

const CalendarView = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const navigation = useNavigation()

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
    <View>

      <View style={styles.container}>


        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
              <Path
                d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                fill="#ffffff"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.title}>Presentismo</Text>
        </View>



      </View>
      <View style={styles.containerCalendar}>
        <CalendarScreen />
      </View>
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
  containerCalendar: {
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 30,
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
    backgroundColor: 'rgb(55,128,195)'

  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Epilogue-Variable',
  },
});

export default CalendarView;
