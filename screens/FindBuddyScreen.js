import React, { useEffect, useState } from 'react';

import { FlatList, Text } from 'react-native';
import { auth, db } from '../src/FirebaseAuth';
import { collection, getDocs } from "firebase/firestore";
import UserCard from '../components/UserCard';

export default function FindBuddyScreen() {
  const [users, setUsers] = useState([]);
  const retrieveUsers = async () => {
    const querySnapshot = await db.collection('users').get();
    const tmpUsers = [];
    querySnapshot.docs.forEach(doc => tmpUsers.push(doc.data()));
    setUsers(tmpUsers);
  }

  useEffect(() => {
    retrieveUsers();
  }, []);

  return (
    <>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </>
  )
}