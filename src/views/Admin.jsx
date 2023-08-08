import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const AdminViewScreen = () => {
  const sendNotificationsToAllDevices = async () => {
    try {
      // Initialize Firebase with your configuration
      firebase.initializeApp({
        apiKey: "AIzaSyBNR6o3JhtLLAKLfXC45UhX__2VzOyXr8c",
        authDomain: "crimereports-d260e.firebaseapp.com",
        databaseURL: "https://crimereports-d260e-default-rtdb.firebaseio.com",
        projectId: "crimereports-d260e",
        storageBucket: "crimereports-d260e.appspot.com",
        messagingSenderId: "970236483682",
        appId: "1:970236483682:web:c3430c03dddcd240bd193b",
        measurementId: "G-F39RHMXWKF"
      });

            // Construct the notification payload
      const notification = {
        title: 'Notification Title',
        body: 'Notification Body',
        // Add any additional data you want to send in the notification payload
      };

      // Send the notification to all devices using FCM
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Authorization': `key=YOUR_SERVER_KEY`, // Use your FCM server key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '/topics/all', // Send to a specific topic or device tokens
          priority: 'high',
          notification,
        }),
      });

      if (response.ok) {
        // Notification sent successfully
        // You can display a success message or handle the response as needed
        console.log('Notification sent successfully');
      } else {
        // Handle the error or show an error message to the admin
        console.error('Error sending notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={sendNotificationsToAllDevices}>  
        <Text>Send Notifications to All Devices</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminViewScreen;
