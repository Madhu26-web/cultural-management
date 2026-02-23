/* ======================================================
   WINDOW EVENTS
====================================================== */

// Page Load
window.addEventListener("load", function () {
    console.log("TCE EventHub Loaded Successfully");
});

// Navbar shadow on scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
    } else {
        navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    }
});

// Resize event
window.addEventListener("resize", function () {
    console.log("Screen width: " + window.innerWidth);
});

/* ======================================================
   NAVIGATION
====================================================== */

const navLinks = document.querySelectorAll("header nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);

        // Hide all form sections
        document.querySelectorAll(".form-section")
            .forEach(sec => sec.classList.add("hidden"));

        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            if (targetSection.classList.contains("form-section")) {
                targetSection.classList.remove("hidden");
            }

            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Hero Buttons
document.getElementById("viewEventsBtn")
    .addEventListener("click", function () {
        document.getElementById("events")
            .scrollIntoView({ behavior: "smooth" });
    });

document.getElementById("heroRegisterBtn")
    .addEventListener("click", function () {

        document.querySelectorAll(".form-section")
            .forEach(sec => sec.classList.add("hidden"));

        const registerSection = document.getElementById("register-section");

        registerSection.classList.remove("hidden");
        registerSection.scrollIntoView({ behavior: "smooth" });
    });

/* ======================================================
   MOUSE EVENTS
====================================================== */

function highlightCard() {
    this.style.transform = "scale(1.05)";
    this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.2)";
}

function removeHighlight() {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
}

const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach(card => {
    card.addEventListener("mouseover", highlightCard);
    card.addEventListener("mouseout", removeHighlight);
});

// Remove mouseover after 20 seconds (removeEventListener demo)
setTimeout(() => {
    eventCards.forEach(card => {
        card.removeEventListener("mouseover", highlightCard);
    });
    console.log("Mouseover event removed");
}, 20000);

/* ======================================================
   LOGIN VALIDATION
====================================================== */

document.getElementById("loginForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const loginType = document.getElementById("loginType").value;
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        let valid = true;

        document.getElementById("userError").textContent = "";
        document.getElementById("passError").textContent = "";

        // Username validation
        if (username === "") {
            document.getElementById("userError").textContent =
                "Username is required";
            valid = false;
        }

        // Password validation
        if (password.length < 8) {
            document.getElementById("passError").textContent =
                "Password must be minimum 8 characters";
            valid = false;
        }

        if (valid) {
            alert(loginType + " Login Successful");
            this.reset();
        }
    });

// ENTER KEY submit
document.getElementById("password")
    .addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            document.getElementById("loginForm").requestSubmit();
        }
    });

/* ======================================================
   STUDENT REGISTRATION
====================================================== */

document.getElementById("studentForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const password = document.getElementById("stuPassword").value.trim();
        const confirm = document.getElementById("stuConfirmPassword").value.trim();

        let valid = true;

        document.getElementById("nameError").textContent = "";
        document.getElementById("stuPassError").textContent = "";
        document.getElementById("stuConfirmError").textContent = "";

        if (name === "" || !/^[a-zA-Z ]+$/.test(name)) {
            document.getElementById("nameError").textContent =
                "Valid name required";
            valid = false;
        }

        if (password.length < 8) {
            document.getElementById("stuPassError").textContent =
                "Minimum 8 characters required";
            valid = false;
        }

        if (password !== confirm) {
            document.getElementById("stuConfirmError").textContent =
                "Passwords do not match";
            valid = false;
        }

        if (valid) {
            alert("Student Registration Successful");
            this.reset();
        }
    });

// Password strength indicator
document.getElementById("stuPassword")
    .addEventListener("keyup", function () {

        const val = this.value;
        const msg = document.getElementById("stuPassError");

        if (val.length < 6) {
            msg.textContent = "Weak password";
            msg.style.color = "red";
        } else if (val.length < 10) {
            msg.textContent = "Medium password";
            msg.style.color = "orange";
        } else {
            msg.textContent = "Strong password";
            msg.style.color = "green";
        }
    });

/* ======================================================
   VOLUNTEER REGISTRATION
====================================================== */

document.getElementById("volunteerForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("volName").value.trim();
        const reg = document.getElementById("volRegNo").value.trim();
        const contact = document.getElementById("volContact").value.trim();

        let valid = true;

        document.getElementById("volNameError").textContent = "";
        document.getElementById("volRegError").textContent = "";
        document.getElementById("volContactError").textContent = "";

        if (name === "" || !/^[a-zA-Z ]+$/.test(name)) {
            document.getElementById("volNameError").textContent =
                "Valid name required";
            valid = false;
        }

        if (!/^[0-9]{4,10}$/.test(reg)) {
            document.getElementById("volRegError").textContent =
                "Valid Register Number required";
            valid = false;
        }

        if (!/^[0-9]{10}$/.test(contact)) {
            document.getElementById("volContactError").textContent =
                "Valid 10-digit number required";
            valid = false;
        }

        if (valid) {
            alert("Volunteer Registration Successful");
            this.reset();
        }
    });

/* ======================================================
   ADMIN EVENT CREATION
====================================================== */

document.getElementById("adminForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("eventName").value.trim();
        const date = document.getElementById("eventDate").value;
        const image = document.getElementById("eventImage").files[0];

        let valid = true;

        document.getElementById("eventNameError").textContent = "";
        document.getElementById("eventDateError").textContent = "";
        document.getElementById("eventImageError").textContent = "";

        if (name === "") {
            document.getElementById("eventNameError").textContent =
                "Event name required";
            valid = false;
        }

        if (date === "") {
            document.getElementById("eventDateError").textContent =
                "Event date required";
            valid = false;
        }

        if (!image) {
            document.getElementById("eventImageError").textContent =
                "Event image required";
            valid = false;
        }

        if (valid) {

            const grid = document.querySelector(".event-grid");

            const newCard = document.createElement("div");
            newCard.classList.add("event-card");

            newCard.innerHTML = `
                <div class="poster">
                    <img src="${URL.createObjectURL(image)}">
                </div>
                <h3>${name}</h3>
                <p>${date}</p>
                <button class="btn-primary">Register</button>
            `;

            grid.appendChild(newCard);

            alert("Event Created Successfully");
            this.reset();
        }
    });

/* ======================================================
   DOUBLE CLICK EVENT
====================================================== */

document.querySelector(".logo")
    .addEventListener("dblclick", function () {
        alert("Welcome to TCE EventHub!");
    });