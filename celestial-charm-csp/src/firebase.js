import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { dotenv } from "dotenv";
// dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyAYBaRtIM9ALhvDDyQHBhxhPHFnkbiFFDw",
    authDomain: "celestial-charm-auth.firebaseapp.com",
    projectId: "celestial-charm-auth",
    storageBucket: "celestial-charm-auth.firebasestorage.app",
    messagingSenderId: "308419009064",
    appId: "1:308419009064:web:737ed1a2c4ebf0671fb31d",
    measurementId: "G-TR7257QW42"
    // apiKey: process.env.VITE_API_KEY,
    // authDomain: process.env.VITE_AUTH_DOMAIN,
    // projectId: process.env.VITE_PROJECT_ID,
    // storageBucket: process.env.VITE_STORAGE_BUCKET,
    // messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    // appId: process.env.VITE_APP_ID,
    // measurementId: process.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);