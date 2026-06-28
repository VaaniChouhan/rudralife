import React, { useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

export default function XRaySlider() {
  const [revealVal, setRevealVal] = useState(50);

  return (
    <div style={{ margin: '0 auto', maxWidth: '320px' }}>
      <div className="xray-slider-container reveal">
        {/* X-Ray / Internal View */}
        <div className="xray-layer internal" style={{ position: 'relative', overflow: 'hidden' }}>
          {revealVal < 98 && (
            <ParticleCanvas count={20} color="rgba(0, 210, 255, " style={{ zIndex: 0 }} />
          )}
          <svg className="xray-svg-frame" viewBox="0 0 100 100" style={{ position: 'relative', zIndex: 2 }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#00d2ff" strokeWidth="2" strokeDasharray="2,2" opacity="0.8" />
            <path d="M50,15 Q65,40 50,85" fill="none" stroke="#00d2ff" strokeWidth="1.5" opacity="0.6" />
            <path d="M50,15 Q35,40 50,85" fill="none" stroke="#00d2ff" strokeWidth="1.5" opacity="0.6" />
            <path d="M15,50 Q40,65 85,50" fill="none" stroke="#00d2ff" strokeWidth="1.5" opacity="0.6" />
            <path d="M15,50 Q40,35 85,50" fill="none" stroke="#00d2ff" strokeWidth="1.5" opacity="0.6" />
            <circle cx="38" cy="38" r="4" fill="#00d2ff" filter="drop-shadow(0 0 4px #00d2ff)" />
            <circle cx="62" cy="38" r="4" fill="#00d2ff" filter="drop-shadow(0 0 4px #00d2ff)" />
            <circle cx="62" cy="62" r="4" fill="#00d2ff" filter="drop-shadow(0 0 4px #00d2ff)" />
            <circle cx="38" cy="62" r="4" fill="#00d2ff" filter="drop-shadow(0 0 4px #00d2ff)" />
            <circle cx="50" cy="50" r="5" fill="#00d2ff" filter="drop-shadow(0 0 4px #00d2ff)" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#00d2ff" strokeWidth="1" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#00d2ff" strokeWidth="1" />
            <line x1="22" y1="22" x2="78" y2="78" stroke="#00d2ff" strokeWidth="1" />
            <line x1="78" y1="22" x2="22" y2="78" stroke="#00d2ff" strokeWidth="1" />
          </svg>
        </div>

        {/* Natural / External View */}
        <div 
          className="xray-layer external" 
          style={{ width: `${revealVal}%` }}
        >
          <svg className="xray-svg-frame" viewBox="0 0 100 100" style={{ background: 'radial-gradient(circle at center, #231F1A 0%, #0D0A06 100%)', width: '320px', height: '320px' }}>
            <circle cx="50" cy="50" r="38" fill="#C49A3C" opacity="0.15" stroke="#C49A3C" strokeWidth="1" />
            <path d="M50,12 C42,20 40,35 40,50 C40,65 42,80 50,88 C58,80 60,65 60,50 C60,35 58,20 50,12 Z" fill="#7C5C2E" stroke="#4A3418" strokeWidth="1" />
            <path d="M50,12 C32,25 30,45 30,50 C30,55 32,75 50,88 C68,75 70,55 70,50 C70,45 68,25 50,12 Z" fill="none" stroke="#4A3418" strokeWidth="1.5" />
            <path d="M50,12 Q45,35 48,50 Q45,65 50,88" fill="none" stroke="#312210" strokeWidth="1" />
            <path d="M35,30 Q45,50 35,70" fill="none" stroke="#312210" strokeWidth="1" />
            <path d="M65,30 Q55,50 65,70" fill="none" stroke="#312210" strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill="#312210" />
          </svg>
        </div>

        {/* Range Slider Overlay */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={revealVal} 
          onChange={(e) => setRevealVal(Number(e.target.value))}
          className="xray-control-input" 
        />
      </div>
      <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--muted)', marginBottom: '20px' }}>
        Drag the slider to perform a digital X-Ray scan of the bead's internal structure.
      </p>
    </div>
  );
}
