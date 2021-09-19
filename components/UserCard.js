import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import UserAvatar from 'react-native-user-avatar'

export default function UserCard({ user }) {
  const { name } = user;
  return (
    <View style={styles.container}>
      <UserAvatar name={ name } />
      <Text>{ name }</ Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});