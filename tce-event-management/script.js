// ------------------ STUDENT REGISTER ------------------
if(document.getElementById("studentForm")){
studentForm.addEventListener("submit",function(e){
e.preventDefault();

let name=sName.value.trim();
let email=sEmail.value.trim();
let pass=sPass.value.trim();
let errors=document.querySelectorAll(".error");
errors.forEach(e=>e.textContent="");

if(name.length<3) return errors[0].textContent="Name must be at least 3 characters";
if(!email.includes("@")) return errors[1].textContent="Invalid Email";
if(pass.length<6) return errors[2].textContent="Password must be 6+ characters";

let students=JSON.parse(localStorage.getItem("students"))||[];
if(students.find(s=>s.email===email)){
return errors[1].textContent="Email already registered";
}

students.push({email,pass});
localStorage.setItem("students",JSON.stringify(students));
sSuccess.textContent="Registered Successfully!";
this.reset();
});
}

// ------------------ VOLUNTEER REGISTER ------------------
if(document.getElementById("volunteerForm")){
volunteerForm.addEventListener("submit",function(e){
e.preventDefault();

let name=vName.value.trim();
let email=vEmail.value.trim();
let pass=vPass.value.trim();
let errors=document.querySelectorAll(".error");
errors.forEach(e=>e.textContent="");

if(name.length<3) return errors[0].textContent="Name must be at least 3 characters";
if(!email.includes("@")) return errors[1].textContent="Invalid Email";
if(pass.length<6) return errors[2].textContent="Password must be 6+ characters";

let volunteers=JSON.parse(localStorage.getItem("volunteers"))||[];
if(volunteers.find(v=>v.email===email)){
return errors[1].textContent="Email already registered";
}

volunteers.push({email,pass});
localStorage.setItem("volunteers",JSON.stringify(volunteers));
vSuccess.textContent="Registered Successfully!";
this.reset();
});
}

// ------------------ LOGIN ------------------
if(document.getElementById("loginForm")){
loginForm.addEventListener("submit",function(e){
e.preventDefault();

let role=role.value;
let email=loginEmail.value.trim();
let pass=loginPass.value.trim();

if(role==="") return document.querySelectorAll(".error")[0].textContent="Select Role";

if(role==="admin"){
if(email==="admin@gmail.com"&&pass==="admin123"){
window.location="admin.html";
}else{
loginError.textContent="Invalid Admin Credentials";
}
}

if(role==="student"){
let students=JSON.parse(localStorage.getItem("students"))||[];
let found=students.find(s=>s.email===email&&s.pass===pass);
if(found) window.location="index.html";
else loginError.textContent="Invalid Student Credentials";
}

if(role==="volunteer"){
let volunteers=JSON.parse(localStorage.getItem("volunteers"))||[];
let found=volunteers.find(v=>v.email===email&&v.pass===pass);
if(found) window.location="index.html";
else loginError.textContent="Invalid Volunteer Credentials";
}
});
}

// ------------------ ADMIN EVENT SYSTEM ------------------
if(document.getElementById("eventForm")){
loadAdminEvents();
updateStats();

eventForm.addEventListener("submit",function(e){
e.preventDefault();

let name=eName.value.trim();
let date=eDate.value;
let loc=eLocation.value.trim();
let desc=eDesc.value.trim();
let limit=parseInt(eLimit.value);
let editIndex=editIndex.value;

let errors=document.querySelectorAll(".error");
errors.forEach(e=>e.textContent="");

if(name.length<3) return errors[0].textContent="Event name too short";
if(date==="") return errors[1].textContent="Select date";
if(loc==="") return errors[2].textContent="Location required";
if(desc.length<10) return errors[3].textContent="Description too short";
if(!limit||limit<=0) return errors[4].textContent="Invalid seat limit";

let events=JSON.parse(localStorage.getItem("events"))||[];

let eventData={
name,date,loc,desc,limit,
volunteers:[],
registrations:[]
};

if(editIndex==="") events.push(eventData);
else events[editIndex]=eventData;

localStorage.setItem("events",JSON.stringify(events));
eventSuccess.textContent="Event Saved!";
this.reset();
document.getElementById("editIndex").value="";
loadAdminEvents();
updateStats();
});
}

