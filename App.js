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
      <Stack.Screen name="Notif" component={NotificationSender} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ThankYou" component={ThankYouScreen} options={{ headerShown: false }} />
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

