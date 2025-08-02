document.addEventListener("DOMContentLoaded", () => {
  const appointmentCard = document.getElementById("appointmentCard");
  const viewCard = document.getElementById("viewCard");
  const messageCard = document.getElementById("messageCard");
  const logoutBtn = document.getElementById("logoutBtn");

  appointmentCard.addEventListener("click", () => {
    window.location.href = "/page/stu-appoint.html";
  });

  viewCard.addEventListener("click", () => {
    window.location.href = "/page/stu-appi-view.html";
  });

  messageCard.addEventListener("click", () => {
    window.location.href = "/page/stu-msg.html";
  });

  logoutBtn.addEventListener("click", () => {
    // Optionally, clear local storage or session data
    // localStorage.removeItem("studentSession");
    window.location.href = "/page/home.html";
  });
});
