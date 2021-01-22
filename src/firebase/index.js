import firebase from 'firebase/app';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgaSGKlWoq5M_pZl19s8rPFX9hwHwo-m8",
  authDomain: "girls-59d4a.firebaseapp.com",
  databaseURL: "https://girls-59d4a-default-rtdb.firebaseio.com",
  projectId: "girls-59d4a",
  storageBucket: "girls-59d4a.appspot.com",
  messagingSenderId: "609769818806",
  appId: "1:609769818806:web:bb8d04c6cc414fd6183417",
  measurementId: "G-WJX8GV3NMR"
};
// https://firebasestorage.googleapis.com/v0/b/tienda-5f376.appspot.com/o/logo.png?alt=media&token=f1408256-0270-42dc-9a5e-24762bc0e188
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
  storage,
  firebase as default,
};