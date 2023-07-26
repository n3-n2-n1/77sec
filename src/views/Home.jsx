import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import CrimeForm from '../components/Form';

const Home = () => {


  const navigation = useNavigation();

  const handleCall = () => {
    console.log('1132369112')
  }

  const handleReport = () => {
    navigation.navigate('Form'); // Or navigate to any other screen you need
  }

  return (
    <View>
      
      
      <View>
        <TouchableOpacity onPress={handleCall}>
          <Text>Llamar</Text>
        </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity onPress={handleReport}>
        <Text>Reportar</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity onPress={handleReport}>
        <Text>Ayuda</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity onPress={handleReport}>
        <Text>Admin</Text>
      </TouchableOpacity>
      </View>
    
    
    </View>
    

    

    
  )
}

export default Home;
