const API_BASE_URL = "https://task-manager-dfbv.onrender.com/api/auth";

// Handle Registration
document
  .getElementById("register-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html"; // Redirect to login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  });

// Handle Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html"; // Redirect to dashboard
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login Error:", error);
  }
});
