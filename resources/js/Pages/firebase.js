// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYgQ0VN1nAMfxRfrX_qLwXJOnivoF2LkE",
  authDomain: "e-commerce-boeatin.firebaseapp.com",
  projectId: "e-commerce-boeatin",
  storageBucket: "e-commerce-boeatin.appspot.com",
  messagingSenderId: "137034273775",
  appId: "1:137034273775:web:fd76470f6e3144a2c55c1a",
  measurementId: "G-D3ZMYWK8KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };