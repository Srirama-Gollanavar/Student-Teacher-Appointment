import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMsg.style.color = "green";
    loginMsg.textContent = "Login successful!";
    // Redirect or load next page after a delay
    setTimeout(() => {
      window.location.href = "/page/stu-dash.html"; // update path
    }, 1000);
  } catch (error) {
    loginMsg.style.color = "red";
    loginMsg.textContent = "Error: " + error.message;
  }
});
