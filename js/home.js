document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      alert(`Redirecting to ${card.textContent} page...`);
      // Optional: window.location.href = `${card.textContent.toLowerCase()}.html`;
    });
  });
});
