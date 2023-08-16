import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, View, Button, Alert } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';
import CalendarScreen from '../components/Calendar';



const Home = () => {




  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserDisplayName, setCurrentUserDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  useEffect(() => {


    // Verificar el rol del usuario actual
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      // Guardar el nombre del usuario actual
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log('Rol del usuario:', userData.role);
          console.log('Nombre', userData.name);
          setCurrentUserDisplayName(userData.name);
          setIsAdmin(userData.role === 'admin');
        } else {
          console.log('No se encontró información para el usuario.');

        }
        setIsLoading(false); // Datos cargados, cambiar estado de isLoading
      });
    } else {
      console.log('No hay usuario autenticado.');
      setIsLoading(false);
    }


  },
    []);




  const handleCall = () => {
    console.log('1132369112');
  };

  const handleReport = () => {
    navigation.navigate('Form');
  };

  const handleChat = () => {
    navigation.navigate('ChatScreen');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    firebase.auth().signOut()
      .then(() => {
        console.log('Cierre de sesión exitoso.');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error.message);
      });
  };


  return (

    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
      indicatorStyle="white">
      {isLoading ? (
        <View style={styles.loadingContainer}>


        </View>
      ) : (
        <ScrollView>

          {isAdmin && (

            <ScrollView>

              <TouchableOpacity style={styles.navbar} stickyHeaderIndices={[0]} onPress={() => setIsMenuVisible(true)}>

                <View style={styles.profileButton}>

                  <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
                    {/* Replace "Perfil" text with SVG */}
                    <Svg width={30} height={30} viewBox="0 0 24 24" fill="#ffffff">
                      <Path
                        d="M3,21.016l.78984-2.87249C5.0964,13.3918,8.5482,10.984,12,10.984"
                        fill="none"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                      />
                      <Circle
                        cx={12}
                        cy={5.98404}
                        r={5}
                        fill="none"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                      />
                      <Circle
                        cx={17}
                        cy={18}
                        r={5}
                        fill="#F89A53"
                        stroke="#F89A53"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                      />
                    </Svg>

                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>
                  ¡Bienvenido, Jefe de Operaciones!
                </Text>


              </TouchableOpacity>


              <View horizontal>

                <View style={styles.gridButtonContainer}>
                  <View style={styles.gridButtonContainer2}>


                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => { navigation.navigate('vigilantesView') }}>
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={40} height={40} viewBox="0 0 48 48">
                              <Path d="M24,21A10,10,0,1,1,34,11,10,10,0,0,1,24,21ZM24,5a6,6,0,1,0,6,6A6,6,0,0,0,24,5Z"></Path>
                              <Path d="M42,47H6a2,2,0,0,1-2-2V39A16,16,0,0,1,20,23h8A16,16,0,0,1,44,39v6A2,2,0,0,1,42,47ZM8,43H40V39A12,12,0,0,0,28,27H20A12,12,0,0,0,8,39Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold' }} > Vigilantes </Text>
                        </View>
                      </TouchableOpacity>

                    </View>


                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity onPress={() => { navigation.navigate('reportHistory') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={40} height={40} viewBox="0 0 48 48">
                              <Path d="M40,47H8a2,2,0,0,1-2-2V3A2,2,0,0,1,8,1H40a2,2,0,0,1,2,2V45A2,2,0,0,1,40,47ZM10,43H38V5H10Z"></Path>
                              <Path d="M15,19a2,2,0,0,1-1.41-3.41l4-4a2,2,0,0,1,2.31-.37l2.83,1.42,5-4.16A2,2,0,0,1,30.2,8.4l4,3a2,2,0,1,1-2.4,3.2l-2.73-2.05-4.79,4a2,2,0,0,1-2.17.25L19.4,15.43l-3,3A2,2,0,0,1,15,19Z"></Path>
                              <Circle cx="15" cy="24" r="2"></Circle>
                              <Circle cx="15" cy="31" r="2"></Circle>
                              <Circle cx="15" cy="38" r="2"></Circle>
                              <Path d="M33,26H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></Path>
                              <Path d="M33,33H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></Path>
                              <Path d="M33,40H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold', alignItems: 'center', alignContent: 'center', fontFamily: 'Epilogue-Variable' }} > Reportes </Text>
                        </View>
                      </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity onPress={() => { navigation.navigate('Empresas') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={42} height={42} viewBox="0 0 48 48">
                              <Path d="M47,12a2,2,0,0,0-2-2H24a2,2,0,0,0,0,4H45A2,2,0,0,0,47,12Z"></Path>
                              <Path d="M3,14H8.35a6,6,0,1,0,0-4H3a2,2,0,0,0,0,4Zm11-4a2,2,0,1,1-2,2A2,2,0,0,1,14,10Z"></Path>
                              <Path d="M45,22H37.65a6,6,0,1,0,0,4H45a2,2,0,0,0,0-4ZM32,26a2,2,0,1,1,2-2A2,2,0,0,1,32,26Z"></Path>
                              <Path d="M22,22H3a2,2,0,0,0,0,4H22a2,2,0,0,0,0-4Z"></Path>
                              <Path d="M45,34H28a2,2,0,0,0,0,4H45a2,2,0,0,0,0-4Z"></Path>
                              <Path d="M18,30a6,6,0,0,0-5.65,4H3a2,2,0,0,0,0,4h9.35A6,6,0,1,0,18,30Zm0,8a2,2,0,1,1,2-2A2,2,0,0,1,18,38Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold', fontFamily: 'Epilogue-Variable' }} > Empresas </Text>
                        </View>
                      </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={40} height={40} viewBox="0 0 48 48">
                              <Path d="M8,1A2,2,0,0,0,6,3V45a2,2,0,0,0,4,0V3A2,2,0,0,0,8,1Z"></Path>
                              <Path d="M43.55,13.74C38.22,7.18,32.71,7.62,27.84,8c-4.63.37-8.29.66-12.29-4.27A2,2,0,0,0,12,5V22a2,2,0,0,0,.94,1.7,9.09,9.09,0,0,0,4.91,1.46c4,0,7.8-2.62,11.28-5,5.14-3.53,8.49-5.52,11.81-3.45a2,2,0,0,0,2.61-3ZM26.87,16.85C22.22,20,19,22,16,20.78V9.66c4.18,3,8.37,2.63,12.16,2.33,2.54-.2,4.79-.38,7,.31C32.23,13.17,29.46,15.07,26.87,16.85Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold', fontFamily: 'Epilogue-Variable' }} > Admin </Text>
                        </View>
                      </TouchableOpacity>

                    </View>
                  </View>


                  <View style={{ alignContent: 'flex-start', flex: 1, width: 280, alignSelf: 'flex-start', paddingTop: 20, }}>
                    <TouchableOpacity style={{ padding: 15, borderRadius: 25, backgroundColor: '#F89A53' }}>
                      <Text style={styles.secondaryText}> Evalúa el presentismo ahora!</Text>
                    </TouchableOpacity>
                  </View>


                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>

                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('Register')}>
                  <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', fontFamily: 'Epilogue-Variable' }}>
                    <Path
                      d="M32 28C29.3629 28 26.785 27.218 24.5924 25.7529C22.3997 24.2878 20.6907 22.2055 19.6816 19.7691C18.6724 17.3328 18.4084 14.6519 18.9228 12.0655C19.4373 9.47905 20.7072 7.10328 22.5719 5.23858C24.4366 3.37388 26.8123 2.104 29.3988 1.58953C31.9852 1.07506 34.6661 1.33911 37.1024 2.34827C39.5388 3.35744 41.6211 5.06641 43.0862 7.25906C44.5513 9.45172 45.3333 12.0296 45.3333 14.6667C45.3333 18.2029 43.9285 21.5943 41.4281 24.0948C38.9276 26.5952 35.5362 28 32 28ZM32 6.66667C30.4177 6.66667 28.871 7.13586 27.5554 8.01491C26.2398 8.89396 25.2144 10.1434 24.6089 11.6052C24.0034 13.067 23.845 14.6755 24.1537 16.2274C24.4624 17.7792 25.2243 19.2047 26.3431 20.3235C27.4619 21.4423 28.8874 22.2043 30.4392 22.513C31.9911 22.8216 33.5996 22.6632 35.0614 22.0577C36.5232 21.4522 37.7727 20.4268 38.6517 19.1112C39.5308 17.7956 40 16.2489 40 14.6667C40 12.5449 39.1571 10.5101 37.6568 9.00981C36.1565 7.50952 34.1217 6.66667 32 6.66667Z"
                      fill="black"
                    />
                    <Path
                      d="M56 62.6667H7.99998C7.29274 62.6667 6.61446 62.3857 6.11436 61.8856C5.61426 61.3855 5.33331 60.7072 5.33331 60V52C5.33331 46.342 7.58093 40.9158 11.5817 36.9151C15.5825 32.9143 21.0087 30.6667 26.6666 30.6667H37.3333C42.9913 30.6667 48.4175 32.9143 52.4183 36.9151C56.419 40.9158 58.6666 46.342 58.6666 52V60C58.6666 60.7072 58.3857 61.3855 57.8856 61.8856C57.3855 62.3857 56.7072 62.6667 56 62.6667ZM10.6666 57.3333H53.3333V52C53.3333 47.7565 51.6476 43.6869 48.647 40.6863C45.6464 37.6857 41.5768 36 37.3333 36H26.6666C22.4232 36 18.3535 37.6857 15.3529 40.6863C12.3524 43.6869 10.6666 47.7565 10.6666 52V57.3333Z"
                      fill="black"
                    />
                    <Path
                      d="M47 7L57 7"
                      stroke="black"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M52 2L52 12"
                      stroke="black"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </Svg>
                  <Text style={styles.gridButtonText}>Agregar Vigilante</Text>

                </TouchableOpacity>


                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('addCompany')} >
                  <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path
                      d="M62.6667 16C62.6667 15.2928 62.3857 14.6145 61.8856 14.1144C61.3855 13.6143 60.7072 13.3333 60 13.3333H32C31.2927 13.3333 30.6145 13.6143 30.1144 14.1144C29.6143 14.6145 29.3333 15.2928 29.3333 16C29.3333 16.7072 29.6143 17.3855 30.1144 17.8856C30.6145 18.3857 31.2927 18.6667 32 18.6667H60C60.7072 18.6667 61.3855 18.3857 61.8856 17.8856C62.3857 17.3855 62.6667 16.7072 62.6667 16Z"
                      fill="black"
                    />
                    <Path
                      d="M3.99998 18.6667H11.1333C11.7624 20.4459 13.0002 21.9455 14.6279 22.9004C16.2557 23.8552 18.1686 24.2039 20.0286 23.8848C21.8886 23.5657 23.5759 22.5993 24.7923 21.1564C26.0086 19.7136 26.6758 17.8872 26.6758 16C26.6758 14.1128 26.0086 12.2864 24.7923 10.8436C23.5759 9.40072 21.8886 8.43434 20.0286 8.11521C18.1686 7.79609 16.2557 8.14478 14.6279 9.09965C13.0002 10.0545 11.7624 11.5541 11.1333 13.3333H3.99998C3.29274 13.3333 2.61446 13.6143 2.11436 14.1144C1.61426 14.6145 1.33331 15.2928 1.33331 16C1.33331 16.7072 1.61426 17.3855 2.11436 17.8856C2.61446 18.3857 3.29274 18.6667 3.99998 18.6667ZM18.6666 13.3333C19.1941 13.3333 19.7096 13.4897 20.1482 13.7827C20.5867 14.0758 20.9285 14.4922 21.1303 14.9795C21.3322 15.4668 21.385 16.003 21.2821 16.5202C21.1792 17.0375 20.9252 17.5127 20.5523 17.8856C20.1793 18.2586 19.7042 18.5125 19.1869 18.6154C18.6696 18.7183 18.1334 18.6655 17.6462 18.4637C17.1589 18.2618 16.7424 17.9201 16.4494 17.4815C16.1564 17.043 16 16.5274 16 16C16 15.2928 16.2809 14.6145 16.781 14.1144C17.2811 13.6143 17.9594 13.3333 18.6666 13.3333Z"
                      fill="black"
                    />
                    <Path
                      d="M60 29.3333H50.2C49.571 27.5541 48.3332 26.0545 46.7054 25.0997C45.0776 24.1448 43.1647 23.7961 41.3047 24.1152C39.4447 24.4343 37.7574 25.4007 36.5411 26.8436C35.3247 28.2864 34.6575 30.1128 34.6575 32C34.6575 33.8872 35.3247 35.7136 36.5411 37.1564C37.7574 38.5993 39.4447 39.5657 41.3047 39.8848C43.1647 40.2039 45.0776 39.8552 46.7054 38.9004C48.3332 37.9455 49.571 36.4459 50.2 34.6667H60C60.7072 34.6667 61.3855 34.3857 61.8856 33.8856C62.3857 33.3855 62.6667 32.7072 62.6667 32C62.6667 31.2928 62.3857 30.6145 61.8856 30.1144C61.3855 29.6143 60.7072 29.3333 60 29.3333ZM42.6667 34.6667C42.1393 34.6667 41.6237 34.5103 41.1852 34.2173C40.7466 33.9242 40.4048 33.5078 40.203 33.0205C40.0012 32.5332 39.9484 31.997 40.0512 31.4798C40.1541 30.9625 40.4081 30.4873 40.7811 30.1144C41.154 29.7414 41.6291 29.4875 42.1464 29.3846C42.6637 29.2817 43.1999 29.3345 43.6872 29.5363C44.1744 29.7382 44.5909 30.0799 44.8839 30.5185C45.1769 30.957 45.3333 31.4726 45.3333 32C45.3333 32.7072 45.0524 33.3855 44.5523 33.8856C44.0522 34.3857 43.3739 34.6667 42.6667 34.6667Z"
                      fill="black"
                    />
                    <Path
                      d="M29.3333 29.3333H3.99998C3.29274 29.3333 2.61446 29.6143 2.11436 30.1144C1.61426 30.6145 1.33331 31.2928 1.33331 32C1.33331 32.7073 1.61426 33.3855 2.11436 33.8856C2.61446 34.3857 3.29274 34.6667 3.99998 34.6667H29.3333C30.0406 34.6667 30.7188 34.3857 31.2189 33.8856C31.719 33.3855 32 32.7073 32 32C32 31.2928 31.719 30.6145 31.2189 30.1144C30.7188 29.6143 30.0406 29.3333 29.3333 29.3333Z"
                      fill="black"
                    />
                    <Path
                      d="M60 45.3333H37.3333C36.626 45.3333 35.9478 45.6143 35.4477 46.1144C34.9476 46.6145 34.6666 47.2928 34.6666 48C34.6666 48.7072 34.9476 49.3855 35.4477 49.8856C35.9478 50.3857 36.626 50.6667 37.3333 50.6667H60C60.7072 50.6667 61.3855 50.3857 61.8856 49.8856C62.3857 49.3855 62.6666 48.7072 62.6666 48C62.6666 47.2928 62.3857 46.6145 61.8856 46.1144C61.3855 45.6143 60.7072 45.3333 60 45.3333Z"
                      fill="black"
                    />
                    <Path
                      d="M24 40C22.3472 40.0019 20.7355 40.5157 19.3866 41.4707C18.0376 42.4257 17.0176 43.7751 16.4666 45.3333H3.99998C3.29274 45.3333 2.61446 45.6143 2.11436 46.1144C1.61426 46.6145 1.33331 47.2928 1.33331 48C1.33331 48.7073 1.61426 49.3855 2.11436 49.8856C2.61446 50.3857 3.29274 50.6667 3.99998 50.6667H16.4666C16.9557 52.0498 17.8156 53.2719 18.9524 54.1992C20.0892 55.1265 21.4591 55.7233 22.9123 55.9245C24.3655 56.1256 25.846 55.9233 27.1919 55.3396C28.5379 54.7559 29.6974 53.8134 30.5437 52.6151C31.39 51.4167 31.8906 50.0088 31.9905 48.5452C32.0905 47.0815 31.7861 45.6186 31.1106 44.3163C30.435 43.014 29.4144 41.9226 28.1604 41.1613C26.9063 40.4001 25.467 39.9983 24 40ZM24 50.6667C23.4726 50.6667 22.957 50.5103 22.5185 50.2173C22.0799 49.9242 21.7381 49.5078 21.5363 49.0205C21.3345 48.5332 21.2817 47.997 21.3846 47.4798C21.4874 46.9625 21.7414 46.4873 22.1144 46.1144C22.4873 45.7414 22.9625 45.4875 23.4797 45.3846C23.997 45.2817 24.5332 45.3345 25.0205 45.5363C25.5077 45.7382 25.9242 46.08 26.2172 46.5185C26.5102 46.957 26.6666 47.4726 26.6666 48C26.6666 48.7073 26.3857 49.3855 25.8856 49.8856C25.3855 50.3857 24.7072 50.6667 24 50.6667Z"
                      fill="black"
                    />
                    <Path d="M51 6L61 6" stroke="black" stroke-width="4" stroke-linecap="round" />
                    <Path d="M56 1L56 11" stroke="black" stroke-width="4" stroke-linecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Agregar Empresa</Text>

                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>

                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('ChatScreen')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Agregar Supervisor</Text>

                </TouchableOpacity>


                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('ChatScreen')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Ordenes Generales</Text>

                </TouchableOpacity>


              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>

                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadPresentismo')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Marcar Entrada</Text>

                </TouchableOpacity>


                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadSalida')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Marcar Salida</Text>

                </TouchableOpacity>


              </View>

              <View style={{paddingBottom: 15}}>

              <View style={styles.gridButtonContainer}>

                <CalendarScreen />

              </View>

              </View>

            </ScrollView>


          )}






          {!isAdmin && (
            <ScrollView>


              <View style={styles.navbar} stickyHeaderIndices={[0]}>

                <View style={styles.profileButton}>

                  <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
                    {/* Replace "Perfil" text with SVG */}
                    <Svg width={30} height={30} viewBox="0 0 24 24" fill="#ffffff">
                      <Path
                        d="M3,21.016l.78984-2.87249C5.0964,13.3918,8.5482,10.984,12,10.984"
                        fill="none"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                      />
                      <Circle
                        cx={12}
                        cy={5.98404}
                        r={5}
                        fill="none"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                      />
                      <Circle
                        cx={17}
                        cy={18}
                        r={5}
                        fill="#F89A53"
                        stroke="#F89A53"
                        strokeLinecap="round"
                        strokeWidth={1.5}
                      />
                    </Svg>

                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>
                  ¡Bienvenido, Vigilador!
                </Text>
              </View>
              <View horizontal>

                <View style={styles.gridButtonContainer}>
                  <View style={styles.gridButtonContainer2}>


                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => { navigation.navigate('vigilantesView') }}>
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={40} height={40} viewBox="0 0 48 48">
                              <Path d="M24,21A10,10,0,1,1,34,11,10,10,0,0,1,24,21ZM24,5a6,6,0,1,0,6,6A6,6,0,0,0,24,5Z"></Path>
                              <Path d="M42,47H6a2,2,0,0,1-2-2V39A16,16,0,0,1,20,23h8A16,16,0,0,1,44,39v6A2,2,0,0,1,42,47ZM8,43H40V39A12,12,0,0,0,28,27H20A12,12,0,0,0,8,39Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold' }} > Reportar </Text>
                        </View>
                      </TouchableOpacity>

                    </View>


                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => { navigation.navigate('vigilantesView') }}>
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={40} height={40} viewBox="0 0 48 48">
                              <Path d="M24,21A10,10,0,1,1,34,11,10,10,0,0,1,24,21ZM24,5a6,6,0,1,0,6,6A6,6,0,0,0,24,5Z"></Path>
                              <Path d="M42,47H6a2,2,0,0,1-2-2V39A16,16,0,0,1,20,23h8A16,16,0,0,1,44,39v6A2,2,0,0,1,42,47ZM8,43H40V39A12,12,0,0,0,28,27H20A12,12,0,0,0,8,39Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold' }} > Reportar </Text>
                        </View>
                      </TouchableOpacity>

                    </View>


                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity onPress={() => { navigation.navigate('reportHistory') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={40} height={40} viewBox="0 0 48 48">
                              <Path d="M40,47H8a2,2,0,0,1-2-2V3A2,2,0,0,1,8,1H40a2,2,0,0,1,2,2V45A2,2,0,0,1,40,47ZM10,43H38V5H10Z"></Path>
                              <Path d="M15,19a2,2,0,0,1-1.41-3.41l4-4a2,2,0,0,1,2.31-.37l2.83,1.42,5-4.16A2,2,0,0,1,30.2,8.4l4,3a2,2,0,1,1-2.4,3.2l-2.73-2.05-4.79,4a2,2,0,0,1-2.17.25L19.4,15.43l-3,3A2,2,0,0,1,15,19Z"></Path>
                              <Circle cx="15" cy="24" r="2"></Circle>
                              <Circle cx="15" cy="31" r="2"></Circle>
                              <Circle cx="15" cy="38" r="2"></Circle>
                              <Path d="M33,26H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></Path>
                              <Path d="M33,33H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></Path>
                              <Path d="M33,40H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold', alignItems: 'center', alignContent: 'center', fontFamily: 'Epilogue-Variable' }} > Camara </Text>
                        </View>
                      </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>

                      <TouchableOpacity onPress={() => { navigation.navigate('vigilantesView') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                        <View style={styles.buttonCircle}>
                          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

                            <Svg fill="#000000" width={42} height={42} viewBox="0 0 48 48">
                              <Path d="M47,12a2,2,0,0,0-2-2H24a2,2,0,0,0,0,4H45A2,2,0,0,0,47,12Z"></Path>
                              <Path d="M3,14H8.35a6,6,0,1,0,0-4H3a2,2,0,0,0,0,4Zm11-4a2,2,0,1,1-2,2A2,2,0,0,1,14,10Z"></Path>
                              <Path d="M45,22H37.65a6,6,0,1,0,0,4H45a2,2,0,0,0,0-4ZM32,26a2,2,0,1,1,2-2A2,2,0,0,1,32,26Z"></Path>
                              <Path d="M22,22H3a2,2,0,0,0,0,4H22a2,2,0,0,0,0-4Z"></Path>
                              <Path d="M45,34H28a2,2,0,0,0,0,4H45a2,2,0,0,0,0-4Z"></Path>
                              <Path d="M18,30a6,6,0,0,0-5.65,4H3a2,2,0,0,0,0,4h9.35A6,6,0,1,0,18,30Zm0,8a2,2,0,1,1,2-2A2,2,0,0,1,18,38Z"></Path>
                            </Svg>
                          </View>
                        </View>

                        <View style={{ justifyContent: 'center', margin: 0 }}>
                          <Text style={{ fontSize: 13, padding: 0, fontWeight: 'bold', fontFamily: 'Epilogue-Variable' }} > Perfil </Text>
                        </View>
                      </TouchableOpacity>

                    </View>


                  </View>


                  <View style={{ alignContent: 'flex-start', flex: 1, width: 280, alignSelf: 'flex-start', paddingTop: 20, }}>
                    <TouchableOpacity style={{ padding: 15, borderRadius: 25, backgroundColor: '#F89A53' }}>
                      <Text style={styles.secondaryText}> No olvides marcar horario!</Text>
                    </TouchableOpacity>
                  </View>


                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>


                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('ChatScreen')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Ordenes Generales</Text>

                </TouchableOpacity>


              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>

                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadPresentismo')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Marcar Entrada</Text>

                </TouchableOpacity>


                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadSalida')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Marcar Salida</Text>

                </TouchableOpacity>


              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>

                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadPresentismo')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Reportar</Text>

                </TouchableOpacity>


                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadSalida')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Alerta</Text>

                </TouchableOpacity>


              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>


                <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadSalida')}>
                  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                  <Text style={styles.gridButtonText}>Alerta</Text>

                </TouchableOpacity>


              </View>

            </ScrollView>
          )}



        </ScrollView>
      )}

      {/* Modal para el menú desplegable */}
      <Modal visible={isMenuVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setIsMenuVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Atras</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Profile')} onPressOut={() => setIsMenuVisible(false)} >
            <Text style={styles.logoutButtonText} >Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Soporte Tecnico</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>


        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3780C3',
    fontFamily: 'Epilogue-Variable',
  },
  secondaryText: {
    fontFamily: 'Epilogue-Variable',
    color: 'white',
    fontSize: 15
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonCircle: {
    alignItems: 'center',
    width: 50,
    aspectRatio: 1,
    marginBottom: 5,
    borderRadius: 99999,
    justifyContent: 'center',
    borderColor: 'black',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatButton: {
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
    color: 'black',
  },
  logoutButtonText2: {
    color: 'black',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
  },

  gridButtonContainer: {
    borderRadius: 10,
    padding: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'space-around',
    flex: 1,
    shadowColor: '#F89A53', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento en la sombra (horizontal, vertical)
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 20, // Radio de la sombra
    elevation: 2,
  },
  gridButtonContainerButton: {
    borderRadius: 10,
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center', // Alinea los elementos de manera equitativa
    flex: 1,
    alignContent: 'center',
  },
  gridButtonContainerButtonV: {
    borderRadius: 5,
    height: 80,
    width: 'auto',
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'space-around', // Alinea los elementos de manera equitativa
    flex: 1,
  },
  gridButtonContainerButtonA: {
    borderRadius: 5,
    height: 80,
    width: 'auto',
    backgroundColor: 'red',
    marginBottom: 20,
    justifyContent: 'space-around', // Alinea los elementos de manera equitativa
    flex: 1,
  },
  gridButtonContainer2: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between', // Alinea los elementos de manera equitativa
    flexDirection: 'row'
  },
  logoutButton2: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalInContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    paddingRight: 15,
    marginBottom: 20,
    fontFamily: 'Epilogue-Variable',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 26,
  },
  ButtonList: {
    paddingBottom: 30,
  },
  gridButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    top: 32,
  },
  gridButtonInner: {
    marginBottom: 30,
  },
  largeButton: {
    backgroundColor: 'black',
  },
  smallButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  gridButtonText: {
    paddingTop: 10,
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable'
  },
  gridButtonText2: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable',
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutButtonText: {

    color: 'white',
    fontSize: 18,
    fontFamily: 'Epilogue-Variable',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 40,
    marginBottom: 20,

  },
  profileButton: {
    flex: 1,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 25,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 15
  },
  closeButtonText: {
    color: 'black',
    fontSize: 18,
    borderRadius: 25,
  },
  menuButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 25,
    paddingTop: 20
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',
  },
});

export default Home;