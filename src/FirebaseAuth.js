import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCSD4gZwyxQ4LmnAwvGokkW_RVodKluiE",
  authDomain: "buddy-finder-3956a.firebaseapp.com",
  projectId: "buddy-finder-3956a",
  storageBucket: "buddy-finder-3956a.appspot.com",
  messagingSenderId: "631783293895",
  appId: "1:631783293895:web:527dace998dfd5bd868fe2",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const registerWithEmailPhoneAndPassword = async (name, email, phone, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        phone,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailPhoneAndPassword,
  logout,
};