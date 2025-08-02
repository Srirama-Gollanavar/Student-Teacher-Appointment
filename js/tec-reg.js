import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3_0N9tMup69l2ITZ22KTinQQmp7WSgtA",
  authDomain: "govdoc-aaa56.firebaseapp.com",
  projectId: "govdoc-aaa56",
  storageBucket: "govdoc-aaa56.appspot.com",
  messagingSenderId: "226379798240",
  appId: "1:226379798240:web:cfe0fdcd219741f1526285",
  measurementId: "G-YYN5FRMWQR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    message.textContent = "Please fill all fields.";
    message.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "teachers"), { name, email, password });
    message.textContent = "Registration successful!";
    message.style.color = "green";
    registerForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    message.textContent = "Something went wrong. Try again.";
    message.style.color = "red";
  }
});
