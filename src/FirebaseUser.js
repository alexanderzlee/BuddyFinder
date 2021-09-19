import firebase from 'firebase';
import { db } from './FirebaseAuth';

// Get a DocumentReference to the user with the specified UID
const getUserDocumentRef = async (uid) => {
  try {
    let userRef;
    return db.collection('users')
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        // such a convoluted way of doing this...
        const buddyDocIDs = []; // document ID (DIFFERENT from the UID)
        // get all documents with the specified UID
        // and use the UID to get the document ID
        querySnapshot.forEach((doc) => buddyDocIDs.push(doc.id));
        // since each UID is unique there is only one (the first one)
        userRef = db.collection("users").doc(buddyDocIDs[0]);
        return userRef;
      });
  } catch (err) {
    console.error(err);
  }
}

// buddyID: the UID of the user to be requested (user clicked in "Find a Buddy")
// requesterID: the UID of the user requesting (current user)
const requestBuddy = async (buddyID, requesterID) => {
  const buddyRef = await getUserDocumentRef(buddyID);
  buddyRef.update({
    requestingBuddies: firebase.firestore.FieldValue.arrayUnion(requesterID)
  });
};

const acceptBuddy = async (accepterID, requesterID) => {
  const accepterRef = await getUserDocumentRef(accepterID);
  const requesterRef = await getUserDocumentRef(requesterID);
  accepterRef.update({
    // remove requester from requesting buddies list
    requestingBuddies: firebase.firestore.FieldValue.arrayRemove(requesterID),
    // add requester to accepter's buddies list
    buddies: firebase.firestore.FieldValue.arrayUnion(requesterID),
  });
  // add accepter to requester's buddy list
  requesterRef.update({
    buddies: firebase.firestore.FieldValue.arrayUnion(accepterID),
  });
};


export {
  requestBuddy,
  acceptBuddy,
}