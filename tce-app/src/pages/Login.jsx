import React, { useState } from 'react';

export default function Login({ setUser, setPage }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.toLowerCase().endsWith('@tce.edu')) {
      setUser({ email, role });
      setPage('events');
    } else {
      alert("Invalid Access! Use @tce.edu email.");
    }
  };

  return (
    <div className="card" style={{maxWidth: '400px'}}>
      <h2>Portal Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Institutional Email" className="form-input" onChange={(e) => setEmail(e.target.value)} required />
        <select className="form-input" onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn-portal">Sign In</button>
      </form>
    </div>
  );
}