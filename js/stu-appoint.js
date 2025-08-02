import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const reason = document.getElementById("reason").value.trim();
  const confirmationMsg = document.getElementById("confirmationMessage");

  if (!name || !email || !date || !time || !reason) {
    confirmationMsg.textContent = "Please fill in all fields.";
    confirmationMsg.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "appointments"), {
      name,
      email,
      date,
      time,
      reason,
      status: "pending"
    });

    confirmationMsg.textContent = "Appointment booked successfully!";
    confirmationMsg.style.color = "green";
    document.getElementById("appointmentForm").reset();
  } catch (error) {
    confirmationMsg.textContent = "Error booking appointment: " + error.message;
    confirmationMsg.style.color = "red";
  }
});
