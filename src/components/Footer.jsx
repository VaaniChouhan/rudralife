import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#080604', borderTop: '1px solid rgba(196,154,60,0.12)', padding: '48px 20px 24px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Footer Logo */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="/New Rudralife final logo with tagline 2017 (White).png" 
            alt="Rudralife" 
            style={{ height: '32px', width: 'auto', maxWidth: '150px', display: 'block', objectFit: 'contain', opacity: 0.85 }} 
          />
        </div>
        
        {/* Trust Badges Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '12px', 
          background: 'rgba(196,154,60,0.04)', 
          border: '1px solid rgba(196,154,60,0.1)', 
          borderRadius: '12px', 
          padding: '16px', 
          marginBottom: '32px' 
        }}>
          <div style={{ fontSize: '11.5px', color: '#FAF6EE', opacity: 0.95, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#C49A3C" strokeWidth="2.5" style={{ marginRight: '6px' }}><path d="M20 6L9 17l-5-5"></path></svg> 7-Day Easy Returns
          </div>
          <div style={{ fontSize: '11.5px', color: '#FAF6EE', opacity: 0.95, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#C49A3C" strokeWidth="2.5" style={{ marginRight: '6px' }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg> Worldwide Insured Shipping
          </div>
          <div style={{ fontSize: '11.5px', color: '#FAF6EE', opacity: 0.95, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#C49A3C" strokeWidth="2.5" style={{ marginRight: '6px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> ISO-Certified Lab Testing
          </div>
          <div style={{ fontSize: '11.5px', color: '#FAF6EE', opacity: 0.95, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#C49A3C" strokeWidth="2.5" style={{ marginRight: '6px' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg> Tamper-Proof Packaging
          </div>
        </div>

        {/* Links Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '24px', 
          textAlign: 'left', 
          marginBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: '24px'
        }}>
          <div>
            <h4 style={{ fontSize: '12px', color: '#C49A3C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Explore</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="#s12" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>Rarest Collections</a></li>
              <li><a href="#s-siddha-mala" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>Siddha Mala™ Flagship</a></li>
              <li><a href="#s14" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>Rudraksha Pujas</a></li>
              <li><a href="#s8" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>ACE Energization</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', color: '#C49A3C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="https://wa.me/919867291461" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>WhatsApp Consultation</a></li>
              <li><a href="#s23" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>Our Promise</a></li>
              <li><a href="#s25" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>Knowledge Center</a></li>
              <li><a href="#s18" style={{ color: '#FFFDF8', opacity: 0.7, textDecoration: 'none' }}>Head Office</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <p style={{ fontSize: '11px', color: '#9E8B6E', opacity: 0.8, lineHeight: 1.5 }}>
          © {new Date().getFullYear()} Rudralife. All Rights Reserved.<br />
          Rudraksha recommendations are spiritual guidance. ISO 9001:2015 Certified Lab.
        </p>

      </div>
    </footer>
  );
}
