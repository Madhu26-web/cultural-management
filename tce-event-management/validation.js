function showSection(id) {
    let sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

function register() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let studentId = document.getElementById("studentId").value.trim();
    let regNumber = document.getElementById("regNumber").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let error = document.getElementById("regError");

    if (!email.includes(".tce")) {
        error.innerText = "Email must contain .tce";
        return;
    }

    if (!studentId.includes("@student")) {
        error.innerText = "Student ID must contain @student";
        return;
    }

    if (!/^\d{16}$/.test(regNumber)) {
        error.innerText = "Register number must be 16 digits";
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        error.innerText = "Phone number must be 10 digits";
        return;
    }

    if (name === "" || password === "") {
        error.innerText = "All fields are required";
        return;
    }

    error.innerText = "";
    alert("Registration Successful");
    showSection("login");
}

function login() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let error = document.getElementById("loginError");

    if (email === "" || password === "") {
        error.innerText = "Enter Email and Password";
        return;
    }

    error.innerText = "";
    showSection("dashboard");
}

function logout() {
    showSection("home");
}