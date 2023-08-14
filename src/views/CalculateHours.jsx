import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const CalculateHours= () => {


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventContainer: {
    marginTop: 20,
    padding: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalHours: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalSalary: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CalculateHours;
