import React from 'react';

export default function Home() {
  const stats = [
    { dept: "IT Department", val: 85 },
    { dept: "CSE Department", val: 72 },
    { dept: "ECE Department", val: 55 }
  ];

  return (
    <div className="fade-in">
      <h1 style={{fontSize: '2.5rem', marginBottom: '10px'}}>TCE EventHub</h1>
      <p style={{color: '#64748b', marginBottom: '40px'}}>Centralized Campus Event Management</p>

      <div className="card" style={{maxWidth: '700px'}}>
        <h2 style={{marginBottom: '30px'}}>Department Engagement</h2>
        {stats.map(s => (
          <div key={s.dept} className="progress-wrapper">
            <div className="progress-label">
              <span>{s.dept}</span>
              <span>{s.val}%</span>
            </div>
            <div className="bar-container">
              <div className="bar-fill" style={{ width: `${s.val}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}