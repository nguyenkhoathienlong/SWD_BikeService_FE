
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDkG1Q8IvTmz0XX4HIOQiqxHgT02IHP1S0",
  authDomain: "bike-fd299.firebaseapp.com",
  projectId: "bike-fd299",
  storageBucket: "bike-fd299.appspot.com",
  messagingSenderId: "582758959747",
  appId: "1:582758959747:web:0c14fa2357574d925fe9b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
