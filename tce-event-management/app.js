let events = JSON.parse(localStorage.getItem('events')) || [
    { title: "Hack-a-thon", dept: "IT", regCount: 45 },
    { title: "Robotics Expo", dept: "ECE", regCount: 30 },
    { title: "Code Debug", dept: "CSE", regCount: 60 }
];

function showPage(id) {
    $('.page').hide();
    $(`#${id}`).fadeIn();
    if(id === 'home') renderHomeRankings();
    if(id === 'events') renderEvents();
}

function renderHomeRankings() {
    // Sort departments by total registrations
    const sorted = [...events].sort((a,b) => b.regCount - a.regCount);
    const html = sorted.map(e => `
        <div class="stat-row">
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                <span>${e.dept} Dept</span> <span>${e.regCount} Regs</span>
            </div>
            <div class="bar-bg"><div class="bar-fill" style="width:${(e.regCount/100)*100}%"></div></div>
        </div>
    `).join('');
    $('#home-rankings').html(html);
}

function renderEvents() {
    const role = localStorage.getItem('userRole');
    const html = events.map((ev, i) => `
        <div class="card">
            <h3>${ev.title}</h3>
            <p style="color:var(--tce-orange)">${ev.dept} Department</p>
            <div style="margin-top:15px;">
                ${role === 'admin' 
                    ? `<button class="btn-portal" style="background:#64748b" disabled>Admin View Only</button>` 
                    : `<button class="btn-portal" onclick="register(${i})">Register Now</button>`}
            </div>
        </div>
    `).join('');
    $('#event-feed').html(html);
}

function register(index) {
    events[index].regCount++;
    localStorage.setItem('events', JSON.stringify(events));
    alert("Registered successfully for " + events[index].title);
    renderHomeRankings();
}

function addEvent() {
    const title = $('#a-title').val();
    const dept = $('#a-dept').val();
    if(title) {
        events.push({ title, dept, regCount: 0 });
        localStorage.setItem('events', JSON.stringify(events));
        alert("New Event Published!");
        showPage('events');
    }
}

function checkUser() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('userRole');
    if(loggedIn === 'true') {
        $('#login-cta').hide();
        $('#nav-logout').show();
        if(role === 'admin') $('#nav-admin').show();
        else if(role === 'volunteer') $('#nav-scan').show();
        else $('#nav-dash').show();
    }
}

function logout() { localStorage.clear(); location.reload(); }

$(document).ready(() => {
    checkUser();
    renderHomeRankings();
});