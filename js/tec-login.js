import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3_0N9tMup69l2ITZ22KTinQQmp7WSgtA",
  authDomain: "govdoc-aaa56.firebaseapp.com",
  projectId: "govdoc-aaa56",
  storageBucket: "govdoc-aaa56.appspot.com",
  messagingSenderId: "226379798240",
  appId: "1:226379798240:web:cfe0fdcd219741f1526285"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.getElementById("teacherLoginForm");
const loginMessage = document.getElementById("loginMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "tech-dash.html";
    }, 1500);
  } catch (error) {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Invalid email or password.";
  }
});
