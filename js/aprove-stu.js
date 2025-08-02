import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const studentRef = collection(db, "students");

const requestList = document.getElementById("requestList");

onSnapshot(studentRef, (snapshot) => {
  requestList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const card = document.createElement("div");
    card.className = "request-card";

    card.innerHTML = `
      <div class="info"><strong>Name:</strong> ${data.name}</div>
      <div class="info"><strong>Email:</strong> ${data.email}</div>
      <div class="info"><strong>Status:</strong> <span class="status">${data.status}</span></div>
      <div class="buttons">
        <button class="approve">Approve</button>
        <button class="reject">Reject</button>
      </div>
    `;

    const approveBtn = card.querySelector(".approve");
    const rejectBtn = card.querySelector(".reject");
    const statusSpan = card.querySelector(".status");

    // Disable buttons if already approved/rejected
    if (data.status === "Approved" || data.status === "Rejected") {
      approveBtn.disabled = true;
      rejectBtn.disabled = true;
    }

    approveBtn.addEventListener("click", async () => {
      await updateDoc(doc(studentRef, id), { status: "Approved" });
    });

    rejectBtn.addEventListener("click", async () => {
      await updateDoc(doc(studentRef, id), { status: "Rejected" });
    });

    requestList.appendChild(card);
  });
});
