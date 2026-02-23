/* NAVIGATION */
const links=document.querySelectorAll("header nav a");
const sections=document.querySelectorAll(".form-section");

links.forEach(link=>{
link.addEventListener("click",function(e){
e.preventDefault();
const targetId=this.getAttribute("href").substring(1);
sections.forEach(sec=>sec.classList.add("hidden"));
const target=document.getElementById(targetId);
if(target){
target.classList.remove("hidden");
target.scrollIntoView({behavior:"smooth"});
}
});
});

/* HERO BUTTON EVENTS */
document.getElementById("viewEventsBtn").onclick=()=>{
document.getElementById("events").scrollIntoView({behavior:"smooth"});
};

document.getElementById("registerBtn").onclick=()=>{
document.getElementById("register-section").classList.remove("hidden");
document.getElementById("register-section").scrollIntoView({behavior:"smooth"});
};

/* MOUSEOVER EVENT CARDS */
function addCardHover(){
const cards=document.querySelectorAll(".event-card");
cards.forEach(card=>{
card.onmouseover=()=>{
card.style.transform="scale(1.05)";
card.style.boxShadow="0 15px 35px rgba(0,0,0,0.2)";
};
card.onmouseout=()=>{
card.style.transform="scale(1)";
card.style.boxShadow="0 8px 20px rgba(0,0,0,0.1)";
};
});
}
addCardHover();

/* DOUBLE CLICK LOGO */
document.getElementById("logo").ondblclick=()=>{
alert("Welcome to TCE EventHub!");
};

/* LOGIN VALIDATION */
document.getElementById("loginForm").onsubmit=function(e){
e.preventDefault();
let user=document.getElementById("username").value.trim();
let pass=document.getElementById("password").value.trim();

if(user===""||pass.length<8){
alert("Invalid Login");
}else{
alert("Login Successful");
}
};

/* ENTER KEY LOGIN */
document.getElementById("password").onkeydown=function(e){
if(e.key==="Enter"){
document.getElementById("loginForm").requestSubmit();
}
};

/* PASSWORD STRENGTH */
document.getElementById("stuPassword").onkeyup=function(){
let value=this.value;
let msg=document.getElementById("stuPassError");

if(value.length<6){
msg.textContent="Weak Password";
msg.style.color="red";
}
else if(value.length<10){
msg.textContent="Medium Password";
msg.style.color="orange";
}
else{
msg.textContent="Strong Password";
msg.style.color="green";
}
};

/* ADMIN CREATE EVENT (DOM MANIPULATION) */
document.getElementById("adminForm").onsubmit=function(e){
e.preventDefault();

let name=document.getElementById("eventName").value;
let date=document.getElementById("eventDate").value;
let image=document.getElementById("eventImage").files[0];

if(name===""||date===""||!image){
alert("Fill all fields");
return;
}

const grid=document.getElementById("eventGrid");
const newCard=document.createElement("div");
newCard.className="event-card";

newCard.innerHTML=`
<div class="poster">
<img src="${URL.createObjectURL(image)}">
</div>
<h3>${name}</h3>
<p>${date}</p>
<button class="btn-primary">Register</button>
`;

grid.appendChild(newCard);

addCardHover(); 
this.reset();
alert("Event Created Dynamically!");
};