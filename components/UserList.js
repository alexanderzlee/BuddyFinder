import React from 'react';
import firebase from 'firebase';
import { FlatList } from 'react-native';
import UserCard from './UserCard';

// users: array of User documents
// type: "requesting": list for requesting buddies, "accept": list for accepting buddies
export default function UserList({ users, type }) {
  const currentUser = firebase.auth().currentUser;
  const currentUserIn = (requestingBuddies) => requestingBuddies.includes(currentUser.uid);
  return (
    <>
      <FlatList
        data={users}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => (<UserCard user={item} 
          prompt={type === "requesting" ?
            currentUserIn(item["buddies"] || [])
            ? null :
            currentUserIn(item["requestingBuddies"] || []) 
            ? "pending" : "request"
          : type === "accepting" 
            ? "accept" : null
        } />)}
      />
    </>
  );
}