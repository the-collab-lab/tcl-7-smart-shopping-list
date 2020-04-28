// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: "AIzaSyBOsjQqoNjd1M2nLK7vAmZoyUlh9eY3VQk",
  authDomain: "tcl-7-smart-shopping-list.firebaseapp.com",
  databaseURL: "https://tcl-7-smart-shopping-list.firebaseio.com",
  projectId: "tcl-7-smart-shopping-list",
  storageBucket: "tcl-7-smart-shopping-list.appspot.com",
  messagingSenderId: "1010438909280",
  appId: "1:1010438909280:web:c6de43190232119c3fc205"
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
