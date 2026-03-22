// --- DATA SOURCE ---
let events = [];
let deptStats = [];
let myRegs = JSON.parse(localStorage.getItem('myEvents')) || [];
let pendingEvent = null;

// Simulated AJAX call to fetch data
function fetchData() {
    // In production, this would be $.getJSON('/api/events')
    events = JSON.parse(localStorage.getItem('globalEvents')) || [
        { id: 1, title: "Symposium '26", cat: "Technical", venue: "IT Dept", coords: {top:'20%', left:'15%'}, cap: 50 },
        { id: 2, title: "Hackathon", cat: "Coding", venue: "CSE Dept", coords: {top:'20%', right:'15%'}, cap: 60 }
    ];
    deptStats = JSON.parse(localStorage.getItem('deptStats')) || [
        { name: "IT Dept", code: "IT", reg: 100, present: 48 },
        { name: "CSE Dept", code: "CS", reg: 120, present: 15 }
    ];
}

// --- NAVIGATION ---
function showPage(pId) {
    $('.page').hide();
    const mode = (pId === 'home') ? 'flex' : 'block';
    $(`#${pId}`).fadeIn('fast').css('display', mode);
    
    if(pId === 'events') renderEvents();
    if(pId === 'portal') renderPortal();
    if(pId === 'leaderboard') renderLeaderboard();
}

// --- RENDERERS ---
function renderEvents() {
    const role = localStorage.getItem('userRole');
    let html = events.map(ev => `
        <div class="card">
            <small style="color:var(--tce-orange); font-weight:800;">${ev.cat}</small>
            <h3>${ev.title}</h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">📍 ${ev.venue}</p>
            ${role === 'student' ? `<button class="btn-portal" style="width:100%; margin-top:15px;" onclick="openMap(${ev.id})">Register</button>` : ''}
        </div>
    `).join('');
    $('#event-container').html(html);
}

function renderPortal() {
    let html = myRegs.map(title => `
        <div class="card">
            <small style="color:var(--success); font-weight:bold;">Registered</small>
            <h3>${title}</h3>
            <button class="btn-portal" style="width:100%; margin-top:15px; background:#6366f1;" onclick="viewPass('${title}')">View Pass</button>
        </div>
    `).join('') || "<p>No registrations found.</p>";
    $('#my-events-container').html(html);
}

function renderLeaderboard() {
    let html = deptStats.map(d => {
        const perc = Math.round((d.present / d.reg) * 100);
        return `<div style="margin-bottom:20px;">
                    <strong>${d.name}</strong> <span style="float:right;">${perc}%</span>
                    <div style="background:#e2e8f0; height:10px; border-radius:10px; margin-top:8px; overflow:hidden;">
                        <div style="width:${perc}%; height:100%; background:var(--tce-blue); transition:1s;"></div>
                    </div>
                </div>`;
    }).join('');
    $('#leaderboard-cont').html(html);
}

// --- CORE LOGIC ---
function openMap(id) {
    pendingEvent = events.find(e => e.id == id);
    $('#map-modal').fadeIn('fast').css('display', 'flex');
    $('#venue-info').text(`Venue: ${pendingEvent.venue}`);
    $('#event-venue').css({ top: '', left: '', right: '', bottom: '' }).css(pendingEvent.coords);
}

function confirmRegistration() {
    if(!myRegs.includes(pendingEvent.title)) {
        myRegs.push(pendingEvent.title);
        localStorage.setItem('myEvents', JSON.stringify(myRegs));
        
        // Simulated AJAX POST
        $.post('/register', {title: pendingEvent.title}, function() {
            console.log("Registered!");
        }).always(() => {
            closeMap();
            showPage('portal');
        });
    }
}

function viewPass(title) {
    $('#pass-event-name').text(title);
    $('#pass-user-email').text(localStorage.getItem('userEmail') || "student@tce.edu");
    $('#pass-qr-sim').html(`TCE-${Math.floor(1000+Math.random()*9000)}<br>VERIFIED`);
    $('#pass-modal').fadeIn('fast').css('display', 'flex');
}

function exportPass() {
    const target = $('#pass-to-export')[0];
    html2canvas(target, { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'TCE_Entry_Pass.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

function processScan() {
    const code = $('#scan-input').val().toUpperCase();
    let success = false;
    deptStats.forEach(d => { if(code.startsWith(d.code)) { d.present++; success = true; } });
    
    if(success) {
        localStorage.setItem('deptStats', JSON.stringify(deptStats));
        $('#scan-feedback').fadeIn('fast').css('display', 'flex');
        setTimeout(() => { 
            $('#scan-feedback').fadeOut(); 
            $('#scan-input').val(''); 
        }, 1500);
    }
}

function checkRBAC() {
    const role = localStorage.getItem('userRole');
    if(localStorage.getItem('isLoggedIn') === 'true') {
        $('#logout-nav').show();
        $('#home-auth-box').hide();
        if(role === 'admin') { $('#admin-link, #vol-link').show(); }
        else if(role === 'volunteer') { $('#vol-link').show(); }
        else { $('#portal-link').show(); }
    }
}

function closeMap() { $('#map-modal').fadeOut(); }
function closePass() { $('#pass-modal').fadeOut(); }
function logout() { localStorage.clear(); window.location.href='index.html'; }

$(document).ready(() => { fetchData(); checkRBAC(); showPage('home'); });