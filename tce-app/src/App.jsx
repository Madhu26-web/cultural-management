import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import Scanner from './pages/Scanner';

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);

  const navigate = (p) => setPage(p);

  return (
    <div className="app-root">
      <nav>
        <div className="logo" onClick={() => navigate('home')}>
          TCE<span>.EventHub</span>
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate('home')}>Home</li>
          <li onClick={() => navigate('events')}>Events</li>
          {user?.role === 'volunteer' && (
            <li onClick={() => navigate('scanner')} style={{color: '#10b981'}}>Scanner</li>
          )}
          {!user ? (
            <li onClick={() => navigate('login')}>Login</li>
          ) : (
            <li onClick={() => {setUser(null); navigate('home')}} style={{color: '#ef4444'}}>Logout</li>
          )}
        </ul>
      </nav>

      <div className="container">
        {page === 'home' && <Home />}
        {page === 'login' && <Login setUser={setUser} setPage={setPage} />}
        {page === 'events' && <Events user={user} />}
        {page === 'scanner' && <Scanner />}
      </div>
    </div>
  );
}
export default App;