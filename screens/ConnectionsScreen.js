import React, { useEffect } from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import UserCard from '../components/UserCard';
import useUsers from '../hooks/useUsers';

export default function ConnectionsScreen() {
  const users = useUsers();
  if (users.length === 0) {
    return (
      <Text>No current buddy requests :(</Text>
    );
  }
  const currentUser = firebase.auth().currentUser;
  const currentUserDoc = Object.values(users)
    .find((user) => currentUser.uid === user["uid"])
  const requestingBuddiesUIDs = currentUserDoc["requestingBuddies"] || [];
  const buddyDocs = currentUserDoc["buddies"] || [];

  // filter users by users who requested to be a buddy
  const requestingBuddiesDocs = Object.entries(users)
    .filter(([id, requestingBuddyDoc]) => requestingBuddiesUIDs.includes(requestingBuddyDoc.uid)
    )
    // flatten 2D array to 1D array (omit ID so only UID's are left)
    .map(([id, requestingBuddyDoc]) => requestingBuddyDoc)

  const connections = [
    {
      title: "Connected",
      data: buddyDocs,
    },
    {
      title: "Requesting",
      data: requestingBuddiesDocs,
    }
  ]
  return (
    <>
      <SectionList
        sections={connections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section }) => {console.log("renderItem:", item); 
          return <UserCard user={item} prompt={section === "Requesting" ? "accept" : null}
        />}}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  noRequests: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 10,
  },

  header: {
    fontSize: 16,
  }
});