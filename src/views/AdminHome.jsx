import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, View, Button, Alert } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Svg, { Path, Circle, ClipPath, Rect, G } from 'react-native-svg';
import CalendarScreen from '../components/Calendar';


const AdminHome = () => {


    const navigation = useNavigation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserDisplayName, setCurrentUserDisplayName] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [loading, setLoading] = useState(true);

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
                setLoading(false); // Datos cargados, cambiar estado de isLoading

            });
        } else {
            console.log('No hay usuario autenticado.');
            setLoading(false);
        }


    },
        []);


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

        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.topBar}>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>



                {/* {Navbar} */}
                <TouchableOpacity style={styles.navbar} stickyHeaderIndices={[0]} onPress={() => setIsMenuVisible(true)}>
                    <View style={styles.profileButton}>
                        <TouchableOpacity onPress={() => setIsMenuVisible(true)}>

                            <Svg width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff">
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

                {/* Menu Horizontal */}

                <View horizontal>
                    <View style={styles.gridButtonContainer}>
                        <View style={styles.gridButtonContainer2}>
                            <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => { navigation.navigate('vigilantesView') }}>
                                    <View style={styles.buttonCircle}>
                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOffset: '30', shadowOpacity: 0.3, elevation: 1 }} >

                                            <Svg
                                                width="40px"
                                                height="40px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <G stroke="#1C274C" strokeWidth={1.5}>
                                                    <Path
                                                        d="M9 4.46A9.84 9.84 0 0112 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-4.182 0-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.465 14.465 0 015 6.821"
                                                        strokeLinecap="round"
                                                    />
                                                    <Path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </G>
                                            </Svg>


                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center', margin: 0 }}>
                                        <Text style={{ fontSize: 11, padding: 0, fontWeight: '600', alignItems: 'center', alignContent: 'center', fontFamily: 'Epilogue-Variable' }}  > Usuarios </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'center' }}>

                                <TouchableOpacity onPress={() => { navigation.navigate('reportHistory') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                                    <View style={styles.buttonCircle}>
                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOpacity: 0.3, elevation: 1 }} >
                                            <Svg
                                                width="40px"
                                                height="40px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <G stroke="#1C274C" strokeWidth={1.5} strokeLinecap="round">
                                                    <Path d="M11.777 10l4.83 1.294M11 12.898l2.898.776M20.312 12.647c-.605 2.255-.907 3.383-1.592 4.114a4 4 0 01-2.01 1.161c-.097.023-.195.04-.295.052-.915.113-2.032-.186-4.064-.73-2.255-.605-3.383-.907-4.114-1.592a4 4 0 01-1.161-2.011c-.228-.976.074-2.103.679-4.358l.517-1.932.244-.905c.455-1.666.761-2.583 1.348-3.21a4 4 0 012.01-1.16c.976-.228 2.104.074 4.36.679 2.254.604 3.382.906 4.113 1.59a4 4 0 011.161 2.012c.161.69.057 1.456-.231 2.643" />
                                                    <Path
                                                        d="M3.272 16.647c.604 2.255.907 3.383 1.592 4.114a4 4 0 002.01 1.161c.976.227 2.104-.075 4.36-.679 2.254-.604 3.382-.906 4.113-1.591a4 4 0 001.068-1.678M8.516 6.445c-.352.091-.739.195-1.165.31-2.255.604-3.383.906-4.114 1.59a4 4 0 00-1.161 2.012c-.161.69-.057 1.456.231 2.643"
                                                        strokeLinejoin="round"
                                                    />
                                                </G>
                                            </Svg>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'center', margin: 0 }}>
                                        <Text style={{ fontSize: 11, padding: 0, fontWeight: '600', alignItems: 'center', alignContent: 'center', fontFamily: 'Epilogue-Variable' }} > Reportes </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{ justifyContent: 'center' }}>

                                <TouchableOpacity onPress={() => { navigation.navigate('Empresas') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                                    <View style={styles.buttonCircle}>
                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOffset: '30', shadowOpacity: 0.3, elevation: 1 }} >
                                            <Svg
                                                width="40px"
                                                height="40px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <Path
                                                    d="M22 22H2"
                                                    stroke="#1C274C"
                                                    strokeWidth={1.5}
                                                    strokeLinecap="round"
                                                />
                                                <Path
                                                    d="M17 22V6c0-1.886 0-2.828-.586-3.414C15.828 2 14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586C7 3.172 7 4.114 7 6v16"
                                                    stroke="#1C274C"
                                                    strokeWidth={1.5}
                                                />
                                                <Path
                                                    d="M12 22v-3M10 12h4M5.5 11H7M5.5 14H7M17 11h1.5M17 14h1.5M5.5 8H7M17 8h1.5"
                                                    stroke="#1C274C"
                                                    strokeWidth={1.5}
                                                    strokeLinecap="round"
                                                />
                                                <Circle cx={12} cy={7} r={2} stroke="#1C274C" strokeWidth={1.5} />
                                                <Path
                                                    d="M20.25 11.5a.75.75 0 001.5 0h-1.5zm-.139-3.163l-.416.624.416-.624zm.552.552l-.624.417.624-.417zM21.75 15.5a.75.75 0 00-1.5 0h1.5zM17.5 8.75c.718 0 1.2 0 1.567.038.355.036.519.1.628.173l.833-1.248c-.396-.264-.835-.369-1.309-.417-.461-.047-1.032-.046-1.719-.046v1.5zm4.25 2.75c0-.687 0-1.258-.046-1.719-.048-.473-.153-.913-.418-1.309l-1.247.834c.073.108.137.272.173.627.037.367.038.85.038 1.567h1.5zm-2.055-2.54c.136.092.253.209.344.346l1.247-.834c-.2-.3-.458-.558-.758-.759l-.833 1.248zm.555 6.54V22h1.5v-6.5h-1.5zM3.889 8.337l.417.624-.417-.624zm-.552.552l.624.417-.624-.417zM3.75 20a.75.75 0 00-1.5 0h1.5zm-1.5-4a.75.75 0 001.5 0h-1.5zM6.5 7.25c-.687 0-1.258 0-1.719.046-.473.048-.913.153-1.309.417l.834 1.248c.108-.073.272-.137.627-.173.367-.037.85-.038 1.567-.038v-1.5zM3.75 11.5c0-.718 0-1.2.038-1.567.036-.355.1-.519.173-.627l-1.248-.834c-.264.396-.369.836-.417 1.309-.047.461-.046 1.032-.046 1.719h1.5zm-.278-3.787c-.3.201-.558.459-.759.76l1.248.833a1.25 1.25 0 01.345-.345l-.834-1.248zM2.25 20v2h1.5v-2h-1.5zm0-8.5V16h1.5v-4.5h-1.5z"
                                                    fill="#1C274C"
                                                />
                                                <Path
                                                    d="M10 15h.5m3.5 0h-1.5"
                                                    stroke="#1C274C"
                                                    strokeWidth={1.5}
                                                    strokeLinecap="round"
                                                />
                                            </Svg>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'center', margin: 0 }}>
                                        <Text style={{ fontSize: 11, padding: 0, fontWeight: '600', alignItems: 'center', alignContent: 'center', fontFamily: 'Epilogue-Variable' }}  > Empresas </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{ justifyContent: 'center' }}>

                                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontFamily: 'Epilogue-Variable' }} >
                                    <View style={styles.buttonCircle}>
                                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOffset: '30', shadowOpacity: 0.3, elevation: 1 }} >
                                            <Svg
                                                width="40px"
                                                height="40px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <G stroke="#1C274C" strokeWidth={1.5}>
                                                    <Circle cx={12} cy={9} r={3} />
                                                    <Path
                                                        d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
                                                        strokeLinecap="round"
                                                    />
                                                    <Path
                                                        d="M7 3.338A9.954 9.954 0 0112 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
                                                        strokeLinecap="round"
                                                    />
                                                </G>
                                            </Svg>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'center', margin: 0 }}>
                                        <Text style={{ fontSize: 11, padding: 0, fontWeight: '600', alignItems: 'center', alignContent: 'center', fontFamily: 'Epilogue-Variable' }}  > Perfil </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>


                        <View style={{ alignContent: 'flex-start', flex: 1, width: 280, alignSelf: 'flex-start', paddingTop: 20, shadowColor: '#004764', shadowOffset: '30', shadowOpacity: 0.9 }}>
                            <TouchableOpacity style={{ padding: 15, borderRadius: 25, backgroundColor: '#F89A53', }} onPress={() => { navigation.navigate('CalendarView') }}>
                                <Text style={styles.secondaryText}> Evalúa el presentismo ahora!</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>


                <View style={{ justifyContent: 'center', alignContent: 'center' }}>

                    <View style={{ gap: 30, flexDirection: 'row', flex: 1, }}>

                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('Register')}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5}>
                                        <Circle cx={10} cy={6} r={4} />
                                        <Path
                                            d="M21 10h-2m0 0h-2m2 0V8m0 2v2M17.997 18c.003-.164.003-.331.003-.5 0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S2 22 10 22c2.231 0 3.84-.157 5-.437"
                                            strokeLinecap="round"
                                        />
                                    </G>
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonText}>Agregar Vigilante</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('AddAdmin')}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5}>
                                        <Path d="M17 6c0-1.886 0-2.828-.586-3.414C15.828 2 14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586C7 3.172 7 4.114 7 6M11.146 11.023c.38-.682.57-1.023.854-1.023.284 0 .474.34.854 1.023l.098.176c.108.194.162.29.246.354.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532.088.283-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354-.032.104-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352-.23.174-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.135-.399-.135-.104 0-.202.045-.399.135l-.178.082c-.691.319-1.037.477-1.267.303-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438-.032-.103-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135.084-.064.138-.16.246-.354l.098-.176z" />
                                        <Path
                                            d="M15.578 20.211c-1.756.878-2.634 1.317-3.578 1.317s-1.822-.439-3.578-1.317c-2.151-1.076-3.227-1.614-3.825-2.58C4 16.664 4 15.46 4 13.056V12c0-2.828 0-4.243.879-5.121C5.757 6 7.172 6 10 6h4c2.828 0 4.243 0 5.121.879C20 7.757 20 9.172 20 12v1.056c0 2.405 0 3.608-.597 4.575a3.078 3.078 0 01-.403.517"
                                            strokeLinecap="round"
                                        />
                                    </G>
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonText}>Agregar Admin</Text>

                        </TouchableOpacity>

                    </View>


                    <View style={{ gap: 30, flexDirection: 'row', flex: 1 }}>

                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('addSupervisor')}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5}>
                                        <Path
                                            d="M22 15c0 3.771 0 4.657-1.172 5.828C19.657 22 17.771 22 14 22M10 2C6.229 2 4.343 2 3.172 3.172 2 4.343 2 5.229 2 9M12 7C9.073 7 7.08 8.562 5.892 9.94 5.297 10.63 5 10.975 5 12c0 1.025.297 1.37.892 2.06C7.08 15.438 9.072 17 12 17c2.927 0 4.92-1.562 6.108-2.94.595-.69.892-1.035.892-2.06 0-1.025-.297-1.37-.892-2.06A9.067 9.067 0 0016 8.125"
                                            strokeLinecap="round"
                                        />
                                        <Circle cx={12} cy={12} r={2} />
                                        <Path
                                            d="M10 22H9m-7-7c0 3.771 0 4.657 1.172 5.828.653.654 1.528.943 2.828 1.07M14 2h1m7 7c0-3.771 0-4.657-1.172-5.828-.653-.654-1.528-.943-2.828-1.07"
                                            strokeLinecap="round"
                                        />
                                    </G>
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonText}>Agregar Supervisor</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('addCompany')}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M22 22H2"
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                    />
                                    <Path
                                        d="M17 22V6c0-1.886 0-2.828-.586-3.414C15.828 2 14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586C7 3.172 7 4.114 7 6v16"
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                    />
                                    <Path
                                        d="M12 22v-3M10 12h4M5.5 11H7M5.5 14H7M17 11h1.5M17 14h1.5M5.5 8H7M17 8h1.5"
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                    />
                                    <Path
                                        d="M12 9V5M14 7h-4"
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <Path
                                        d="M20.25 8.5a.75.75 0 001.5 0h-1.5zm-.139-3.163l-.416.624.416-.624zm.552.552l-.624.417.624-.417zM21.75 12.5a.75.75 0 00-1.5 0h1.5zM17.5 5.75c.718 0 1.2 0 1.567.038.355.036.519.1.628.173l.833-1.248c-.396-.264-.835-.369-1.309-.417-.461-.047-1.032-.046-1.719-.046v1.5zm4.25 2.75c0-.687 0-1.258-.046-1.719-.048-.473-.153-.913-.418-1.309l-1.247.834c.073.108.137.272.173.627.037.367.038.85.038 1.567h1.5zm-2.055-2.54c.136.092.253.21.344.346l1.247-.834c-.2-.3-.458-.558-.758-.759l-.833 1.248zm.555 6.54V22h1.5v-9.5h-1.5zM3.889 5.337l.417.624-.417-.624zm-.552.552l.624.417-.624-.417zM3.75 17a.75.75 0 00-1.5 0h1.5zm-1.5-4a.75.75 0 001.5 0h-1.5zM6.5 4.25c-.687 0-1.258 0-1.719.046-.473.048-.913.153-1.309.417l.834 1.248c.108-.073.272-.137.627-.173.367-.037.85-.038 1.567-.038v-1.5zM3.75 8.5c0-.718 0-1.2.038-1.567.036-.355.1-.519.173-.627l-1.248-.834c-.264.396-.369.836-.417 1.309-.047.461-.046 1.032-.046 1.719h1.5zm-.278-3.787c-.3.201-.558.459-.759.76l1.248.833a1.25 1.25 0 01.345-.345l-.834-1.248zM2.25 17v5h1.5v-5h-1.5zm0-8.5V13h1.5V8.5h-1.5z"
                                        fill="#1C274C"
                                    />
                                    <Path
                                        d="M10 15h.5m3.5 0h-1.5"
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                    />
                                </Svg>
                            </View>
                            <Text style={styles.gridButtonText}>Agregar Empresa</Text>

                        </TouchableOpacity>


                    </View>


                    <View style={{ gap: 30, flexDirection: 'row', flex: 1 }}>

                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('ChatScreen')}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5} strokeLinecap="round">
                                        <Path d="M20.628 9.094c1.248-3.745 1.873-5.618.884-6.606-.988-.989-2.86-.364-6.606.884L10.24 4.927M5.575 6.482c-2.082.694-3.123 1.041-3.439 1.804-.074.18-.12.37-.133.564-.059.824.717 1.6 2.269 3.151l.283.283c.254.254.382.382.478.523.19.28.297.607.31.945.008.171-.019.35-.072.705-.196 1.304-.294 1.956-.179 2.458.23 1 1.004 1.785 2 2.028.5.123 1.154.034 2.46-.143l.072-.01c.368-.05.552-.075.729-.064.32.019.63.124.898.303.147.098.279.23.541.492l.252.252c1.51 1.51 2.265 2.265 3.066 2.226.22-.011.438-.063.64-.152.734-.323 1.072-1.336 1.747-3.362l1.566-4.696M6 18l3.75-3.75M21 3l-8.5 8.5" />
                                    </G>
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonText}>Ordenes</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => { navigation.navigate('CalendarView') }}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5} strokeLinecap="round">
                                        <Path d="M21 7v-.63c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 00-1.881-1.937C18.493 2 17.914 2 16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 00-1.881 1.936C3 4.581 3 5.177 3 6.37V15m18-4v9.374c0 .858-.985 1.314-1.608.744a.946.946 0 00-1.284 0l-.483.442a1.657 1.657 0 01-2.25 0 1.657 1.657 0 00-2.25 0 1.657 1.657 0 01-2.25 0 1.657 1.657 0 00-2.25 0 1.657 1.657 0 01-2.25 0l-.483-.442a.946.946 0 00-1.284 0c-.623.57-1.608.114-1.608-.744V19" />
                                        <Path d="M9.5 10.4l1.429 1.6L14.5 8" strokeLinejoin="round" />
                                        <Path d="M7.5 15.5H9m7.5 0H12" />
                                    </G>
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonText}>Presentismo</Text>

                        </TouchableOpacity>

                    </View>



                    <View style={{ gap: 30, flexDirection: 'row', flex: 1 }}>

                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadPresentismo')}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M12 4.5l5 5m-5-5l-5 5m5-5V11m0 3.5c0 1.667-1 5-5 5"
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonText}>Marcar entrada</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadSalida')}>

                            <View style={{ padding: 15 }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M12 19.5l5-5m-5 5l-5-5m5 5V13m0-3.5c0-1.667-1-5-5-5"
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                            </View>
                            <Text style={styles.gridButtonText}>Marcar salida</Text>

                        </TouchableOpacity>


                    </View>



                </View>

                <View>

                    <View style={styles.gridButtonContainer}>

                        <CalendarScreen />

                    </View>
                </View>

                <Modal visible={isMenuVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>

                        <TouchableOpacity onPress={() => setIsMenuVisible(false)} style={styles.button2}>
                            <Text style={styles.buttonText}>Atrás</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} onPressOut={() => setIsMenuVisible(false)} >
                            <Text style={styles.buttonText} >Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Soporte Tecnico</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogout} style={styles.button}>
                            <Text style={styles.buttonText}>Cerrar Sesión</Text>
                        </TouchableOpacity>


                    </View>
                </Modal>




            </ScrollView>


        </ScrollView>



    )
}


