import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from 'firebase/app';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import ConnectionsScreen from './screens/ConnectionsScreen';
import FindBuddyScreen from './screens/FindBuddyScreen';


import { DrawerContent } from './components/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const drawerDisabledScreens = ['Home, Login, Register'];

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCSD4gZwyxQ4LmnAwvGokkW_RVodKluiE",
  authDomain: "buddy-finder-3956a.firebaseapp.com",
  projectId: "buddy-finder-3956a",
  storageBucket: "buddy-finder-3956a.appspot.com",
  messagingSenderId: "631783293895",
  appId: "1:631783293895:web:527dace998dfd5bd868fe2",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app();
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // check if user is logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
    });
  });

  return (

    (loggedIn 
      ?
        <NavigationContainer>
          <Drawer.Navigator 
            drawerContent={props => <DrawerContent { ...props} />}
            initialRouteName={"Dashboard"}>
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name="Connections" component={ConnectionsScreen} />
            <Drawer.Screen name="FindBuddy" component={FindBuddyScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      :
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator> 
        </NavigationContainer>
    )
  );
}
