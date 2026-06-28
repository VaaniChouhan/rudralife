import React from 'react';

export default function BackgroundLayers() {
  return (
    <div id="bg-layers-container">
      {/* 🎬 THE 7 VIDEO SECTIONS */}
      
      {/* S1: Hero Banner (Scene 1: Shiva zoom/mountain) */}
      <video id="bg-video-hero" className="fixed-bg-layer active" muted playsInline preload="auto" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
        <source src="/scene1.mp4" type="video/mp4" />
        <source src="/Shiva_tear_Rudraksha_tree_growth_202606272315.mp4" type="video/mp4" /> {/* Fallback */}
      </video>
      
      {/* S2: Milind Soman (Scene 4: Cliff silhouette) */}
      <video id="bg-video-milind" className="fixed-bg-layer" muted playsInline loop preload="auto" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
        <source src="/scene4.mp4" type="video/mp4" />
        <source src="/Shiva_tear_Rudraksha_tree_growth_202606272315.mp4" type="video/mp4" /> {/* Fallback */}
      </video>
      
      {/* S10: Vedic Energization (Scene 12: Havan fire) */}
      <video id="bg-video-fire" className="fixed-bg-layer" muted playsInline loop preload="auto" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
        <source src="/scene12.mp4" type="video/mp4" />
        <source src="/Shiva_tear_Rudraksha_tree_growth_202606272315.mp4" type="video/mp4" /> {/* Fallback */}
      </video>
      
      {/* S12, S-siddha-mala: Rarest Collection & Siddha Mala (Scene 14: Spotlight velvet) */}
      <video id="bg-video-spotlight" className="fixed-bg-layer" muted playsInline loop preload="auto" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
        <source src="/scene14.mp4" type="video/mp4" />
        <source src="/Shiva_tear_Rudraksha_tree_growth_202606272315.mp4" type="video/mp4" /> {/* Fallback */}
      </video>
      
      {/* S17: 25 Years of Trust (Scene 9: Banyan root) */}
      <video id="bg-video-legacy" className="fixed-bg-layer" muted playsInline loop preload="auto" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
        <source src="/scene9.mp4" type="video/mp4" />
        <source src="/Shiva_tear_Rudraksha_tree_growth_202606272315.mp4" type="video/mp4" /> {/* Fallback */}
      </video>
      
      {/* S24: Final CTA (Scene 25: Meditating horizon) */}
      <video id="bg-video-final" className="fixed-bg-layer" muted playsInline loop preload="auto" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
        <source src="/scene25.mp4" type="video/mp4" />
        <source src="/Shiva_tear_Rudraksha_tree_growth_202606272315.mp4" type="video/mp4" /> {/* Fallback */}
      </video>
      
      {/* 🖼️ THE 9 STATIC IMAGE SECTIONS */}
      
      {/* S3: Clients / Experience & Trust (Scene 5: World map of light) */}
      <div id="bg-img-map" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(124,92,46,0.1) 0%, #0D0A06 100%)' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.06, stroke: '#C49A3C', strokeWidth: 0.3, fill: 'none' }}>
          <circle cx="50" cy="50" r="30" strokeDasharray="1,1" />
          <circle cx="50" cy="50" r="40" strokeDasharray="2,2" />
        </svg>
      </div>
      
      {/* S4: Guided Discovery (Scene 2: Temple pathway steps) */}
      <div id="bg-img-pathway" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.12) 0%, #0D0A06 100%), linear-gradient(to bottom, #1A1209, #0D0A06)' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.18, stroke: '#C49A3C', strokeWidth: 0.5, fill: 'none' }}>
          <path d="M50,100 C45,70 30,40 20,0 M50,100 C55,70 70,40 80,0" />
          <path d="M50,100 C48,80 40,60 35,0 M50,100 C52,80 60,60 65,0" />
        </svg>
      </div>

      {/* S5: 3 Generations (Scene 6: Hand-to-hand Rudraksha) */}
      <div id="bg-img-legacy" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(124,92,46,0.1) 0%, transparent 100%)' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.06, stroke: '#7C5C2E', strokeWidth: 0.5, fill: 'none' }}>
          <line x1="0" y1="30" x2="100" y2="30" />
          <line x1="0" y1="65" x2="100" y2="65" />
        </svg>
      </div>

      {/* S7: First Time Buying (Scene 3: Trusted guiding hand) */}
      <div id="bg-img-consultation" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.06) 0%, transparent 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 40%, rgba(196,154,60,0.03) 40%, rgba(196,154,60,0.03) 60%, transparent 60%)', backgroundSize: '60px 60px' }}></div>
      </div>

      {/* S8: ACE Process / Diagram (Scene 11: Sri Yantra Sacred Geometry) */}
      <div id="bg-img-yantra" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.14) 0%, #0D0A06 100%)' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '70%', opacity: 0.09, stroke: '#C49A3C', strokeWidth: 0.25, fill: 'none' }}>
          {/* Bhupura (Outer Square Gateways) */}
          <path d="M5,5 L42,5 L42,10 L58,10 L58,5 L95,5 L95,42 L90,42 L90,58 L95,58 L95,95 L58,95 L58,90 L42,90 L42,95 L5,95 L5,58 L10,58 L10,42 L5,42 Z" strokeWidth="0.4" />
          <path d="M8,8 L40,8 L40,12 L60,12 L60,8 L92,8 L92,40 L88,40 L88,60 L92,60 L92,92 L60,92 L60,88 L40,88 L40,92 L8,92 L8,60 L12,60 L12,40 L8,40 Z" strokeWidth="0.2" opacity="0.6" />
          
          {/* Concentric Circles */}
          <circle cx="50" cy="50" r="36" />
          <circle cx="50" cy="50" r="33.5" />
          
          {/* Outer Ring of 16 Petals (drawn mathematically) */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            const nextAngle = ((i + 1) * 360) / 16;
            const rOuter = 33.5;
            const rMid = 30.5;
            
            const x1 = 50 + rOuter * Math.cos((angle * Math.PI) / 180);
            const y1 = 50 + rOuter * Math.sin((angle * Math.PI) / 180);
            const x2 = 50 + rOuter * Math.cos((nextAngle * Math.PI) / 180);
            const y2 = 50 + rOuter * Math.sin((nextAngle * Math.PI) / 180);
            
            const midAngle = (angle + nextAngle) / 2;
            const mx = 50 + rMid * Math.cos((midAngle * Math.PI) / 180);
            const my = 50 + rMid * Math.sin((midAngle * Math.PI) / 180);
            
            return (
              <path key={`p16-${i}`} d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} strokeWidth="0.2" />
            );
          })}

          <circle cx="50" cy="50" r="28" />

          {/* Inner Ring of 8 Petals */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const nextAngle = ((i + 1) * 360) / 8;
            const rOuter = 28;
            const rMid = 24.5;
            
            const x1 = 50 + rOuter * Math.cos((angle * Math.PI) / 180);
            const y1 = 50 + rOuter * Math.sin((angle * Math.PI) / 180);
            const x2 = 50 + rOuter * Math.cos((nextAngle * Math.PI) / 180);
            const y2 = 50 + rOuter * Math.sin((nextAngle * Math.PI) / 180);
            
            const midAngle = (angle + nextAngle) / 2;
            const mx = 50 + rMid * Math.cos((midAngle * Math.PI) / 180);
            const my = 50 + rMid * Math.sin((midAngle * Math.PI) / 180);
            
            return (
              <path key={`p8-${i}`} d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} strokeWidth="0.25" />
            );
          })}

          <circle cx="50" cy="50" r="21" />

          {/* Core Interlocking Triangles (9 major intersecting triangles) */}
          {/* Upward Triangles */}
          <polygon points="50,30 68,61 32,61" strokeWidth="0.3" />
          <polygon points="50,33 65,58 35,58" strokeWidth="0.3" />
          <polygon points="50,37 62,54 38,54" strokeWidth="0.3" />
          <polygon points="50,41 59,50 41,50" strokeWidth="0.3" />
          
          {/* Downward Triangles */}
          <polygon points="50,70 68,39 32,39" strokeWidth="0.3" />
          <polygon points="50,67 65,42 35,42" strokeWidth="0.3" />
          <polygon points="50,63 62,46 38,46" strokeWidth="0.3" />
          <polygon points="50,59 59,50 41,50" strokeWidth="0.3" />
          <polygon points="50,55 56,52 44,52" strokeWidth="0.3" />

          {/* Central Bindu (Divine Dot) */}
          <circle cx="50" cy="50" r="0.8" fill="#C49A3C" />
        </svg>
      </div>

      {/* S13: Sacred Packaging (Scene 14: Packaging box) */}
      <div id="bg-img-packaging" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.12) 0%, #0D0A06 100%)' }}></div>

      {/* S14: Rudraksha Pujas (Scene 16: Puja flat lay) */}
      <div id="bg-img-puja" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.1) 0%, #FAF6EE 100%)' }}></div>

      {/* S21: Rudralife Cares (Scene 21: Courtyard feeding) */}
      <div id="bg-img-cares" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.06) 0%, #FAF6EE 100%)' }}></div>

      {/* S22: Join Our Community (Scene 22: Floating river lamps) */}
      <div id="bg-img-community" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.06) 0%, #0D0A06 100%)' }}></div>
    </div>
  );
}
