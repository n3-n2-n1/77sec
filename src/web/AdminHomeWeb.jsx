import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, View, Button, Alert, Touchable } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import LoadingScreen from '../views/LoadingScreen';
import Svg, { Path, Circle, ClipPath, Rect, G } from 'react-native-svg';
import CalendarScreen from '../components/Calendar';
import { Image } from 'react-native-svg';
import { Calendar } from 'react-native-calendars';

const AdminHomeWeb = () => {


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

            navigation.navigate('Login')
    };

    console.log('ESTE ES EL COMPONENTE WEB')

    return (
        <View style={styles.container} >
            {/* Sidebar */}
            <View style={styles.sidebar}>


                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.logo}>
                        <Svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#1C274C"
                        >
                            <G
                                stroke="white"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <Path
                                    d="M12.12 12.78a.963.963 0 00-.24 0 3.269 3.269 0 01-3.16-3.27c0-1.81 1.46-3.28 3.28-3.28a3.276 3.276 0 01.12 6.55z"
                                />
                                <Path
                                    d="M18.74 19.38A9.934 9.934 0 0112 22c-2.6 0-4.96-.99-6.74-2.62.1-.94.7-1.86 1.77-2.58 2.74-1.82 7.22-1.82 9.94 0 1.07.72 1.67 1.64 1.77 2.58z"
                                />
                                <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            </G>
                        </Svg>
                        <Text style={styles.logoText}>Hola, Jefe!</Text>
                    </View>
                </TouchableOpacity>


                <ScrollView>



                    <TouchableOpacity onPress={() => navigation.navigate('AdminHomeWeb')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomColor: '#ccc', borderBottomWidth: 1, gap: 30 }}>

                            <TouchableOpacity>

                                <Svg
                                    width="26px"
                                    height="26px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5}>
                                        <Path
                                            d="M22 22H2M2 11l8.126-6.5a3 3 0 013.748 0L22 11M15.5 5.5v-2A.5.5 0 0116 3h2.5a.5.5 0 01.5.5v5M4 22V9.5M20 22V9.5"
                                            strokeLinecap="round"
                                        />
                                        <Path d="M15 22v-5c0-1.414 0-2.121-.44-2.56C14.122 14 13.415 14 12 14c-1.414 0-2.121 0-2.56.44C9 14.878 9 15.585 9 17v5M14 9.5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </G>
                                </Svg>

                            </TouchableOpacity>

                            <Text style={styles.navItemText}>Inicio</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('vigilantesView')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomColor: '#ccc', borderBottomWidth: 1, gap: 30 }}>

                            <TouchableOpacity>
                                <Svg
                                    width="26px"
                                    height="26px"
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
                            </TouchableOpacity>
                            <Text style={styles.navItemText}>Usuarios</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Empresas')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomColor: '#ccc', borderBottomWidth: 1, gap: 30 }}>

                            <TouchableOpacity>
                                <Svg
                                    width="26px"
                                    height="26px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5}>
                                        <Path d="M22 22H2" strokeLinecap="round" />
                                        <Path d="M17 22V6c0-1.886 0-2.828-.586-3.414C15.828 2 14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586C7 3.172 7 4.114 7 6v16M21 22V8.5c0-1.404 0-2.107-.337-2.611a2 2 0 00-.552-.552C19.607 5 18.904 5 17.5 5M3 22V8.5c0-1.404 0-2.107.337-2.611a2 2 0 01.552-.552C4.393 5 5.096 5 6.5 5" />
                                        <Path
                                            d="M12 22v-3M10 12h4M5.5 11H7M5.5 14H7M17 11h1.5M17 14h1.5M5.5 8H7M17 8h1.5M10 15h4"
                                            strokeLinecap="round"
                                        />
                                        <Circle cx={12} cy={7} r={2} />
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.navItemText}>Empresas</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AlertaView')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomColor: '#ccc', borderBottomWidth: 1, gap: 30 }}>

                            <TouchableOpacity>
                                <Svg
                                    width="26px"
                                    height="26px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5}>
                                        <Path
                                            d="M16.243 16.243a6 6 0 10-8.485 0M19.071 19.071A9.97 9.97 0 0022 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.969 9.969 0 002.929 7.071"
                                            strokeLinecap="round"
                                        />
                                        <Circle cx={12} cy={12} r={2} />
                                        <Path d="M9.887 17.344c.96-.876 1.44-1.314 2.032-1.342.054-.003.108-.003.162 0 .593.028 1.072.466 2.032 1.342 2.087 1.906 3.13 2.858 2.839 3.68a1.34 1.34 0 01-.094.206c-.43.77-1.906.77-4.858.77s-4.428 0-4.858-.77a1.345 1.345 0 01-.094-.206c-.292-.822.752-1.774 2.84-3.68z" />
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.navItemText}>Alertas</Text>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate('CalendarView')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomColor: '#ccc', borderBottomWidth: 1, gap: 30 }}>

                            <TouchableOpacity>
                                <Svg
                                    width="26px"
                                    height="26px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5} strokeLinecap="round">
                                        <Path d="M2 12h7.5M22 12h-7.5M20 15.684C20 19 17.735 22 16 22c-2.268 0-3.928-3.158-3.928-10 0-6.842-1.66-10-3.928-10-1.734 0-4 3-4 6.316" />
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.navItemText}>Presentismo</Text>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomColor: '#ccc', borderBottomWidth: 1, gap: 30 }}>

                            <TouchableOpacity>
                                <Svg
                                    width="26px"
                                    height="26px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5} strokeLinecap="round">
                                        <Path d="M20.628 9.094c1.248-3.745 1.873-5.618.884-6.606-.988-.989-2.86-.364-6.606.884L10.24 4.927M5.575 6.482c-2.082.694-3.123 1.041-3.439 1.804-.074.18-.12.37-.133.564-.059.824.717 1.6 2.269 3.151l.283.283c.254.254.382.382.478.523.19.28.297.607.31.945.008.171-.019.35-.072.705-.196 1.304-.294 1.956-.179 2.458.23 1 1.004 1.785 2 2.028.5.123 1.154.034 2.46-.143l.072-.01c.368-.05.552-.075.729-.064.32.019.63.124.898.303.147.098.279.23.541.492l.252.252c1.51 1.51 2.265 2.265 3.066 2.226.22-.011.438-.063.64-.152.734-.323 1.072-1.336 1.747-3.362l1.566-4.696M6 18l3.75-3.75M21 3l-8.5 8.5" />
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.navItemText}>Chat</Text>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 25, paddingTop: 25, gap: 30 }}>

                            <TouchableOpacity>
                                <Svg
                                    width="26px"
                                    height="26px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="#1C274C"
                                >
                                    <G
                                        stroke="#1C274C"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <Path
                                            d="M12.12 12.78a.963.963 0 00-.24 0 3.269 3.269 0 01-3.16-3.27c0-1.81 1.46-3.28 3.28-3.28a3.276 3.276 0 01.12 6.55z"
                                        />
                                        <Path
                                            d="M18.74 19.38A9.934 9.934 0 0112 22c-2.6 0-4.96-.99-6.74-2.62.1-.94.7-1.86 1.77-2.58 2.74-1.82 7.22-1.82 9.94 0 1.07.72 1.67 1.64 1.77 2.58z"
                                        />
                                        <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.navItemText}>Tu perfil</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomColor: '#ccc', borderBottomWidth: 1, gap: 30 }}>

                            <TouchableOpacity>
                                <Svg
                                    width="26px"
                                    height="26px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="#1C274C" strokeWidth={1.5} strokeLinecap="round">
                                        <Path d="M15 12H6m0 0l2 2m-2-2l2-2" strokeLinejoin="round" />
                                        <Path d="M12 21.983c-1.553-.047-2.48-.22-3.121-.862-.769-.768-.865-1.946-.877-4.121M16 21.998c2.175-.012 3.353-.108 4.121-.877C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2h-1c-2.829 0-4.243 0-5.121.879-.769.768-.865 1.946-.877 4.121M3 9.5v5c0 2.357 0 3.535.732 4.268.732.732 1.911.732 4.268.732M3.732 5.232C4.464 4.5 5.643 4.5 8 4.5" />
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.navItemText}>Cerrar Sesion</Text>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity>

                        <Text style={styles.navItem2}>Accesibilidad</Text>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <Text style={styles.navItem3}>Privacidad</Text>

                    </TouchableOpacity>

                    {/* Agrega más elementos de navegación según sea necesario */}
                </ScrollView>

            </View>

            {/* Contenido principal */}
            <ScrollView style={styles.mainPanel} scrollbarStyle={{ borderRadius: 10 }} >
                {/* Navbar */}
                <View style={styles.navbar}>

                    <View style={styles.navbarBrand}>
                        <Text style={{ fontSize: 15.5, padding: 2, fontWeight: 'bold', color: 'white', fontFamily:'Epilogue-Variable' }}>Inicio</Text>
                    </View>

                    <View style={{ paddingRight: 10 }}>
                        <Svg
                            width="34px"
                            height="34px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M11.726 7.34a.75.75 0 00-.052-1.499l.052 1.5zm-4.568 4.222l-.75.023.002.026.748-.049zm-1.28 3.417l.49.568a.716.716 0 00.039-.036l-.529-.532zm-.438.363l.44.607a.778.778 0 00.036-.028l-.476-.579zm4.31 2.408a.75.75 0 000-1.5v1.5zm1.976-11.909a.75.75 0 00-.052 1.5l.052-1.5zm4.515 5.721l.749.05.001-.027-.75-.023zm1.28 3.416l-.528.532a.78.78 0 00.04.036l.489-.568zm.44.363l-.477.579c.011.01.023.019.035.027l.442-.606zm-4.311.909a.75.75 0 000 1.5v-1.5zm-2.7-9.659a.75.75 0 001.5 0h-1.5zM12.45 5a.75.75 0 00-1.5 0h1.5zm-2.7 11.25a.75.75 0 000 1.5v-1.5zm3.9 1.5a.75.75 0 000-1.5v1.5zM10.5 17A.75.75 0 009 17h1.5zm3.9 0a.75.75 0 00-1.5 0h1.5zM11.674 5.841c-3.022.104-5.359 2.691-5.265 5.744l1.5-.046c-.07-2.263 1.656-4.124 3.817-4.198l-.052-1.5zm-5.264 5.77a3.66 3.66 0 01-1.06 2.836l1.057 1.064a5.16 5.16 0 001.5-3.998l-1.497.098zm-1.021 2.8c-.157.135-.289.239-.426.352l.953 1.158c.11-.09.279-.225.452-.374l-.98-1.136zm-.39.324a2.25 2.25 0 00-.567.627 1.953 1.953 0 00-.305.909c-.02.386.113.815.508 1.117.354.27.82.362 1.312.362v-1.5c-.163 0-.27-.016-.337-.033-.066-.017-.078-.03-.063-.02a.22.22 0 01.063.087c.016.039.015.064.015.063 0-.003.002-.024.016-.063a.935.935 0 01.164-.264.515.515 0 01.075-.071L5 14.735zm.948 3.015H9.75v-1.5H5.947v1.5zm5.727-10.41c2.161.075 3.887 1.936 3.818 4.199l1.5.046c.093-3.053-2.244-5.64-5.266-5.744l-.052 1.5zm3.82 4.173a5.16 5.16 0 001.5 3.997l1.056-1.064a3.66 3.66 0 01-1.06-2.835l-1.497-.098zm1.538 4.033c.173.15.342.283.452.374l.953-1.158c-.137-.113-.269-.217-.426-.352l-.979 1.136zm.487.401c.014.01.04.033.076.072a.955.955 0 01.165.266c.015.04.017.06.017.064 0 0-.001-.025.015-.065a.22.22 0 01.064-.087c.014-.011.002.003-.064.02a1.409 1.409 0 01-.339.033v1.5c.494 0 .96-.091 1.314-.361a1.29 1.29 0 00.508-1.12 1.957 1.957 0 00-.307-.909 2.264 2.264 0 00-.566-.625l-.883 1.212zm-.066.303H13.65v1.5h3.803v-1.5zM12.45 6.591V5h-1.5v1.591h1.5zM9.75 17.75h3.9v-1.5h-3.9v1.5zM9 17c0 1.5 1.191 2.75 2.7 2.75v-1.5c-.645 0-1.2-.542-1.2-1.25H9zm2.7 2.75c1.509 0 2.7-1.25 2.7-2.75h-1.5c0 .708-.555 1.25-1.2 1.25v1.5z"
                                fill="white"
                            />
                        </Svg>
                    </View>
                    {/* Agrega el botón de menú o icono de hamburguesa si es necesario */}
                </View>



                {/* Contenido */}
                <View style={styles.content} >

                    <View style={{ height: '768px', width: '25%', borderRadius: 25, alignContent: 'center', flexDirection: 'column', gap: 10 }}>


                        <View style={{ justifyContent: 'center', alignContent: 'center' }}>



                            <View style={{ backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'column', padding: 15, alignItems: 'center', justifyContent: 'center' }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                                                    <Svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        width='40px'
                                                        height='40px'
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonText}>Agregar Vigilante</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'column', padding: 15, alignItems: 'center', justifyContent: 'center' }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('addSupervisor')}>
                                                    <Svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        width="40px"
                                                        height="40px"
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonText}>Agregar Supervisor</Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'column', padding: 15, alignItems: 'center', justifyContent: 'center' }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('addCompany')}>
                                                    <Svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        width='40px'
                                                        height='40px'
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonText}>Agregar Empresa</Text>
                                        </View>
                                    </View>
                                </View>



                            </View>


                            <View style={{ backgroundColor: 'white', borderBottomRightRadius: 25, borderBottomLeftRadius: 25, paddingBottom: 20, justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>


                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'column', padding: 15, alignItems: 'center', justifyContent: 'center' }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('reportHistory')}>
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonText}>Reportes</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'column', padding: 15, paddingHorizontal: 33, alignItems: 'center', justifyContent: 'center', }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CalendarView')}>

                                                    <Svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        height='40px'
                                                        width='40px'
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <G stroke="#1C274C" strokeWidth={1.5} strokeLinecap="round">
                                                            <Path d="M21 7v-.63c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 00-1.881-1.937C18.493 2 17.914 2 16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 00-1.881 1.936C3 4.581 3 5.177 3 6.37V15m18-4v9.374c0 .858-.985 1.314-1.608.744a.946.946 0 00-1.284 0l-.483.442a1.657 1.657 0 01-2.25 0 1.657 1.657 0 00-2.25 0 1.657 1.657 0 01-2.25 0 1.657 1.657 0 00-2.25 0 1.657 1.657 0 01-2.25 0l-.483-.442a.946.946 0 00-1.284 0c-.623.57-1.608.114-1.608-.744V19" />
                                                            <Path d="M9.5 10.4l1.429 1.6L14.5 8" strokeLinejoin="round" />
                                                            <Path d="M7.5 15.5H9m7.5 0H12" />
                                                        </G>
                                                    </Svg>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonText}>Presentismo</Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'column', padding: 15, alignItems: 'center', justifyContent: 'center' }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('vigilantesView')}>
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonText}>Editar Vigilante</Text>
                                        </View>
                                    </View>
                                </View>


                            </View>



                        </View>


                        <TouchableOpacity onPress={() => navigation.navigate('reportHistory')}>
                            <View style={{ backgroundColor: 'white', borderRadius: 25, justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button}>
                                                    <Svg
                                                        width="60px"
                                                        height="60px"
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonTextAction}> | Reportes</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigation.navigate('LoadPresentismo')}>
                            <View style={{ backgroundColor: 'white', borderRadius: 25, justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button}>
                                                    <Svg

                                                        width="60px"
                                                        height="60px"
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonTextAction}>| Marcar Entrada</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('LoadSalida')}>
                            <View style={{ backgroundColor: 'white', borderRadius: 25, justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button}>
                                                    <Svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        width="60px"
                                                        height="60px"
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
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonTextAction}>| Marcar Salida</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('AddAdmin')}>
                            <View style={{ backgroundColor: 'white', borderRadius: 25, justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>


                                        <View style={{ flexDirection: 'column', paddingRight: 0, }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button}>
                                                <Svg
                                                    width="60px"
                                                    height="60px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                    <G stroke="#1C274C" strokeWidth={1.5}>
                                                        <Circle cx={11} cy={6} r={4} />
                                                        <Path
                                                        d="M17 10.3l1.333 1.2L21 8.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        />
                                                        <Path
                                                        d="M18.997 18c.003-.164.003-.331.003-.5 0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S3 22 11 22c2.231 0 3.84-.157 5-.437"
                                                        strokeLinecap="round"
                                                        />
                                                    </G>
                                                </Svg>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.buttonTextAction}> | Agregar Administrador</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>



                    </View>


                    <View style={{ backgroundColor: 'white', height: '768px', width: '30%', borderRadius: 25 }}>
                        <View style={{ padding: 15 }}>

                            <View style={{ padding: 15 }}>
                                <Text style={styles.buttonTextAction}>
                                    Presentismo
                                </Text>
                            </View>

                            <View>
                                <CalendarScreen />
                            </View>

                        </View>
                    </View>


                </View>


                <View style={styles.footer}>
                    <Text style={styles.footerText}> IGS SYS | 2023 | Todos los derechos reservados
                    </Text>
                </View>

            </ScrollView>


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#318ADB'

    },
    button: {
        padding: 8,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: 'white'
    },
    buttonText: {
        color: 'gray',
        paddingTop: 5,
        fontSize: 10,
        fontFamily: 'Epilogue-Variable',
        alignSelf: 'center'

    },
    buttonTextAction: {
        color: 'gray',
        paddingTop: 5,
        fontSize: 20,
        fontFamily: 'Epilogue-Variable',

    },
    sidebar: {
        width: 250,
        backgroundColor: '#EDEDED',
        borderRightWidth: 0.5,
        borderRightColor: '#ccc'

    },
    sidebarBackground: {
        width: '100%',
        height: 150,
    },
    logo: {
        padding: 10,
        backgroundColor: '#004764',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 12,
        color: 'white',
        fontFamily: 'Epilogue-Variable',

    },
    navItem: {
        padding: 25,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontFamily: 'Epilogue-Variable',


    },
    navItem2: {
        padding: 5,
        paddingLeft: 25,
        borderBottomColor: '#ccc',
        fontFamily: 'Epilogue-Variable',
        fontSize: 12,
        paddingTop: 20,
        color: '#318ADB'

    },
    navItem3: {
        padding: 5,
        paddingLeft: 25,
        borderBottomColor: '#ccc',
        fontFamily: 'Epilogue-Variable',
        fontSize: 12,
        color: '#318ADB'


    },
    navItemNoBorder: {
        padding: 25,
    },
    navItemText: {
        fontSize: 13,
        fontFamily: 'Epilogue-Variable',
    },
    mainPanel: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        fontFamily: 'Epilogue-Variable',
    },
    navbarBrand: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        paddingLeft: 30,
        color: 'white',
        fontFamily: 'Epilogue-Variable',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#EDEDED',
        paddingTop: 68,
        paddingBottom: 105,
        flexDirection: 'row',
        gap: 15,
    },
    footer: {
        backgroundColor: 'white',
        padding: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    footerText: {
        textAlign: 'center',
    },
    footerLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});


export default AdminHomeWeb