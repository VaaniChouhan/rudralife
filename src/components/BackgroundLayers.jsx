import React from 'react';

export default function BackgroundLayers({ whiteBgOpacity }) {
  return (
    <div id="bg-layers-container">
      {/* 🎬 THE 7 VIDEO SECTIONS */}
      
      {/* S1: Hero Banner (Scene 1: Shiva zoom/mountain) */}
      <video id="bg-video-hero" className="fixed-bg-layer active" muted playsInline preload="auto" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
        <source src="/scene1.mp4" type="video/mp4" />
        <source src="/Shiva_tear_Rudraksha_tree_growth_202606272315.mp4" type="video/mp4" /> {/* Fallback */}
      </video>
      {whiteBgOpacity > 0.01 && (
        <div className="hero-white-overlay" style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#ffffff',
          opacity: whiteBgOpacity,
          zIndex: -1, /* Sit on top of the video but behind all content */
          pointerEvents: 'none',
          transition: 'opacity 0.05s ease-out'
        }}></div>
      )}
      
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

      {/* S8: ACE Process / Diagram (Scene 11: Yantra copper plate) */}
      <div id="bg-img-yantra" className="fixed-bg-layer" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196,154,60,0.12) 0%, #0D0A06 100%)' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '60%', opacity: 0.08, stroke: '#C49A3C', strokeWidth: 0.3, fill: 'none' }}>
          <rect x="10" y="10" width="80" height="80" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="35" />
          <polygon points="50,15 80,65 20,65" />
          <polygon points="50,85 80,35 20,35" />
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
