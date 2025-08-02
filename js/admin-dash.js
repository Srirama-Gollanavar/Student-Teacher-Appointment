import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const addTeacherForm = document.getElementById("addTeacherForm");
const teacherList = document.getElementById("teacherList");
const addMessage = document.getElementById("addMessage");

// Add Teacher
addTeacherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("teacherName").value.trim();
  const subject = document.getElementById("teacherSubject").value.trim();

  if (!name || !subject) {
    addMessage.textContent = "Please fill in all fields.";
    addMessage.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "teachers"), { name, subject, timestamp: new Date() });
    addMessage.textContent = "Teacher added successfully!";
    addMessage.style.color = "green";
    addTeacherForm.reset();
  } catch (err) {
    addMessage.textContent = "Error: " + err.message;
    addMessage.style.color = "red";
  }
});

// Render teacher cards
function renderTeacher(docSnap) {
  const data = docSnap.data();
  const div = document.createElement("div");
  div.innerHTML = `
    <strong>${data.name}</strong> - ${data.subject}
    <button onclick="deleteTeacher('${docSnap.id}')">Delete</button>
  `;
  teacherList.appendChild(div);
}

// Live teacher updates
onSnapshot(collection(db, "teachers"), (snapshot) => {
  teacherList.innerHTML = "";
  snapshot.forEach((docSnap) => renderTeacher(docSnap));
});

// Delete Teacher
window.deleteTeacher = async (id) => {
  try {
    await deleteDoc(doc(db, "teachers", id));
  } catch (err) {
    alert("Failed to delete: " + err.message);
  }
};

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "/page/home.html";
    })
    .catch((error) => {
      alert("Logout failed: " + error.message);
    });
});
