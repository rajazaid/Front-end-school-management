const token = localStorage.getItem("token");
function validateLoginForm(event) {
    event.preventDefault(); 

    const username = document.getElementById("loginusername").value;
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
      alert("Please fill in all fields.");
      return false;
    }

    loginUser(username, password);
    return false;
  }


  async function loginUser(username, password) {
    const response = await fetch("https://localhost:7257/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token.result; 

      localStorage.setItem("token", token); 
      window.location.href = "index.html"; 
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Login failed");
    }
  }


function validateRegistrationForm(event) {
event.preventDefault(); 

const username = document.getElementById("regUsername").value;
const email = document.getElementById("regEmail").value;
const password = document.getElementById("regPassword").value;

const isAdmin = document.getElementById("isAdmin").checked;
const role = isAdmin ? "Admin" : "User";

if (!username || !email || !password) {
  alert("Please fill in all fields.");
  return false;
}

registerUser(username, email, password, role);
return false;
}

async function registerUser(username, email, password, role) {
const response = await fetch("https://localhost:7257/api/auth/register?role=" + role, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: username,
    email: email,
    password: password,
  }),
});

if (response.ok) {
  alert("Registration successful. Please login.");
  document.getElementById("check").checked = false; 
} else {
  const errorData = await response.json();
  alert(errorData.message || "Registration failed");
}
}