const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 80,
        backgroundColor: '#3780C3',
        fontFamily: 'Epilogue-Variable',
    },
    navText: {
        fontSize: 11, padding: 0, fontWeight: '600', alignItems: 'center', alignContent: 'center', fontFamily: 'Epilogue-Variable'
    },
    alerta: {
        borderRadius: 10,
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white',
        marginBottom: 20,
        justifyContent: 'center', // Alinea los elementos de manera equitativa
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#C22626'

    },
    topBar: {
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        width: 1000,
        backgroundColor: '#318ADB',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        fontFamily: 'Epilogue-Variable',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: '#318ADB',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white',
        shadowOffset: '30',
        shadowOpacity: 0.9,
        elevation: 1

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
        fontFamily: 'Epilogue-Variable',
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
        fontFamily: 'Epilogue-Variable',
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
    gridButtonContainerButtonC: {
        borderRadius: 10,
        padding: 20,
        paddingTop: 20,
        backgroundColor: '#F89A53',
        marginBottom: 20,
        justifyContent: 'center', // Alinea los elementos de manera equitativa
        flex: 1,
        alignContent: 'center',
    },
    gridButtonContainerButtonR: {
        borderRadius: 10,
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white',
        marginBottom: 20,
        justifyContent: 'center', // Alinea los elementos de manera equitativa
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#CBA41C'
    },
    gridButtonContainerAlert: {

        borderRadius: 10,
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'red',
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
        flex: 1,
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
        fontFamily: 'Epilogue-Variable',
        paddingBottom: 10
    },
    gridButtonTextA: {
        paddingTop: 10,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Epilogue-Variable',
        paddingBottom: 10
    },
    gridButtonTextR: {
        paddingTop: 10,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Epilogue-Variable',
        paddingBottom: 10

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
        marginTop: 20,
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 15,
        borderRadius: 25,
        fontFamily: 'Epilogue-Variable',
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 15,
        width: 150,

    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Epilogue-Variable',

    },
    button2: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 15,
        position: 'absolute',
        top: 80,
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
        fontFamily: 'Epilogue-Variable',
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
export default AdminHome