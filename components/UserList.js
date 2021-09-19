import React from 'react';
import firebase from 'firebase';
import { FlatList } from 'react-native';
import UserCard from './UserCard';

// users: array of User documents
// type: "requesting": list for requesting buddies, "accept": list for accepting buddies
export default function UserList({ users, type }) {
  const currentUser = firebase.auth().currentUser;
  const currentUserIn = (group) => group.includes(currentUser.uid);
  return (
    <>
      <FlatList
        data={users}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => (<UserCard user={item} 
          prompt={(() => {
            if (item.uid === currentUser.uid)
              return null; // don't show self in buddy list
            if (type === "requesting") {
              if (currentUserIn(item["buddies"] || [])) {
                return null; // dont show people who are already buddies
              } else if (currentUserIn(item["requestingBuddies"] || [])) {
                return "pending";
              } else {
                return "request";
              }
            }
          })()} 
        />)}
      />
    </>
  );
}