import React, { useState } from 'react';

export default function Scanner() {
  const [status, setStatus] = useState("Ready to Scan");
  const [lastScanned, setLastScanned] = useState("None");

  const simulateScan = () => {
    setStatus("Scanning...");
    // Simulate a 1.5 second "Network Request"
    setTimeout(() => {
      const mockID = "TCE2024" + Math.floor(1000 + Math.random() * 9000);
      setLastScanned(mockID);
      setStatus("Success! Access Granted.");
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus("Ready to Scan"), 3000);
    }, 1500);
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="scanner-header">
        <h2 style={{ color: 'var(--tce-blue)' }}>Volunteer Portal</h2>
        <p style={{ color: status.includes('Success') ? '#10b981' : '#64748b', fontWeight: 'bold' }}>
          {status}
        </p>
      </div>

      {/* The Animated Box defined in index.scss */}
      <div className="scanner-box">
        <div className="laser"></div>
        <div className="scanner-overlay">
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '120px', fontSize: '0.8rem' }}>
            {status === "Scanning..." ? "PROCESSING..." : "PLACE QR CODE HERE"}
          </p>
        </div>
      </div>

      <div className="scan-info" style={{ marginTop: '20px', padding: '15px', background: '#f1f5f9', borderRadius: '10px' }}>
        <small>Last Scanned Student ID:</small>
        <p style={{ fontWeight: '800', fontSize: '1.2rem' }}>{lastScanned}</p>
      </div>

      <button 
        className="btn-portal" 
        style={{ marginTop: '20px' }} 
        onClick={simulateScan}
        disabled={status === "Scanning..."}
      >
        {status === "Scanning..." ? "Detecting..." : "Simulate QR Scan"}
      </button>
    </div>
  );
}