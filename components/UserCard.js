import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar'
import { requestBuddy, acceptBuddy } from '../src/FirebaseUser';
import firebase from 'firebase';
import {Linking} from 'react-native';

// user: The document of the User for the user card
// type of button that should be shown ("request", "accept", "pending")
export default function UserCard({ user, prompt }) {
  const { name } = user;
  const currentUser = firebase.auth().currentUser;
  return <>
    {prompt !== null &&
    <View style={styles.container}>
      <UserAvatar name={ name } />
      <Text>{ name }</ Text>
      { prompt === 'request' ?
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => requestBuddy(user.uid, currentUser.uid)}>
          <Text style={styles.request}>Request</Text>
        </TouchableOpacity>
        : prompt === 'accept' ?
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => acceptBuddy(currentUser.uid, user.uid)}>
          <Text style={styles.request}>Accept</Text>
        </TouchableOpacity>
        : prompt === "pending" ?
        <Text style={styles.pending}>Pending...</Text>
        : prompt === "buddies" ?
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => {Linking.openURL("tel:".concat("",user.phone));}}>
          <Text style={styles.request}>Call</Text>
        </TouchableOpacity>
        // <Text>+{user.phoneNumber}</Text>
        : <Text> </Text>
      }
    </View>}
  </>
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  request: {
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 3,
    backgroundColor: "#f2b705",
    color: "#f2eeeb",
    //textAlign: "center",
    //fontSize: 30,
    fontWeight: "bold"
  },

  pending: {
    color: "gray",
  },

  requestButton: {
    color: "#f2b705",
    marginRight: 10
  },

});