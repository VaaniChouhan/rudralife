import React, { useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

export default function XRaySlider() {
  const [revealVal, setRevealVal] = useState(50);
  const [hoveredPart, setHoveredPart] = useState(null);

  const anatomicalParts = {
    canal: {
      title: "Central Core (Sushumna Path)",
      desc: "The natural central hole (canal) that runs from top to bottom, acting as the axis of spiritual energy flow."
    },
    seed: {
      title: "Spiritual Seed (Nucleus)",
      desc: "The internal seed located within each compartment, containing the biological life force and sacred energy blueprint."
    },
    locule: {
      title: "Locule Chamber (Mukhi Cavity)",
      desc: "Symmetrical internal chambers that house the seeds. A 5-Mukhi bead contains exactly five of these compartments."
    },
    endocarp: {
      title: "Endocarp (Dense Protective Shell)",
      desc: "The woody, highly textured outer casing that protects the inner seeds and exhibits the signature external mukhi lines."
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '340px', position: 'relative' }}>
      <div className="xray-slider-container reveal" style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto', borderRadius: '50%', border: '2px solid var(--gold-dim)', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        
        {/* X-Ray / Internal View (Revealed on slide) */}
        <div className="xray-layer internal" style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundColor: '#090F14' }}>
          {revealVal < 98 && (
            <ParticleCanvas count={15} color="rgba(0, 210, 255, " style={{ zIndex: 1, opacity: 0.6 }} />
          )}
          
          <svg className="xray-svg-frame" viewBox="0 0 100 100" style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
            {/* Outer scan ring */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0, 210, 255, 0.3)" strokeWidth="1" />
            
            {/* Labeled Parts (SVG paths for X-Ray cross section) */}
            {/* 1. Endocarp outer ring - dense blue shell */}
            <path 
              d="M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z M50,18 C32,18 18,32 18,50 C18,68 32,82 50,82 C68,82 82,68 82,50 C82,32 68,18 50,18 Z" 
              fill={hoveredPart === 'endocarp' ? 'rgba(0, 210, 255, 0.25)' : 'rgba(0, 210, 255, 0.08)'} 
              stroke="#00d2ff" 
              strokeWidth="1.5" 
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
              onMouseEnter={() => setHoveredPart('endocarp')}
              onMouseLeave={() => setHoveredPart(null)}
            />

            {/* 2. Central Canal (Sushumna Path) */}
            <rect 
              x="47" 
              y="18" 
              width="6" 
              height="64" 
              rx="3"
              fill={hoveredPart === 'canal' ? 'rgba(0, 210, 255, 0.6)' : 'rgba(0, 210, 255, 0.2)'} 
              stroke="#00d2ff" 
              strokeWidth="1"
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
              onMouseEnter={() => setHoveredPart('canal')}
              onMouseLeave={() => setHoveredPart(null)}
            />
            
            {/* 3. Locule Chambers (5 chambers) and Seeds */}
            {/* Chamber 1 (Top Right) */}
            <path 
              d="M55,26 C68,26 76,38 76,46 C76,50 72,54 62,48 C55,44 54,34 55,26 Z" 
              fill={hoveredPart === 'locule' ? 'rgba(0, 210, 255, 0.15)' : 'none'} 
              stroke="rgba(0, 210, 255, 0.5)" 
              strokeWidth="1" 
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('locule')}
              onMouseLeave={() => setHoveredPart(null)}
            />
            <circle 
              cx="65" 
              cy="36" 
              r="4.5" 
              fill={hoveredPart === 'seed' ? '#00D2FF' : 'rgba(0, 210, 255, 0.7)'} 
              stroke="#fff" 
              strokeWidth="0.5" 
              filter="drop-shadow(0 0 3px #00d2ff)"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('seed')}
              onMouseLeave={() => setHoveredPart(null)}
            />

            {/* Chamber 2 (Bottom Right) */}
            <path 
              d="M62,52 C72,46 76,50 76,54 C76,62 68,74 55,74 C54,66 55,56 62,52 Z" 
              fill={hoveredPart === 'locule' ? 'rgba(0, 210, 255, 0.15)' : 'none'} 
              stroke="rgba(0, 210, 255, 0.5)" 
              strokeWidth="1"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('locule')}
              onMouseLeave={() => setHoveredPart(null)}
            />
            <circle 
              cx="65" 
              cy="64" 
              r="4.5" 
              fill={hoveredPart === 'seed' ? '#00D2FF' : 'rgba(0, 210, 255, 0.7)'} 
              stroke="#fff" 
              strokeWidth="0.5" 
              filter="drop-shadow(0 0 3px #00d2ff)"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('seed')}
              onMouseLeave={() => setHoveredPart(null)}
            />

            {/* Chamber 3 (Bottom Left) */}
            <path 
              d="M45,74 C32,74 24,62 24,54 C24,50 28,46 38,52 C45,56 46,66 45,74 Z" 
              fill={hoveredPart === 'locule' ? 'rgba(0, 210, 255, 0.15)' : 'none'} 
              stroke="rgba(0, 210, 255, 0.5)" 
              strokeWidth="1"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('locule')}
              onMouseLeave={() => setHoveredPart(null)}
            />
            <circle 
              cx="35" 
              cy="64" 
              r="4.5" 
              fill={hoveredPart === 'seed' ? '#00D2FF' : 'rgba(0, 210, 255, 0.7)'} 
              stroke="#fff" 
              strokeWidth="0.5" 
              filter="drop-shadow(0 0 3px #00d2ff)"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('seed')}
              onMouseLeave={() => setHoveredPart(null)}
            />

            {/* Chamber 4 (Top Left) */}
            <path 
              d="M38,48 C28,54 24,50 24,46 C24,38 32,26 45,26 C46,34 45,44 38,48 Z" 
              fill={hoveredPart === 'locule' ? 'rgba(0, 210, 255, 0.15)' : 'none'} 
              stroke="rgba(0, 210, 255, 0.5)" 
              strokeWidth="1"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('locule')}
              onMouseLeave={() => setHoveredPart(null)}
            />
            <circle 
              cx="35" 
              cy="36" 
              r="4.5" 
              fill={hoveredPart === 'seed' ? '#00D2FF' : 'rgba(0, 210, 255, 0.7)'} 
              stroke="#fff" 
              strokeWidth="0.5" 
              filter="drop-shadow(0 0 3px #00d2ff)"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('seed')}
              onMouseLeave={() => setHoveredPart(null)}
            />

            {/* Chamber 5 (Top Center - for 5-Mukhi configuration) */}
            <path 
              d="M44,25 C44,19 56,19 56,25 C52,32 48,32 44,25 Z" 
              fill={hoveredPart === 'locule' ? 'rgba(0, 210, 255, 0.15)' : 'none'} 
              stroke="rgba(0, 210, 255, 0.5)" 
              strokeWidth="1"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('locule')}
              onMouseLeave={() => setHoveredPart(null)}
            />
            <circle 
              cx="50" 
              cy="23" 
              r="4" 
              fill={hoveredPart === 'seed' ? '#00D2FF' : 'rgba(0, 210, 255, 0.7)'} 
              stroke="#fff" 
              strokeWidth="0.5" 
              filter="drop-shadow(0 0 3px #00d2ff)"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart('seed')}
              onMouseLeave={() => setHoveredPart(null)}
            />

            {/* Holographic grid scanlines */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(0, 210, 255, 0.1)" strokeWidth="0.5" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(0, 210, 255, 0.1)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Natural / External View (Overlay that slides back) */}
        <div 
          className="xray-layer external" 
          style={{ width: `${revealVal}%`, position: 'absolute', inset: 0, zIndex: 2, borderRight: '2.5px solid var(--gold)', transition: 'width 0.05s ease-out', overflow: 'hidden' }}
        >
          {/* External Natural View SVG with high detail */}
          <svg className="xray-svg-frame" viewBox="0 0 100 100" style={{ background: 'radial-gradient(circle at center, #261E14 0%, #0F0B06 100%)', width: '320px', height: '320px', display: 'block' }}>
            {/* Outer shadow of the bead */}
            <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(196,154,60,0.15)" strokeWidth="3" />
            
            {/* The base bead body with multi-layer radial gradient for 3D realism */}
            <circle cx="50" cy="50" r="37.5" fill="url(#beadGrad)" stroke="rgba(74, 52, 24, 0.4)" strokeWidth="1" />
            
            {/* Gradients definition */}
            <defs>
              <radialGradient id="beadGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#C49A3C" />
                <stop offset="45%" stopColor="#7C5C2E" />
                <stop offset="85%" stopColor="#312210" />
                <stop offset="100%" stopColor="#120D06" />
              </radialGradient>
            </defs>

            {/* Symmetrical Mukhi (groove) lines for 5-Mukhi */}
            {/* Line 1 (Top Center to Bottom Center) */}
            <path d="M50,12.5 C48,25 48,75 50,87.5" fill="none" stroke="#1A1209" strokeWidth="2" opacity="0.85" />
            <path d="M50,12.5 C49,25 49,75 50,87.5" fill="none" stroke="#C49A3C" strokeWidth="0.5" opacity="0.3" />

            {/* Line 2 (Top Right to Bottom Left) */}
            <path d="M78,25 C65,38 35,62 22,75" fill="none" stroke="#1A1209" strokeWidth="2" opacity="0.85" />
            <path d="M78,25 C66,37 34,63 22,75" fill="none" stroke="#C49A3C" strokeWidth="0.5" opacity="0.3" />

            {/* Line 3 (Top Left to Bottom Right) */}
            <path d="M22,25 C35,38 65,62 78,75" fill="none" stroke="#1A1209" strokeWidth="2" opacity="0.85" />
            <path d="M22,25 C34,37 66,63 78,75" fill="none" stroke="#C49A3C" strokeWidth="0.5" opacity="0.3" />
            
            {/* Bead Surface natural projections & textures (Highly Detailed Paths) */}
            <path d="M42,20 C46,24 44,28 39,26 C36,24 38,21 42,20 Z" fill="#5E431D" opacity="0.6" />
            <path d="M58,20 C54,24 56,28 61,26 C64,24 62,21 58,20 Z" fill="#5E431D" opacity="0.6" />
            <path d="M30,35 C34,32 38,36 36,41 C34,45 28,42 30,35 Z" fill="#5E431D" opacity="0.6" />
            <path d="M70,35 C66,32 62,36 64,41 C66,45 72,42 70,35 Z" fill="#5E431D" opacity="0.6" />
            
            <path d="M32,58 C35,55 39,59 36,64 C33,68 28,64 32,58 Z" fill="#5E431D" opacity="0.6" />
            <path d="M68,58 C65,55 61,59 64,64 C67,68 72,64 68,58 Z" fill="#5E431D" opacity="0.6" />
            <path d="M48,78 C44,74 46,70 51,72 C55,73 53,77 48,78 Z" fill="#5E431D" opacity="0.6" />
            
            {/* Highlights for 3D depth */}
            <circle cx="38" cy="38" r="1.5" fill="#fff" opacity="0.25" filter="blur(0.5px)" />
            <circle cx="48" cy="30" r="2.5" fill="#fff" opacity="0.15" filter="blur(1px)" />

            {/* Central core outer hole details */}
            <ellipse cx="50" cy="12.5" rx="3" ry="1.5" fill="#120D06" stroke="#4A3418" strokeWidth="0.5" />
            <ellipse cx="50" cy="87.5" rx="3" ry="1.5" fill="#120D06" stroke="#4A3418" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Range Slider Overlay (invisible but takes interactions over the visual) */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={revealVal} 
          onChange={(e) => setRevealVal(Number(e.target.value))}
          className="xray-control-input" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', zIndex: 10 }}
        />
      </div>

      {/* Labeled Explainer Overlay */}
      <div style={{ marginTop: '16px', minHeight: '84px', background: 'rgba(196,154,60,0.03)', border: '1px solid rgba(196,154,60,0.1)', borderRadius: '10px', padding: '12px', textAlign: 'center', transition: 'all 0.3s' }}>
        {hoveredPart ? (
          <div>
            <h4 style={{ fontSize: '13px', color: '#00d2ff', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {anatomicalParts[hoveredPart].title}
            </h4>
            <p style={{ fontSize: '11.5px', color: 'rgba(255,253,248,0.8)', lineHeight: '1.45' }}>
              {anatomicalParts[hoveredPart].desc}
            </p>
          </div>
        ) : (
          <div>
            <h4 style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Bead Internal Structure
            </h4>
            <p style={{ fontSize: '11.5px', color: 'var(--muted)', lineHeight: '1.45' }}>
              Drag the slider to perform a digital X-Ray scan. Hover over scan features to analyze coordinates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
