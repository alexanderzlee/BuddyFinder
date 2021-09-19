import React, { useState, useEffect } from 'react';
import { db } from '../src/FirebaseAuth';

import { getUserDocumentRef } from '../src/FirebaseUser';

export default function useWalkingHome(user) {
  const userRef = getUserDocumentRef(user);
  const [walking, setWalking] = useState(false);
  const retrieveWalkingHome = async () => {
    const querySnapshot = (await userRef)
      .onSnapshot((doc) => {
        setWalking(doc.data()["walkingHome"]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    retrieveWalkingHome();
  }, []);

  return walking;
}