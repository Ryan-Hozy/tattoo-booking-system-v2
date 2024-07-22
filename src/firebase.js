import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrh9x9J7iIkubX8jT87cyDrHRiMmnfHVg",
  authDomain: "photography-app-6b1d7.firebaseapp.com",
  projectId: "photography-app-6b1d7",
  storageBucket: "photography-app-6b1d7.appspot.com",
  messagingSenderId: "355154292270",
  appId: "1:355154292270:web:9687f64cc3cbf4935ef9bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;