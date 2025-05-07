import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

        apiKey: "AIzaSyAYBaRtIM9ALhvDDyQHBhxhPHFnkbiFFDw",
        authDomain: "celestial-charm-auth.firebaseapp.com",
        projectId: "celestial-charm-auth",
        storageBucket: "celestial-charm-auth.firebasestorage.app",
        messagingSenderId: "308419009064",
        appId: "1:308419009064:web:737ed1a2c4ebf0671fb31d",
        measurementId: "G-TR7257QW42"
    // apiKey: import.meta.env.VITE_API_KEY,
    // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    // projectId: import.meta.env.VITE_PROJECT_ID,
    // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_APP_ID,
    // measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);