function loadAdminEvents(){
let events=JSON.parse(localStorage.getItem("events"))||[];
let container=document.getElementById("adminEventList");
if(!container) return;

container.innerHTML="";

events.forEach((event,index)=>{
let div=document.createElement("div");
div.className="event-card";
div.innerHTML=`
<h4>${event.name}</h4>
<p>${event.date} | ${event.loc}</p>
<p>Registrations: ${event.registrations.length}/${event.limit}</p>
<button onclick="editEvent(${index})">Edit</button>
<button onclick="deleteEvent(${index})">Delete</button>
<button onclick="assignVolunteer(${index})">Assign Volunteer</button>
`;
container.appendChild(div);
});
}

function editEvent(index){
let events=JSON.parse(localStorage.getItem("events"));
let event=events[index];
eName.value=event.name;
eDate.value=event.date;
eLocation.value=event.loc;
eDesc.value=event.desc;
eLimit.value=event.limit;
document.getElementById("editIndex").value=index;
}

function deleteEvent(index){
let events=JSON.parse(localStorage.getItem("events"));
events.splice(index,1);
localStorage.setItem("events",JSON.stringify(events));
loadAdminEvents();
updateStats();
}

function assignVolunteer(index){
let email=prompt("Enter Volunteer Email:");
let volunteers=JSON.parse(localStorage.getItem("volunteers"))||[];
if(!volunteers.find(v=>v.email===email)){
alert("Volunteer not found!");
return;
}
let events=JSON.parse(localStorage.getItem("events"));
events[index].volunteers.push(email);
localStorage.setItem("events",JSON.stringify(events));
alert("Volunteer Assigned!");
}

// ------------------ USER EVENT DISPLAY ------------------
if(document.getElementById("eventList")){
loadUserEvents();
}

function loadUserEvents(){
let events=JSON.parse(localStorage.getItem("events"))||[];
let container=document.getElementById("eventList");
container.innerHTML="";

events.forEach((event,index)=>{
let remaining=event.limit-event.registrations.length;
let div=document.createElement("div");
div.className="event-card";
div.innerHTML=`
<h3>${event.name}</h3>
<p><b>Date:</b> ${event.date}</p>
<p><b>Location:</b> ${event.loc}</p>
<p>${event.desc}</p>
<p><b>Seats Left:</b> ${remaining}/${event.limit}</p>
<button onclick="registerEvent(${index})" ${remaining<=0?"disabled":""}>
${remaining<=0?"Full":"Register"}
</button>
`;
container.appendChild(div);
});
}

function registerEvent(index){
let email=prompt("Enter your registered student email:");
if(!email) return;

let students=JSON.parse(localStorage.getItem("students"))||[];
if(!students.find(s=>s.email===email)){
alert("Student not found!");
return;
}

let events=JSON.parse(localStorage.getItem("events"));
let event=events[index];

if(event.registrations.length>=event.limit){
alert("Event Full!");
return;
}

if(event.registrations.includes(email)){
alert("Already Registered!");
return;
}

event.registrations.push(email);
localStorage.setItem("events",JSON.stringify(events));
alert("Registration Successful!");
loadUserEvents();
updateStats();
}

// ------------------ DASHBOARD STATS ------------------
function updateStats(){
let events=JSON.parse(localStorage.getItem("events"))||[];
let students=JSON.parse(localStorage.getItem("students"))||[];
let volunteers=JSON.parse(localStorage.getItem("volunteers"))||[];

let totalReg=0;
events.forEach(e=>totalReg+=e.registrations.length);

if(totalEvents) totalEvents.textContent=events.length;
if(totalStudents) totalStudents.textContent=students.length;
if(totalVolunteers) totalVolunteers.textContent=volunteers.length;
if(totalRegistrations) totalRegistrations.textContent=totalReg;
}