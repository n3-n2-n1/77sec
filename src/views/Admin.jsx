import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const AdminViewScreen = () => {
  const sendNotificationsToAllDevices = async () => {
    try {
      // Make a request to your backend server to trigger notification sending
      const response = await fetch('YOUR_BACKEND_NOTIFICATION_ENDPOINT', {
        method: 'POST',
        headers: {
          'Authorization': 'YOUR_BACKEND_AUTH_TOKEN', // Send an authentication token to your backend
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Notification Title',
          body: 'Notification Body',
          // Add any additional data you want to send in the notification payload
        }),
      });

      if (response.ok) {
        // Notification sent successfully
        // You can display a success message or handle the response as needed
      } else {
        // Handle the error or show an error message to the admin
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
