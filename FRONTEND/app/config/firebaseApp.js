import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmasQdeWNccfJEL0e-PXZgFTT0zlLC1MI",
  authDomain: "blog-8c2c9.firebaseapp.com",
  projectId: "blog-8c2c9",
  storageBucket: "blog-8c2c9.appspot.com", // make sure it's .com
  messagingSenderId: "185027802428",
  appId: "1:185027802428:web:b64fda24f6e024545f1a39",
  measurementId: "G-VS96T6LKLV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
