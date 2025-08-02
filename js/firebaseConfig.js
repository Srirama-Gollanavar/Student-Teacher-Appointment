
// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3_0N9tMup69l2ITZ22KTinQQmp7WSgtA",
  authDomain: "govdoc-aaa56.firebaseapp.com",
  projectId: "govdoc-aaa56",
  storageBucket: "govdoc-aaa56.appspot.com",
  messagingSenderId: "226379798240",
  appId: "1:226379798240:web:cfe0fdcd219741f1526285",
  measurementId: "G-YYN5FRMWQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
