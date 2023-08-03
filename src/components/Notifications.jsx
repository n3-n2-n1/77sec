import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NotificationSender = () => {
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    // Solicitar permisos para notificaciones si aún no se han concedido
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Permisos de notificación habilitados');
      } else {
        console.log('Permisos de notificación denegados');
      }
    };

    requestPermission();

    // Escuchar los mensajes de notificación cuando la app está en primer plano
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      console.log('Notificación recibida mientras la app está en primer plano:', remoteMessage);
      // Aquí puedes manejar la lógica para mostrar la notificación en la app en primer plano
    });

    // Escuchar los mensajes de notificación cuando la app está en segundo plano o cerrada
    const unsubscribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Notificación recibida mientras la app está en segundo plano o cerrada:', remoteMessage);
      // Aquí puedes manejar la lógica para mostrar la notificación en la app cuando se abre desde la notificación
    });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  const handleSendNotification = async () => {
    try {
      // Enviar una notificación de prueba
      await messaging().send({
        data: {
          title: 'Título de la notificación',
          body: 'Contenido de la notificación',
        },
      });
      setNotificationSent(true);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Enviar Notificación de Prueba"
        onPress={handleSendNotification}
        disabled={notificationSent}
      />
      {notificationSent && <Text style={styles.notificationSentText}>Notificación enviada</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationSentText: {
    marginTop: 10,
    color: 'green',
  },
});

export default NotificationSender;
