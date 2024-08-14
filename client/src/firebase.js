// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "namphuoc1-web.firebaseapp.com",
  projectId: "namphuoc1-web",
  storageBucket: "namphuoc1-web.appspot.com",
  messagingSenderId: "398955831143",
  appId: "1:398955831143:web:cc1fd4fe0dcc9a2fa519c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);