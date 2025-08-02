import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD3_0N9tMup69l2ITZ22KTinQQmp7WSgtA",
  authDomain: "govdoc-aaa56.firebaseapp.com",
  projectId: "govdoc-aaa56",
  storageBucket: "govdoc-aaa56.appspot.com",
  messagingSenderId: "226379798240",
  appId: "1:226379798240:web:cfe0fdcd219741f1526285",
  measurementId: "G-YYN5FRMWQR"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const appointmentsList = document.getElementById("appointmentsList");

async function fetchAppointments() {
  const snapshot = await getDocs(collection(db, "appointments"));
  appointmentsList.innerHTML = "";

  if (snapshot.empty) {
    appointmentsList.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const appointmentDiv = document.createElement("div");
    appointmentDiv.className = "appointment-item";

    const isApproved = data.status === "approved";

    appointmentDiv.innerHTML = `
      <div>
        <strong>${data.name}</strong>
        <span>Email: ${data.email}</span>
        <span>Date: ${data.date}</span>
        <span>Message: ${data.message}</span>
        <span>Status: <b>${isApproved ? "✅ Approved" : "⏳ Pending"}</b></span>
      </div>
      <div class="action-btns">
        <button class="approve"${isApproved ? " disabled" : ""}>Approve</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Delete functionality
    appointmentDiv.querySelector(".delete").addEventListener("click", async () => {
      await deleteDoc(doc(db, "appointments", docSnap.id));
      fetchAppointments();
    });

    // Approve functionality
    const approveBtn = appointmentDiv.querySelector(".approve");
    if (!isApproved) {
      approveBtn.addEventListener("click", async () => {
        await updateDoc(doc(db, "appointments", docSnap.id), {
          status: "approved"
        });
        fetchAppointments();
      });
    }

    appointmentsList.appendChild(appointmentDiv);
  });
}

fetchAppointments();
