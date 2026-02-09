/* ===== LOGIN VALIDATION ===== */
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    const loginType = document.getElementById("loginType").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const userError = document.getElementById("userError");
    const passError = document.getElementById("passError");
    let isValid = true;

    userError.textContent = "";
    passError.textContent = "";

    if(username === "") { userError.textContent = "Username required"; isValid = false; }
    if(password === "") { passError.textContent = "Password required"; isValid = false; }
    else if(password.length < 8) { passError.textContent = "Password min 8 characters"; isValid = false; }

    if(isValid){ alert(`${loginType} login validated`); }
});

/* ===== STUDENT REGISTRATION ===== */
document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const regNo = document.getElementById("regNo").value.trim();
    const dept = document.getElementById("department").value.trim();
    const year = document.getElementById("year").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("stuPassword").value.trim();
    const confirmPass = document.getElementById("stuConfirmPassword").value.trim();

    let isValid = true;
    document.getElementById("nameError").textContent = "";
    document.getElementById("regError").textContent = "";
    document.getElementById("deptError").textContent = "";
    document.getElementById("yearError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("mobileError").textContent = "";
    document.getElementById("stuPassError").textContent = "";
    document.getElementById("stuConfirmError").textContent = "";

    if(fullName === "" || !/^[a-zA-Z ]+$/.test(fullName)){ document.getElementById("nameError").textContent="Valid name required"; isValid=false; }
    if(regNo === "" || !/^[0-9]{4,10}$/.test(regNo)){ document.getElementById("regError").textContent="Valid register no"; isValid=false; }
    if(dept===""){ document.getElementById("deptError").textContent="Department required"; isValid=false; }
    if(year==="" || !/^[1-5]$/.test(year)){ document.getElementById("yearError").textContent="Year 1-5"; isValid=false; }
    if(email==="" || !/^[a-zA-Z0-9._%+-]+@tce\.edu$/.test(email)){ document.getElementById("emailError").textContent="Valid TCE email"; isValid=false; }
    if(mobile==="" || !/^[0-9]{10}$/.test(mobile)){ document.getElementById("mobileError").textContent="10-digit mobile"; isValid=false; }
    if(password.length<8){ document.getElementById("stuPassError").textContent="Password min 8 chars"; isValid=false; }
    if(password!==confirmPass){ document.getElementById("stuConfirmError").textContent="Passwords mismatch"; isValid=false; }

    if(isValid){ alert("Student registration validated"); }
});

/* ===== VOLUNTEER REGISTRATION ===== */
document.getElementById("volunteerForm").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("volName").value.trim();
    const regNo = document.getElementById("volRegNo").value.trim();
    const dept = document.getElementById("volDept").value.trim();
    const role = document.getElementById("volRole").value.trim();
    const slot = document.getElementById("volSlot").value.trim();
    const contact = document.getElementById("volContact").value.trim();
    let isValid = true;

    document.getElementById("volNameError").textContent="";
    document.getElementById("volRegError").textContent="";
    document.getElementById("volDeptError").textContent="";
    document.getElementById("volRoleError").textContent="";
    document.getElementById("volSlotError").textContent="";
    document.getElementById("volContactError").textContent="";

    if(name==="" || !/^[a-zA-Z ]+$/.test(name)){ document.getElementById("volNameError").textContent="Valid name required"; isValid=false; }
    if(regNo==="" || !/^[0-9]{4,10}$/.test(regNo)){ document.getElementById("volRegError").textContent="Valid reg no"; isValid=false; }
    if(dept===""){ document.getElementById("volDeptError").textContent="Department required"; isValid=false; }
    if(role===""){ document.getElementById("volRoleError").textContent="Role required"; isValid=false; }
    if(slot===""){ document.getElementById("volSlotError").textContent="Slot required"; isValid=false; }
    if(contact==="" || !/^[0-9]{10}$/.test(contact)){ document.getElementById("volContactError").textContent="Valid contact"; isValid=false; }

    if(isValid){ alert("Volunteer registration validated"); }
});

/* ===== ADMIN EVENT CREATION ===== */
document.getElementById("adminForm").addEventListener("submit", function(e){
    e.preventDefault();
    const name=document.getElementById("eventName").value.trim();
    const date=document.getElementById("eventDate").value;
    const venue=document.getElementById("eventVenue").value.trim();
    const fee=document.getElementById("eventFee").value.trim();
    const image=document.getElementById("eventImage").value;
    const desc=document.getElementById("eventDesc").value.trim();
    let isValid=true;

    document.getElementById("eventNameError").textContent="";
    document.getElementById("eventDateError").textContent="";
    document.getElementById("eventVenueError").textContent="";
    document.getElementById("eventFeeError").textContent="";
    document.getElementById("eventImageError").textContent="";
    document.getElementById("eventDescError").textContent="";

    if(name===""){ document.getElementById("eventNameError").textContent="Event name required"; isValid=false; }
    if(date===""){ document.getElementById("eventDateError").textContent="Date required"; isValid=false; }
    if(venue===""){ document.getElementById("eventVenueError").textContent="Venue required"; isValid=false; }
    if(fee==="" || fee<0){ document.getElementById("eventFeeError").textContent="Valid fee required"; isValid=false; }
    if(image===""){ document.getElementById("eventImageError").textContent="Event image required"; isValid=false; }
    if(desc===""){ document.getElementById("eventDescError").textContent="Description required"; isValid=false; }

    if(isValid){ alert("Event created successfully"); }
});

/* ===== SHOW/HIDE SECTIONS ===== */
const links = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('.form-section');

links.forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        sections.forEach(sec => sec.classList.add('hidden'));
        const targetSection = document.getElementById(targetId);
        if(targetSection) targetSection.classList.remove('hidden');
        window.scrollTo({top: targetSection.offsetTop - 60, behavior: 'smooth'});
    });
});
