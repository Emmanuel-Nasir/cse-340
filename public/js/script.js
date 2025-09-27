document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".login-form");
  if (!form) return; // Exit if no login form on page

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let messages = [];

    // Check email
    if (!email.value.trim()) {
      messages.push("Please enter your email.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      messages.push("Please enter a valid email address.");
      isValid = false;
    }

    // Check password
    if (!password.value.trim()) {
      messages.push("Please enter your password.");
      isValid = false;
    }

    // Show alert if there are errors
    if (!isValid) {
      event.preventDefault();
      alert(messages.join("\n"));
    }
  });

  // Redirect to registration page if this is a GET request (i.e., page refresh) on login page
  if (
    window.location.pathname === "/account/login" &&
    window.performance &&
    window.performance.navigation.type === 1
  ) {
    window.location.href = "/account/register";
  }
});
