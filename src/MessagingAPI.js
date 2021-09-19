import { initializeApp } from 'firebase/app';
import {
getAuth,
onAuthStateChanged,
GoogleAuthProvider,
signInWithPopup,
signOut,
} from 'firebase/auth';
import {
getFirestore,
collection,
addDoc,
query,
orderBy,
limit,
onSnapshot,
setDoc,
updateDoc,
doc,
serverTimestamp,
} from 'firebase/firestore';
import {
getStorage,
ref,
uploadBytesResumable,
getDownloadURL,
} from 'firebase/storage';
import {
getMessaging,
getToken,
onMessage
} from 'firebase/messaging'; 
import { getPerformance } from 'firebase/performance';

import { getFirebaseConfig } from './firebase-config.js';

 // Returns the signed-in user's display name.
 function getUserName() {
    return getAuth().currentUser.displayName;
}

// Saves a new message to Cloud Firestore.
async function saveMessage(messageText) {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'messages'), {
        name: getUserName(),
        text: messageText,
        profilePicUrl: getProfilePicUrl(),
        timestamp: serverTimestamp()
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

  // Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));
    
    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          deleteMessage(change.doc.id);
        } else {
          var message = change.doc.data();
          displayMessage(change.doc.id, message.timestamp, message.name,
                        message.text, message.profilePicUrl, message.imageUrl);
        }
      });
    });
  }