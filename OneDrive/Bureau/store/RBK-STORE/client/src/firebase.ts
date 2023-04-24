// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXPJAM-pRw7I8aNJr7crYKMtwf78j8RCk",
  authDomain: "rbk-store-d137a.firebaseapp.com",
  projectId: "rbk-store-d137a",
  storageBucket: "rbk-store-d137a.appspot.com",
  messagingSenderId: "891556421199",
  appId: "1:891556421199:web:3eef51739239639673d43a",
  measurementId: "G-V33WMJ2TDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
