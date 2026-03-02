// --- DATA INITIALIZATION ---
let events = JSON.parse(localStorage.getItem('globalEvents')) || [
    { id: 1, title: "Symposium '26", cat: "Technical", venue: "IT Dept", coords: {top:'20%', left:'15%'}, cap: 50, allowPass: true },
    { id: 2, title: "Hackathon", cat: "Coding", venue: "CSE Dept", coords: {top:'20%', right:'15%'}, cap: 60, allowPass: true }
];

let deptStats = JSON.parse(localStorage.getItem('deptStats')) || [
    { name: "IT Dept", code: "IT", reg: 100, present: 48 },
    { name: "CSE Dept", code: "CS", reg: 120, present: 15 },
    { name: "Auditorium", code: "AUD", reg: 200, present: 5 }
];

let myRegs = JSON.parse(localStorage.getItem('myEvents')) || [];
let pendingEvent = null;

// --- NAVIGATION ---
function showPage(pId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pId).style.display = (pId === 'home') ? 'flex' : 'block';
    
    if(pId === 'events') renderEvents();
    if(pId === 'admin') renderAdmin();
    if(pId === 'portal') renderPortal();
    if(pId === 'gallery') renderGallery();
    if(pId === 'leaderboard') renderLeaderboard();
}

// --- RENDERERS ---
function renderEvents() {
    const role = localStorage.getItem('userRole');
    document.getElementById('event-container').innerHTML = events.map(ev => `
        <div class="card">
            <small style="color:var(--tce-orange); font-weight:800;">${ev.cat}</small>
            <h3>${ev.title}</h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">📍 ${ev.venue}</p>
            ${role === 'student' ? `<button class="btn-portal" style="width:100%; margin-top:15px;" onclick="openMap(${ev.id})">Register</button>` : ''}
            ${role === 'admin' ? `<button onclick="deleteEvent(${ev.id})" style="background:var(--danger); color:white; border:none; padding:8px 15px; margin-top:10px; border-radius:5px; cursor:pointer; font-weight:600;">Delete Event</button>` : ''}
        </div>
    `).join('');
}

function renderLeaderboard() {
    document.getElementById('leaderboard-cont').innerHTML = deptStats.map(d => {
        const p = Math.round((d.present/d.reg)*100);
        return `<div style="margin-bottom:20px;"><strong>${d.name}</strong> <span style="float:right; color:var(--tce-orange); font-weight:bold;">${p}%</span>
                <div class="progress-bg"><div class="progress-fill" style="width:${p}%"></div></div></div>`;
    }).join('');
}

function renderPortal() {
    const cont = document.getElementById('my-events-container');
    cont.innerHTML = myRegs.map(title => {
        const evData = events.find(e => e.title === title);
        const canDownload = evData ? evData.allowPass : true;
        return `
            <div class="card">
                <small style="color:var(--success); font-weight:bold;">Status: Registered</small>
                <h3>${title}</h3>
                ${canDownload ? `<button class="btn-portal" style="width:100%; margin-top:15px; background:#6366f1;" onclick="viewPass('${title}')">View Entry Pass</button>` : `<button class="btn-portal" style="width:100%; margin-top:15px; background:#94a3b8;" disabled>Pass Locked</button>`}
            </div>
        `;
    }).join('') || "You haven't registered for any events yet.";
}

// --- CORE LOGIC ---
function openMap(id) {
    const ev = events.find(e => e.id === id);
    const dept = deptStats.find(d => ev.venue.includes(d.name.split(' ')[0]));
    pendingEvent = ev;
    document.getElementById('map-modal').style.display = 'flex';
    document.getElementById('venue-info').innerText = `Venue: ${ev.venue}`;
    Object.assign(document.getElementById('event-venue').style, { top:'', left:'', right:'', bottom:'', ...ev.coords });

    if(dept && dept.present >= ev.cap) {
        document.getElementById('map-card').classList.add('red-glow');
        document.getElementById('red-alert-banner').style.display = 'block';
        document.getElementById('reg-confirm-btn').disabled = true;
        document.getElementById('reg-confirm-btn').innerText = "Locked: Overcrowded";
    } else {
        document.getElementById('map-card').classList.remove('red-glow');
        document.getElementById('red-alert-banner').style.display = 'none';
        document.getElementById('reg-confirm-btn').disabled = false;
        document.getElementById('reg-confirm-btn').innerText = "Confirm Registration";
    }
}

function confirmRegistration() {
    if(!myRegs.includes(pendingEvent.title)) {
        myRegs.push(pendingEvent.title);
        localStorage.setItem('myEvents', JSON.stringify(myRegs));
        document.getElementById('map-modal').style.display = 'none';
        showPage('portal');
    }
}

function viewPass(title) {
    document.getElementById('pass-event-name').innerText = title;
    document.getElementById('pass-user-email').innerText = localStorage.getItem('userEmail') || "student@tce.edu";
    document.getElementById('pass-qr-sim').innerHTML = `TCE-${Math.floor(1000+Math.random()*9000)}<br>ID_VERIFIED`;
    document.getElementById('pass-modal').style.display = 'flex';
}

function exportPass() {
    const pass = document.getElementById('pass-to-export');
    html2canvas(pass, { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `TCE_Pass_${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}

function processScan() {
    const val = document.getElementById('scan-input').value.toUpperCase();
    let found = false;
    deptStats.forEach(d => { if(val.startsWith(d.code)) { d.present++; found = true; } });
    if(found) {
        localStorage.setItem('deptStats', JSON.stringify(deptStats));
        document.getElementById('scan-feedback').style.display = 'flex';
        setTimeout(() => { document.getElementById('scan-feedback').style.display = 'none'; document.getElementById('scan-input').value = ""; }, 1500);
    } else { alert("Invalid Student ID"); }
}

function createNewEvent() {
    const title = document.getElementById('new-ev-title').value;
    const venue = document.getElementById('new-ev-venue').value;
    const coordMap = { "IT Dept": {top:'20%', left:'15%'}, "CSE Dept": {top:'20%', right:'15%'}, "Auditorium": {bottom:'20%', left:'40%'} };
    const newEv = { id: Date.now(), title, venue, coords: coordMap[venue], cap: document.getElementById('new-ev-cap').value, allowPass: document.getElementById('new-ev-pass').checked, cat: 'Technical' };
    events.push(newEv); localStorage.setItem('globalEvents', JSON.stringify(events));
    showPage('events');
}

function deleteEvent(id) {
    if(confirm("Delete this event?")) {
        events = events.filter(e => e.id !== id);
        localStorage.setItem('globalEvents', JSON.stringify(events));
        renderEvents();
    }
}

function checkRBAC() {
    const role = localStorage.getItem('userRole');
    if(localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('logout-nav').style.display = 'block';
        document.getElementById('home-auth-box').style.display = 'none';
        if(role === 'admin') { 
            document.getElementById('admin-link').style.display='block'; 
            document.getElementById('vol-link').style.display='block'; 
            document.getElementById('admin-create-link').style.display='block'; 
        }
        else if(role === 'volunteer') document.getElementById('vol-link').style.display='block';
        else document.getElementById('portal-link').style.display='block';
    }
}

function closeMap() { document.getElementById('map-modal').style.display = 'none'; }
function closePass() { document.getElementById('pass-modal').style.display = 'none'; }
function logout() { localStorage.clear(); window.location.href='index.html'; }
document.addEventListener('DOMContentLoaded', () => { checkRBAC(); showPage('home'); });