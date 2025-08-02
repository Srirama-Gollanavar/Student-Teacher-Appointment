import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3_0N9tMup69l2ITZ22KTinQQmp7WSgtA",
  authDomain: "govdoc-aaa56.firebaseapp.com",
  projectId: "govdoc-aaa56",
  storageBucket: "govdoc-aaa56.appspot.com",
  messagingSenderId: "226379798240",
  appId: "1:226379798240:web:cfe0fdcd219741f1526285"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const appointmentsList = document.getElementById("appointmentsList");
const logoutBtn = document.getElementById("logoutBtn");

// Display appointments
async function loadAppointments() {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "appointment-card";
    div.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Status:</strong> <span style="color: ${data.status === "approved" ? "green" : "orange"}">${data.status}</span></p>
    `;
    appointmentsList.appendChild(div);
  });
}

loadAppointments();

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "student-login.html";
  });
});
