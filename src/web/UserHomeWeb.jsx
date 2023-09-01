import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, View, Button, Alert } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import Svg, { Path, Circle, ClipPath, Rect, G } from 'react-native-svg';




const UserHomeWeb = () => {
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
        // Aca empiezan todos los vigilantes
        <ScrollView showsVerticalScrollIndicator={false}>


            <View style={styles.topBar}>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                {/* {Navbar} */}
                <TouchableOpacity style={styles.navbar} stickyHeaderIndices={[0]} onPress={() => setIsMenuVisible(true)}>
                    <View style={styles.profileButton}>
                        <TouchableOpacity onPress={() => setIsMenuVisible(true)}>

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
                        ¡Bienvenido!
                    </Text>
                </TouchableOpacity>

                {/* Menu Horizontal */}

                <View style={{ justifyContent: 'center', alignContent: 'center' }}>

                    <View style={{ gap: 20, flexDirection: 'row'}}>

                        <TouchableOpacity style={styles.gridButtonContainerButtonR} onPress={() => navigation.navigate('FormWeb')}>

                            <View style={{ padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                <Svg
                                    width="132px"
                                    height="132px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="white"
                                >
                                    <G stroke="white" strokeWidth={1.5}>
                                        <Path d="M8 3.5A1.5 1.5 0 019.5 2h5A1.5 1.5 0 0116 3.5v1A1.5 1.5 0 0114.5 6h-5A1.5 1.5 0 018 4.5v-1z" />
                                        <Path
                                            d="M15 13h-3m0 0H9m3 0v-3m0 3v3M21 16c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877-.769.768-.865 1.946-.877 4.121"
                                            strokeLinecap="round"
                                        />
                                    </G>
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonTextR}>Reportar</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.alerta} onPress={() => navigation.navigate('Alerta')}>

                            <View style={{ padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                <Svg
                                    width="132px"
                                    height="132px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M6.31 9C8.594 5 9.967 3 12 3c2.31 0 3.77 2.587 6.688 7.761l.364.645c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572-.951-1.364-.163-3.165 1.648-6.428M12 8v5"
                                        stroke="white"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                    />
                                    <Circle cx={12} cy={16} r={1} fill="white" />
                                </Svg>

                            </View>
                            <Text style={styles.gridButtonTextA}>Alerta</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.gridButtonContainerButton} onPress={() => navigation.navigate('LoadPresentismo')}>

                            <View style={{ padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                
                                <Svg 
                                
                                    width="132px"
                                    height="132px"
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

                            <View style={{ padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="132px"
                                    height="132px"
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

                    <View style={{}}>

                        <TouchableOpacity style={styles.gridButtonContainerButtonC} onPress={() => navigation.navigate('ChatScreen')}>

                            <View style={{ padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                <Svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    height="128px"
                                    width="128px"

                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <G stroke="white" strokeWidth={1.5} strokeLinecap="round">
                                        <Path d="M20.628 9.094c1.248-3.745 1.873-5.618.884-6.606-.988-.989-2.86-.364-6.606.884L10.24 4.927M5.575 6.482c-2.082.694-3.123 1.041-3.439 1.804-.074.18-.12.37-.133.564-.059.824.717 1.6 2.269 3.151l.283.283c.254.254.382.382.478.523.19.28.297.607.31.945.008.171-.019.35-.072.705-.196 1.304-.294 1.956-.179 2.458.23 1 1.004 1.785 2 2.028.5.123 1.154.034 2.46-.143l.072-.01c.368-.05.552-.075.729-.064.32.019.63.124.898.303.147.098.279.23.541.492l.252.252c1.51 1.51 2.265 2.265 3.066 2.226.22-.011.438-.063.64-.152.734-.323 1.072-1.336 1.747-3.362l1.566-4.696M6 18l3.75-3.75M21 3l-8.5 8.5" />
                                    </G>
                                </Svg>

                            </View>

                            <Text style={styles.gridButtonTextA}>Ordenes</Text>

                        </TouchableOpacity>

                    </View>



                    <View style={{ gap: 20, flexDirection: 'row', flex: 1 }}>




                    </View>



                </View>

                <Modal visible={isMenuVisible} animationType="slide" transparent={true}>


                    <View style={styles.modalContainer}>

                        <TouchableOpacity onPress={() => setIsMenuVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Atras</Text>
                        </TouchableOpacity>

                        <View style={{}}>

                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} onPressOut={() => setIsMenuVisible(false)} >
                                <Text style={styles.buttonText} >Perfil</Text>
                            </TouchableOpacity>

                        </View>


                        <View>

                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} onPressOut={() => setIsMenuVisible(false)} >
                                <Text style={styles.buttonText} >Ayuda</Text>
                            </TouchableOpacity>

                        </View>

                        <View>

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Soporte Tecnico</Text>
                            </TouchableOpacity>

                        </View>

                        <View>

                            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                                <Text style={styles.buttonText}>Cerrar Sesión</Text>
                            </TouchableOpacity>

                        </View>









                    </View>
                </Modal>

            </ScrollView>
                            
                <View style={styles.footer}>
                    <Text style={styles.footerText}> IGS SYS | 2023 | Todos los derechos reservados
                    </Text>
                </View> 


        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 354,
        backgroundColor: '#3780C3',
        fontFamily: 'Epilogue-Variable',
    },
    footer: {
        backgroundColor: 'white',
        padding: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    footerText: {
        color: 'gray',
        textAlign: 'center',
    },
    footerLink: {
        color: 'blue',
        textDecorationLine: 'underline',
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
        backgroundColor: '#318ADB',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
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
    },
    button: {
        backgroundColor: '#F89A53',
        padding: 10,
        marginTop: 20,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Epilogue-Variable',
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

export default UserHomeWeb