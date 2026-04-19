import React from 'react';

export default function Events({ user }) {
  const events = [
    { id: 1, name: "TCE Hackathon", dept: "IT" },
    { id: 2, name: "Robotics Workshop", dept: "ECE" }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Events</h2>
      <div className="event-grid">
        {events.map(ev => (
          <div key={ev.id} className="card">
            <h3>{ev.name}</h3>
            <p>Dept: {ev.dept}</p>
            {user?.role === 'admin' ? (
              <button className="btn-portal" style={{background:'#64748b'}} disabled>Admin View</button>
            ) : (
              <button className="btn-portal">Register Now</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}