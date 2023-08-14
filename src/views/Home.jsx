import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, View, Button, Alert } from 'react-native';
import firebase from '../database/firebaseC';
import 'firebase/compat/auth'
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Svg, { Path, Circle, ClipPath, Rect } from 'react-native-svg';



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
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          
          <LoadingScreen />

        </View>
      ) : (
        <ScrollView>

          <View style={styles.navbar} stickyHeaderIndices={[0]}>
            <Text style={styles.title}>
              ¡Bienvenido, {currentUserDisplayName ? currentUserDisplayName.charAt(0).toUpperCase() + currentUserDisplayName.slice(1) : 'Invitado'}!
            </Text>


            <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
              {/* Replace "Perfil" text with SVG */}
              <Svg width={30} height={30} viewBox="0 0 24 24" fill="#ffffff">
                <Path
                  d="M3,21.016l.78984-2.87249C5.0964,13.3918,8.5482,10.984,12,10.984"
                  fill="none"
                  stroke="#FDC826"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                />
                <Circle
                  cx={12}
                  cy={5.98404}
                  r={5}
                  fill="none"
                  stroke="#FDC826"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                />
                <Circle
                  cx={17}
                  cy={18}
                  r={5}
                  fill="none"
                  stroke="#FDC826"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  />
              </Svg>
            </TouchableOpacity>


            </View>
          {isAdmin && (
            
            <ScrollView>

              <TouchableOpacity
                style={styles.gridButtonContainer2}
                onPress={() => navigation.navigate('AdminDashboard')}
              >
                <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
                  <Path d="M12 21L10 20M12 21L14 20M12 21V18.5M6 18L4 17V14.5M4 9.5V7M4 7L6 6M4 7L6 8M10 4L12 3L14 4M18 6L20 7M20 7L18 8M20 7V9.5M12 11L10 10M12 11L14 10M12 11V13.5M18 18L20 17V14.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Text style={styles.gridButtonText}>Panel de Administrador</Text>
              </TouchableOpacity>



              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationSender')}
                style={styles.gridButtonContainer2}
                >
                <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
                  <Path d="M21.2717 8.76172C21.2717 9.78172 20.8017 10.7017 20.0417 11.3017C19.4917 11.7517 18.7817 12.0217 18.0117 12.0217C16.2217 12.0217 14.7617 10.5617 14.7617 8.77172C14.7617 7.88172 15.1217 7.07172 15.7217 6.48172V6.47172C16.3117 5.88172 17.1217 5.51172 18.0117 5.51172C19.8117 5.51172 21.2717 6.97172 21.2717 8.76172Z" fill="#FDC826" />
                  <Path d="M20.1817 18.7289C19.1317 19.6889 17.7817 20.2189 16.3517 20.2189H5.97172C3.23172 20.0189 2.01172 17.9089 2.01172 16.0289C2.01172 14.3489 2.98172 12.4889 5.11172 11.9689C4.18172 8.38887 5.96172 5.88887 8.04172 4.69887C10.1017 3.52887 13.0017 3.33887 15.1817 4.94887C14.9917 5.08887 14.8217 5.23887 14.6517 5.40887L14.2217 5.85887V5.91887C13.6017 6.72887 13.2617 7.71887 13.2617 8.75887C13.2617 11.3789 15.4017 13.5089 18.0217 13.5089C19.1017 13.5089 20.1517 13.1389 20.9717 12.4689C21.1217 12.3489 21.2717 12.2189 21.4017 12.0789C22.3917 14.1589 22.2517 16.9189 20.1817 18.7289Z" fill="#292D32" />
                </Svg>
                <Text style={styles.gridButtonText}>Notificaciones</Text>
              </TouchableOpacity>

            </ScrollView>


          )}



          <TouchableOpacity size="large" style={styles.gridButtonContainer} onPress={handleReport} title="Reportar" icon="alert-circle" >
            <Svg width={64} height={64} viewBox="0 0 1024 1024" fill="#000000">
              <Path d="M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z" fill="#000000" />
              <Path d="M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z" fill="#000000" />
              <Path d="M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z" fill="#000000" />
            </Svg>
            <Text style={styles.gridButtonText}>Reportar</Text>


          </TouchableOpacity>


          <TouchableOpacity style={styles.gridButtonContainer} onPress={() => navigation.navigate('Alerta')}>
            <Svg width={64} height={64} viewBox="0 0 24 24" fill="#000000">
              <Path fillRule="evenodd" clipRule="evenodd" d="M9.82664 2.22902C10.7938 0.590326 13.2063 0.590325 14.1735 2.22902L23.6599 18.3024C24.6578 19.9933 23.3638 22 21.4865 22H2.51362C0.63634 22 -0.657696 19.9933 0.340215 18.3024L9.82664 2.22902ZM10.0586 7.05547C10.0268 6.48227 10.483 6 11.0571 6H12.9429C13.517 6 13.9732 6.48227 13.9414 7.05547L13.5525 14.0555C13.523 14.5854 13.0847 15 12.554 15H11.446C10.9153 15 10.477 14.5854 10.4475 14.0555L10.0586 7.05547ZM14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="#ff0000" />

              <ClipPath id="clip0">
                <Rect width="24" height="24" fill="#000000" />
              </ClipPath>

            </Svg>
            <Text style={styles.gridButtonText}>Alerta</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style={styles.gridButtonContainer}
            onPress={() => navigation.navigate('LoadPresentismo')}
            >
              <Svg width={64} height={64} viewBox="0 0 16 16" fill="none">
              <Path fill="#000000" d="M4.045 7.765a.75.75 0 11-1.09-1.03l4.25-4.5a.75.75 0 011.09 0l4.25 4.5a.75.75 0 01-1.09 1.03L8.5 4.636v8.614a.75.75 0 01-1.5 0V4.636L4.045 7.765z"></Path>
            </Svg>
            <Text style={styles.gridButtonText}>Marcar Entrada</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.gridButtonContainer}
            onPress={() => navigation.navigate('LoadSalida')}
            >
            <Svg width={64} height={64} viewBox="0 0 16 16" fill="none">
              <Path fill="#000000" d="M3.22 4.28a.75.75 0 011.06-1.06l7.22 7.22V6.75a.75.75 0 011.5 0v5.5a.747.747 0 01-.75.75h-5.5a.75.75 0 010-1.5h3.69L3.22 4.28z"></Path>
            </Svg>
            <Text style={styles.gridButtonText}>Marcar Salida</Text>
          </TouchableOpacity>




          <TouchableOpacity style={styles.gridButtonContainer} onPress={() => navigation.navigate('ChatScreen')}>
            <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
              <Path d="M9 12.08L11 14L15 10" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
            </Svg>
            <Text style={styles.gridButtonText}>Chat</Text>

          </TouchableOpacity>




        </ScrollView>
      )}

      {/* Modal para el menú desplegable */}
      <Modal visible={isMenuVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setIsMenuVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Atras</Text>
          </TouchableOpacity>         

            <TouchableOpacity onPress={()=>navigation.navigate('Profile')} onPressOut={() => setIsMenuVisible(false)} style={styles.logoutButton2}>
              <Text style={styles.logoutButtonText2} >Perfil</Text>
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
    padding: 15,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Epilogue-Variable',
    backgroundColor: 'black',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  gridList: {
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 'auto',
  },
  chatButton: {
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    color: 'black'
  },
  logoutButtonText2: {
    color: 'black',
    fontSize: 18,
  },
  gridButtonContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridButtonContainer2: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
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
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable',

  },
  gridButtonText2: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Epilogue-Variable',


  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
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
    paddingTop: 20,
    paddingHorizontal: 5,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  profileButton: {
    color: 'white',
    fontSize: 18,
    width: '100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 32,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 18,
    borderRadius: 25
  },
  menuButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',

  },
});

export default Home;