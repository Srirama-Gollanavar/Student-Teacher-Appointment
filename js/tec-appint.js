import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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
const auth = getAuth(app);

const appointmentsContainer = document.getElementById("appointmentsContainer");

async function fetchAppointments() {
  appointmentsContainer.innerHTML = "<p>Loading appointments...</p>";
  const querySnapshot = await getDocs(collection(db, "appointments"));
  displayAppointments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}

function displayAppointments(appointments) {
  appointmentsContainer.innerHTML = "";

  appointments.forEach(appointment => {
    const card = document.createElement("div");
    card.className = "appointment-card";

    card.innerHTML = `
      <h3>${appointment.studentName}</h3>
      <p>Date: ${appointment.date}</p>
      <p>Time: ${appointment.time}</p>
      <p class="status">Status: ${appointment.status}</p>
      <div class="actions">
        ${appointment.status === "pending" ? `
          <button class="approve" onclick="updateStatus('${appointment.id}', 'approved')">Approve</button>
          <button class="reject" onclick="updateStatus('${appointment.id}', 'rejected')">Reject</button>
        ` : ""}
      </div>
    `;

    appointmentsContainer.appendChild(card);
  });
}

window.updateStatus = async (id, newStatus) => {
  const docRef = doc(db, "appointments", id);
  await updateDoc(docRef, { status: newStatus });
  fetchAppointments();
};

window.filterAppointments = async (status) => {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  let appointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (status !== "all") {
    appointments = appointments.filter(a => a.status === status);
  }
  displayAppointments(appointments);
};

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "tech-dash.html";
  });
});

// Initial load
fetchAppointments();
