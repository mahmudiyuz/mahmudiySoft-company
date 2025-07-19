AOS.init({ duration: 1000, once: true });

// Form validation and submission
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input fields
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  let isValid = true;
  document.querySelectorAll(".error-text").forEach((el) => el.remove());

  // Check name is valid
  if (name.value.trim() === "") {
    showError(name, "Please enter your name");
    isValid = false;
  }

  // check email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    showError(email, "Please enter your email");
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  // check message is valid
  if (message.value.trim() === "") {
    showError(message, "Please enter your message");
    isValid = false;
  }

  // check, are all field valid
  if (isValid) {
    // get input values
    const body = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    // post message api
    try {
      isLoading(true);

      await fetch("https://api-mahmudiy-uz.onrender.com/create-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      document.getElementById("successModal").classList.remove("hidden");
      e.target.reset();
    } catch (error) {
      showError(
        message,
        "Error on sending message. Please, check and try again!"
      );
      isValid = false;
      throw error;
    } finally {
      isLoading(false);
    }
  }
});

// Show error, when inputs invalid
function showError(inputElement, message) {
  const error = document.createElement("div");
  error.className = "error-text text-red-500 text-sm mt-1";
  error.textContent = message;
  inputElement.parentNode.appendChild(error);
}

// Close sucess modal
function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden");
}

// toggle loader
function isLoading(isLoader) {
  const loader = document.querySelector(".loader").classList;

  if (isLoader) return loader.remove("hidden");
  loader.add("hidden");
}

// Close modal, while click ESC keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSuccessModal();
  }
});
