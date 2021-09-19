import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { auth, db } from '../src/FirebaseAuth';
import { collection, getDocs } from "firebase/firestore";
import UserCard from '../components/UserCard';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const retrieveUsers = async () => {
    const querySnapshot = await db
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const tmpUsers = [];
        querySnapshot.docs.forEach(doc => tmpUsers.push(doc.data()));
        setUsers(tmpUsers);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    retrieveUsers();
  }, []);

  return users;
}