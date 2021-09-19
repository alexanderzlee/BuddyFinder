import React from 'react';
import useUsers from '../hooks/useUsers';
import UserList from '../components/UserList';

export default function FindBuddyScreen() {
  const users = useUsers();

  return (
    <>
      <UserList users={users} type="requesting"/>
    </>
  )
}