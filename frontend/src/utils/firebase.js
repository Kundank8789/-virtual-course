// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginvirtalcourses.firebaseapp.com",
  projectId: "loginvirtalcourses",
  storageBucket: "loginvirtalcourses.firebasestorage.app",
  messagingSenderId: "781122113769",
  appId: "1:781122113769:web:a206ba84c6160f1811a078"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }