import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import WelcomeGraphic from '../components/WelcomeGraphic';

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <WelcomeGraphic />
      <Text>{"\n\n\n\n\n\n\n\n\n"}</Text>
      <TouchableOpacity
        style={styles.greenbutton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.whiteText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.spacing}> {"\n\n"} </Text>
      <TouchableOpacity
        style={styles.yellowbutton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.whiteText}>Sign Up</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2eeeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    fontSize: 30,
    color: "#f2eeeb",
  },

  spacing: {
    fontSize: 5
  },

  greenbutton: {
    borderRadius: 25,
    backgroundColor: "#025940",
    paddingHorizontal: 139,
    padding: 20
  },

  yellowbutton: {
    borderRadius: 25,
    backgroundColor: "#f2b705",
    paddingHorizontal: 125,
    padding: 20
  },
});