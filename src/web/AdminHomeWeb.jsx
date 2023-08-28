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
    };

    console.log('ESTE ES EL COMPONENTE WEB')

    return (
        <View style={styles.container}>
            {/* Sidebar */}
            <View style={styles.sidebar}>

                <View style={styles.logo}>
                    <Svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <G stroke="#1C274C" strokeWidth={1.5}>
                            <Circle cx={12} cy={6} r={4} />
                            <Path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5z" />
                        </G>
                    </Svg>
                    <Text style={styles.logoText}>Hola, Jefe!</Text>
                </View>


                <ScrollView>
                    <TouchableOpacity>
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

                    <TouchableOpacity>                    
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

                    <TouchableOpacity>
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
                    
                    <TouchableOpacity>
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


                    <TouchableOpacity>
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


                    <TouchableOpacity>
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


                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navItemText}>Tu perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItemNoBorder}>
                        <Text style={styles.navItemText}>Cerrar Sesion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.navItem}>Privacidad</Text>
                        <Text style={styles.navItem}>Accesibilidad</Text>
                    </TouchableOpacity>
                    {/* Agrega más elementos de navegación según sea necesario */}
                </ScrollView>
            </View>

            {/* Contenido principal */}
            <View style={styles.mainPanel}>
                {/* Navbar */}
                <View style={styles.navbar}>
                    <Text style={styles.navbarBrand}>Inicio</Text>
                    {/* Agrega el botón de menú o icono de hamburguesa si es necesario */}
                </View>



                {/* Contenido */}
                <View style={styles.content}>

                    <View style={{ backgroundColor: 'red', height: '930px', width: '30%', borderRadius: 25,alignContent:'center' }}>


                        <View style={{ justifyContent: 'center', alignContent: 'center' }}>

                            <View style={{ backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignContent: 'center', paddingBottom: 20, gap: 30 }}>

                                <View horizontal style={{ flexDirection: 'row', padding: 15, alignItems: 'center', marginRight: 20 }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity style={styles.button}>
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
                                        <Text style={styles.buttonText}>Agregar Vigilador</Text>
                                    </View>

                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity style={styles.button}>
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
                                        <Text style={styles.buttonText}>Agregar Supervisor</Text>
                                    </View>


                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity style={styles.button}>
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
                                        <Text style={styles.buttonText}>Agregar Admin</Text>
                                    </View>


                                </View>




                            </View>
                            <View style={{ backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignContent: 'center', paddingBottom: 20, gap: 30, marginTop: 40, }}>

                                <View style={styles.button}>
                                    
                                <Text style={styles.buttonText}>
                                    Evalua el presentismo ahora!
                                </Text>
                               
                                </View>



                            </View>


                        </View>
                    </View>


                    <View style={{ backgroundColor: 'blue', height: '930px', width: '30%', borderRadius: 25 }}>
                        <View style={{ justifyContent: 'center', padding: 15 }}>
                            <CalendarScreen />
                        </View>
                    </View>


                </View>



                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>.
                    </Text>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#F89A53',
        padding: 10,
        marginTop: 20,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: 'white'
    },
    buttonText: {
        color: 'gray',
        fontSize: 10,
        fontFamily: 'Epilogue-Variable',
        alignSelf: 'center'

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
        backgroundColor: 'orange',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
        color: 'white'

    },
    navItem: {
        padding: 25,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,

    },
    navItemNoBorder: {
        padding: 25,
    },
    navItemText: {
        fontSize: '13px',
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
    },
    navbarBrand: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
        color: 'white'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#EDEDED',
        paddingTop: 68,
        flexDirection: 'row'
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