import React, { useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

// Inline animated check SVG (itshover-style)
const CheckIcon = () => (
  <span className="ih-icon" style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '6px' }}>
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline className="check-icon" points="4,10 8,14 16,6" />
    </svg>
  </span>
);

export default function AceProcess() {
  const [isEnergized, setIsEnergized] = useState(false);

  return (
    <div className="ace-comparison reveal" style={{ position: 'relative', overflow: 'hidden' }}>
      {isEnergized && <ParticleCanvas count={30} color="rgba(212, 175, 55, " style={{ zIndex: 0 }} />}
      <button 
        className={`ace-toggle-btn ${isEnergized ? 'active' : ''}`}
        onClick={() => setIsEnergized(!isEnergized)}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {isEnergized ? 'Aligned Energy (After ACE)' : 'Dormant Energy (Before ACE)'}
      </button>
      
      <div className={`ace-visual-wrapper ${isEnergized ? 'energized' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <div className="ace-glow-ring"></div>
        {/* OM symbol — Devanagari script, intentional sacred symbol */}
        <div className="ace-bead-avatar">ॐ</div>
      </div>

      <div style={{ fontSize: '12.5px', color: 'rgba(255,253,248,0.7)', lineHeight: '1.6', minHeight: '68px', position: 'relative', zIndex: 2 }}>
        {isEnergized ? (
          <p>
            <CheckIcon /><strong>Purified</strong> with Gangajal &amp; Sandalwood.<br />
            <CheckIcon /><strong>72 Hours</strong> of customized Beej Mantra chanting.<br />
            <CheckIcon /><strong>Amplified, aligned vibrational energy</strong> that elevates the aura.
          </p>
        ) : (
          <p>
            Before the ACE Process, the Rudraksha bead exhibits dormant, unaligned energy signatures with micro-blockages.
          </p>
        )}
      </div>
    </div>
  );
}
