import React, { useEffect, useState } from 'react';

export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${isShrunk ? 'shrunk' : ''}`}>
      <a href="#s1" className="nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img 
          src="/New Rudralife final logo with tagline 2017 (White).png" 
          alt="Rudralife" 
          style={{ height: '42px', width: 'auto', maxWidth: '180px', display: 'block', objectFit: 'contain' }} 
        />
      </a>
      
      <div className="nav-r">
        {/* Search — itshover magnifier-group animation */}
        <button className="nav-icon ih-icon" aria-label="Search" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" style={{ overflow: 'visible' }}>
            <g className="magnifier-group" style={{ transformOrigin: '13px 13px', transformBox: 'fill-box' }}>
              <path d="m21.393,18.565l7.021,7.021c.781.781.781,2.047,0,2.828h0c-.781.781-2.047.781-2.828,0l-7.021-7.021" />
              <circle cx="13" cy="13" r="10" strokeLinecap="square" />
            </g>
          </svg>
        </button>

        {/* Cart — itshover cart-icon animation */}
        <button className="nav-icon ih-icon" aria-label="Cart" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
            <g className="cart-icon" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </g>
          </svg>
        </button>

        {/* Profile — bounce */}
        <button className="nav-icon ih-icon" aria-label="Profile" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
            <g className="github-icon" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </g>
          </svg>
        </button>

        <a href="https://wa.me/919867291461" target="_blank" rel="noopener noreferrer" className="nav-cta">
          Consult An Expert
        </a>
      </div>
    </nav>
  );
}
