import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import firebase from '../database/firebaseC';
import { Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const navigation = useNavigation();
  const [unreadMessages, setUnreadMessages] = useState(false);
  const messageInputRef = useRef(null); // Referencia al componente TextInput


  useEffect(() => {
    const messagesRef = firebase.firestore().collection('messages');

    messagesRef
      .orderBy('timestamp')
      .onSnapshot((querySnapshot) => {
        const messageList = [];
        let hasUnreadMessages = false;

        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          // Verifica si es un mensaje de administrador
          const sender = messageData.isAdminMessage ? 'Administrador' : messageData.sender;
          messageList.push({ id: doc.id, ...messageData, sender });
          if (!messageData.read) {
            hasUnreadMessages = true;
          }
        });

        setMessages(messageList);
        setUnreadMessages(hasUnreadMessages);
      });
  }, []);

  const markMessageAsRead = async (messageId) => {
    try {
      await firebase.firestore().collection('messages').doc(messageId).update({
        read: true,
      });

      // Actualiza la lista de mensajes marcando el mensaje como leído
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId ? { ...message, read: true } : message
        )
      );
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleTextInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Evita que se agregue una nueva línea en el TextInput
      event.preventDefault();
      // Envía el mensaje
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      // Consulta el rol del usuario en tu base de datos
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          // Verificar si el usuario tiene el rol de administrador
          if (userData.role === 'admin') {
            // El usuario es un administrador, permitir enviar el mensaje
            const messagesRef = firebase.firestore().collection('messages');

            if (messageText) {
              messagesRef.add({
                message: messageText,
                isAdminMessage: true, // Puedes utilizar el correo electrónico actual
                timestamp: new Date(),
              });

              setMessageText('');
            }
          } else {
            // El usuario no tiene permiso de administrador
            console.log('No tienes permiso para enviar mensajes.');
            alert('No tienes permiso para enviar mensajes.');
          }
        } else {
          // El documento del usuario no existe en la base de datos
          console.log('No se encontró información del usuario.');
          alert('No se encontró información del usuario.');
        }
      }).catch((error) => {
        console.error('Error al verificar el rol del usuario:', error);
      });
    } else {
      // El usuario no está autenticado
      console.log('Usuario no autenticado.');
      alert('Usuario no autenticado.');
    }
  };


  return (
    <View style={styles.container}>

      <View style={styles.navbar}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#3780C3"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>
          Chat General
        </Text>

      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.senderText}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.timestampText}>
              {item.timestamp.toDate().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <TouchableOpacity onPress={() => markMessageAsRead(item.id)}>
              <Text>Leido</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {unreadMessages && ( // Mostrar la notificación solo si hay mensajes no leídos
        <Text style={styles.unreadNotification}>¡Tienes mensajes no leídos!</Text>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} 
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
          onKeyPress={handleTextInputKeyPress} // Controlador de eventos para Enter
          ref={messageInputRef}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} on>
          <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
            <Path
              d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 5,
    paddingBottom: 20,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  messageContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start', // Alinea el mensaje a la izquierda
    maxWidth: '80%', // Limita el ancho del mensaje
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#DCF8C6', // Color de fondo del mensaje
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Epilogue-Variable',

  },
  senderText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
    marginBottom: 10,
    fontFamily: 'Epilogue-Variable',

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,

  },
  unreadNotification: {
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontFamily: 'Epilogue-Variable',

  },

  title: {
    fontSize: 24,
    color: '#3780C3',
    fontWeight: 800,
    paddingRight: 16,
    fontFamily: 'Epilogue-Variable',

  },
  timestampText: {
    alignSelf: 'flex-end', // Alinea la hora a la derecha
    fontSize: 10,
    color: '#888',
    fontFamily: 'Epilogue-Variable',

  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'blue',
    fontFamily: 'Epilogue-Variable',


  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 5,
    paddingLeft: 8,

  },
  sendButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Epilogue-Variable',

  },

});

export default ChatScreen;
