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
import CalendarView from './src/components/Calendar';
import QRScanner from './src/components/QRscanner';
import AlertForm from './src/components/AlertForm';
import QRCodeGenerator from './src/components/QRGen';
import AdminViewScreen from './src/views/Admin';
import EnterprisesView from './src/views/EnterprisesView';
import UserVigilantesView from './src/views/userVigilanteScreen';
import ReportDetailScreen from './src/views/ReportDetails';
import EditEmpresaScreen from './src/views/EditEnterpriseScreen';
const Stack = createStackNavigator();

// Agrega la configuración de Firebase aquí si no lo has hecho aún

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

    // En App.js o cualquier otro componente relevante:
  const isUserAdmin = () => {
    const currentUser = firebase.auth().currentUser;
    return currentUser && currentUser.role === 'admin';
  };



  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="CrimeForm">
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}

      <Stack.Screen name="Form" component={CrimeForm} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ThankYou" component={ThankYouScreen} options={{ headerShown: false }} />
      <Stack.Screen name="addCompany" component={AddCompanyScreen} />
      <Stack.Screen name="Vigilantes" component={VigilantesScreen} />
      <Stack.Screen name="reportHistory" component={ReportsScreen} />
      <Stack.Screen name="calendar" component={CalendarView} />
      <Stack.Screen name="qr" component={QRScanner} />
      <Stack.Screen name="Alerta" component={AlertForm} />
      <Stack.Screen name="qrGen" component={QRCodeGenerator} />
      <Stack.Screen name="AdminDashboard" component={AdminViewScreen} />
      <Stack.Screen name="NotificationSender" component={NotificationSender} />
      <Stack.Screen name="Empresas" component={EnterprisesView} />
      <Stack.Screen name="vigilantesView" component={UserVigilantesView} />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
      <Stack.Screen name="EditEmpresa" component={EditEmpresaScreen} />



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

