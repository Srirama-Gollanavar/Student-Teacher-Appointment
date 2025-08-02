import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("addTeacherForm");
const teacherList = document.getElementById("teacherList");
const message = document.getElementById("addMessage");

// Add new teacher
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("teacherName").value.trim();
  const email = document.getElementById("teacherEmail").value.trim();
  const department = document.getElementById("teacherDepartment").value.trim();
  const subject = document.getElementById("teacherSubject").value.trim();
  const experience = document.getElementById("teacherExperience").value.trim();
  const available = document.getElementById("teacherAvailable").value.trim();

  if (!name || !email || !department || !subject || !experience || !available) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "teachers"), {
      name,
      email,
      department,
      subject,
      experience,
      available,
      timestamp: new Date()
    });
    message.textContent = "Teacher added successfully!";
    message.style.color = "green";
    form.reset();
  } catch (err) {
    console.error(err);
    message.textContent = "Error adding teacher.";
    message.style.color = "red";
  }
});

// Render teacher list with update & delete
function renderTeacher(docSnap) {
  const data = docSnap.data();
  const id = docSnap.id;

  const card = document.createElement("div");
  card.className = "teacher-card";

  const name = createInput(data.name);
  const email = createInput(data.email);
  const department = createInput(data.department);
  const subject = createInput(data.subject);
  const experience = createInput(data.experience);
  const available = createInput(data.available);

  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.className = "update-btn";
  updateBtn.onclick = async () => {
    try {
      await updateDoc(doc(db, "teachers", id), {
        name: name.value,
        email: email.value,
        department: department.value,
        subject: subject.value,
        experience: experience.value,
        available: available.value
      });
      alert("Teacher updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = async () => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      await deleteDoc(doc(db, "teachers", id));
    }
  };

  const actions = document.createElement("div");
  actions.className = "teacher-actions";
  actions.appendChild(updateBtn);
  actions.appendChild(deleteBtn);

  card.append(name, email, department, subject, experience, available, actions);
  teacherList.appendChild(card);
}

// Helper: create input
function createInput(value) {
  const input = document.createElement("input");
  input.value = value;
  return input;
}

// Live updates
onSnapshot(collection(db, "teachers"), (snapshot) => {
  teacherList.innerHTML = "";
  snapshot.forEach(doc => renderTeacher(doc));
});
