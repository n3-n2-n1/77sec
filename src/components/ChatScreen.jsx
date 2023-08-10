import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import firebase from '../database/firebaseC';
import { Platform } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const adminSender = 'quarzoengine@gmail.com';
    const messagesRef = firebase.firestore().collection('messages');
  
    messagesRef
      .orderBy('timestamp')
      .onSnapshot((querySnapshot) => {
        const messageList = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          if (messageData.sender === adminSender) {
            messageList.push({ id: doc.id, ...messageData });
          }
        });
        setMessages(messageList);
      });
  }, []);

  const handleSendMessage = () => {
    const adminSender = 'quarzoengine@gmail.com'; // Cambiar a la dirección de correo del administrador
  
    // Verificar si el usuario actual es un administrador
    const currentUser = firebase.auth().currentUser;
    if (currentUser && currentUser.email === adminSender) {
      const messagesRef = firebase.firestore().collection('messages');
  
      if (messageText) {
        messagesRef.add({
          message: messageText,
          sender: adminSender,
          timestamp: new Date(),
        });
  
        setMessageText('');
      }
    } else {
      // El usuario actual no es un administrador, mostrar mensaje o realizar otra acción
      console.log('No tienes permiso para enviar mensajes.');
      alert('No tienes permiso para enviar mensajes.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.senderText}>{item.sender}</Text>
            <Text style={styles.senderText}>{item.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>

          </View>
        )}
      />
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajusta el valor según sea necesario
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
