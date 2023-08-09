import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

const NotificationSender = () => {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');
  const [companyName, setCompanyName] = useState('');

  const sendNotification = async () => {
    try {
      const companyUsersSnapshot = await firebase.firestore().collection('users')
        .where('empresa', '==', companyName)
        .get();
      
      const tokens = [];
      companyUsersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.pushToken) {
          tokens.push(userData.pushToken);
        }
      });
      
      // Envía la notificación a los tokens de registro
      const messaging = firebase.messaging();
      const message = {
        notification: {
          title: notificationTitle,
          body: notificationBody,
        },
        tokens: tokens,
      };

      const response = await messaging.sendMulticast(message);
      console.log('Notificación enviada con éxito:', response);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Notificación</Text>
      <TextInput
        style={styles.input}
        placeholder="Título de la notificación"
        value={notificationTitle}
        onChangeText={setNotificationTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Cuerpo de la notificación"
        value={notificationBody}
        onChangeText={setNotificationBody}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <Button title="Enviar" onPress={sendNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default NotificationSender;
