import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCP24pigSDHvlKi63Dqpov9pwIKgwu8EgQ",
  authDomain: "course-work-classroom.firebaseapp.com",
  projectId: "course-work-classroom",
  storageBucket: "course-work-classroom.appspot.com",
  messagingSenderId: "929111980631",
  appId: "1:929111980631:web:c1b0e3a4a4978e91fac112"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { auth, provider, storage };
export default db;
