import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const messageRef = collection(db, "messages");

// Simulate logged-in user
const currentUser = "Admin";

const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const container = document.getElementById("chatContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;

  try {
    await addDoc(messageRef, {
      sender: currentUser,
      message: msg,
      timestamp: serverTimestamp()
    });
    input.value = "";
  } catch (err) {
    console.error("Error sending message:", err);
  }
});

const q = query(messageRef, orderBy("timestamp"));
onSnapshot(q, (snapshot) => {
  container.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const time = data.timestamp?.toDate().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }) || "sending...";

    const msgEl = document.createElement("div");
    msgEl.classList.add("message");

    // Align own messages to the right
    if (data.sender === currentUser) {
      msgEl.classList.add("right");
    } else {
      msgEl.classList.add("left");
    }

    msgEl.innerHTML = `
      <div class="sender">${data.sender}</div>
      <div>${data.message}</div>
      <div class="time">${time}</div>
    `;

    container.appendChild(msgEl);
  });

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
});
