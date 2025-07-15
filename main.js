document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  let isValid = true;
  document.querySelectorAll(".error-text").forEach((el) => el.remove());

  if (name.value.trim() === "") {
    showError(name, "Please enter your name");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    showError(email, "Please enter your email");
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  if (message.value.trim() === "") {
    showError(message, "Please enter your message");
    isValid = false;
  }

  if (isValid) {
    document.getElementById("successModal").classList.remove("hidden");
    e.target.reset();
  }

  function showError(inputElement, message) {
    const error = document.createElement("div");
    error.className = "error-text text-red-500 text-sm mt-1";
    error.textContent = message;
    inputElement.parentNode.appendChild(error);
  }
});

function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden");
}

// ESC bosilganda modalni yopish
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSuccessModal();
  }
});
