import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Home from './src/views/Home';
import ThankYouScreen from './src/views/Thanks';
import RegisterScreen from './src/views/RegisterScreen';
import CrimeForm from './src/components/Form';
import LoginScreen from './src/views/LoginScreen'; // ¡No olvides importar LoginScreen!
import ProfileScreen from './src/views/ProfileScreen';
import ReportsScreen from './src/views/ReportScreen';
import NotificationSender from './src/components/Notifications';
import AddCompanyScreen from './src/views/addCompanyScreen';
import VigilantesScreen from './src/views/vigilanteScreen';
import QRScanner from './src/components/QRscanner';
import AlertComponent from './src/components/AlertForm';
import QRCodeGenerator from './src/components/QRGen';
import EnterprisesView from './src/views/EnterprisesView';
import UserVigilantesView from './src/views/userVigilanteScreen';
import ReportDetailScreen from './src/views/ReportDetails';
import EditEmpresaScreen from './src/views/EditEnterpriseScreen';
import UserDetailsScreen from './src/views/userVigilanteDetail';
import ChatScreen from './src/components/ChatScreen';
import LoadingScreen from './src/views/LoadingScreen';
import LoadPresentismo from './src/views/loadPresentismo';
import CalendarScreen from './src/components/Calendar';
import MarcarSalida from './src/views/loadSalida';
import AddAdmin from './src/views/addAdmin';
import * as Font from 'expo-font'; // Importa expo-font
import AdminApprovalScreen from './src/views/AdminApproval';
import RequestRegister from './src/views/requestRegister';
import CalculateHoursScreen from './src/views/CalculateHours';
import AddSupervisor from './src/views/addSupervisor';
import AdminHome from './src/views/AdminHome';
import UserHome from './src/views/UserHome';
import CalendarView from './src/views/calendarView';
import AdminHomeWeb from './src/web/AdminHomeWeb';
import UserHomeWeb from './src/web/UserHomeWeb';
import CrimeFormWeb from './src/web/FormWeb'
import ReportDetailScreenWeb from './src/web/ReportDetailsWeb';

const Stack = createStackNavigator();

// Agrega la configuración de Firebase aquí si no lo has hecho aún

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false); 

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Epilogue-Variable': require('../formReport/assets/fonts/Epilogue-Variable.ttf'),
      });
      setFontsLoaded(true); // Mark fonts as loaded
    }
    loadFonts();
  }, []);

    // En App.js o cualquier otro componente relevante:
  const isUserAdmin = () => {
    const currentUser = firebase.auth().currentUser;
    return currentUser && currentUser.role === 'admin';
  };

  if (loading) {
    return <LoadingScreen />; // Muestra el loader mientras carga
  }



  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="CrimeForm">
      {user && isUserAdmin? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false, title: 'Home | IGS' }}/>
         


        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        </>
      )}




      <Stack.Screen name="Form" component={CrimeForm} options={{ headerShown: false, title: 'Nuevo Reporte | IGS'}}/>
      <Stack.Screen name="ThankYou" component={ThankYouScreen} options={{ headerShown: false, title: 'Reporte enviado | IGS' }} />
      <Stack.Screen name="FormWeb" component={CrimeFormWeb} options={{ headerShown: false , title: 'Nuevo Reporte Web | IGS'}} />
      
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, title: 'Perfil de usuario | IGS' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, title: 'Registrarse | IGS' }}/>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false, title: 'Cargando...' }}/>


      <Stack.Screen name="qr" component={QRScanner} options={{ headerShown: false,  }}/>
      <Stack.Screen name="qrGen" component={QRCodeGenerator} options={{ headerShown: false }}/>

      
      <Stack.Screen name="Alerta" component={AlertComponent} options={{ headerShown: false, title: 'Alerta | IGS' }}/>
      <Stack.Screen name="vigilantesView" component={UserVigilantesView} options={{ headerShown: false, title: 'Detalle de Vigilante | IGS' }}/>
      
      
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false, title: 'Chat | IGS' }}/>
      
      <Stack.Screen name="AddAdmin" component={AddAdmin} options={{ headerShown: false, title: 'Agregar administrador | IGS' }}/>
      <Stack.Screen name="addCompany" component={AddCompanyScreen} options={{ headerShown: false, title:'Agregar empresa | IGS' }}/>
      <Stack.Screen name="addSupervisor" component={AddSupervisor} options={{ headerShown: false, title: 'Agregar supervisor | IGS' }}/>

      <Stack.Screen name="Empresas" component={EnterprisesView} options={{ headerShown: false, title: 'Empresas | IGS' }}/>
      <Stack.Screen name="EditEmpresa" component={EditEmpresaScreen} options={{ headerShown: false }}/>
      
      <Stack.Screen name="LoadSalida" component={MarcarSalida} options={{ headerShown: false, title: 'Marcar salida | IGS' }}/>
      <Stack.Screen name="LoadPresentismo" component={LoadPresentismo} options={{ headerShown: false, title: 'Marcar salida | IGS' }}/>
      
      
      
      <Stack.Screen name="UserHome" component={UserHome} options={{headerShown:false, title: 'Home | IGS'}} />
      <Stack.Screen name="UserHomeWeb" component={UserHomeWeb} options={{headerShown:false, title:'Añadir vigilante | IGS'}} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ headerShown: false, title: 'Detalles de vigilante | IGS' }}/>
      <Stack.Screen name="RequestRegister" component={RequestRegister} options={{ headerShown: false}}/>
      
      <Stack.Screen name="reportHistory" component={ReportsScreen} options={{ headerShown: false, title: 'Historial de reportes | IGS' }}/>
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ headerShown: false, title:'Detalles de reporte | IGS' }}/>
      <Stack.Screen name="ReportDetailWeb" component={ReportDetailScreenWeb} options={{ headerShown: false, title:'Detalles de reporte | IGS' }}/>

      
      <Stack.Screen name="calendar" component={CalendarScreen} options={{headerShown:false, title:'Calendario'}}/>
      <Stack.Screen name="CalendarView" component={CalendarView} options={{headerShown:false, title:'Calendario'}} />
      <Stack.Screen name="NotificationSender" component={NotificationSender} />
      
      <Stack.Screen name="AdminApproval" component={AdminApprovalScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AdminHome" component={AdminHome} options={{headerShown:false}} />
      <Stack.Screen name="AdminHomeWeb" component={AdminHomeWeb} options={{headerShown:false, title: 'Admin Home | IGS'}} />
      
     





    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home:{
    flex:1,
  }
});

