import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundLayers from './components/BackgroundLayers';
import AstroWizard from './components/Interactive/AstroWizard';
import XRaySlider from './components/Interactive/XRaySlider';
import AceProcess from './components/Interactive/AceProcess';
import SriYantraCanvas from './components/Interactive/SriYantraCanvas';
import BeadOrbitViewer from './components/Interactive/BeadOrbitViewer';
import { PeaceIcon, ShieldIcon, GrowthIcon, GuidanceIcon, RareIcon, GiftIcon } from './components/Interactive/FramerIcon';
import gsap from 'gsap';
import Lenis from 'lenis';

const layerMap = {
  's1': 'bg-video-hero',
  's2': 'bg-video-milind',
  's10': 'bg-video-fire',
  's12': 'bg-video-spotlight',
  's-siddha-mala': 'bg-video-spotlight',
  's17': 'bg-video-legacy',
  's-indra-mala': 'bg-video-hero',
  's-celebrities': 'bg-img-consultation',
  's24': 'bg-video-final',
  's3': 'bg-img-map',
  's4': 'bg-img-pathway',
  's5': 'bg-img-legacy',
  's7': 'bg-img-consultation',
  's8': 'bg-img-yantra',
  's13': 'bg-img-packaging',
  's14': 'bg-img-puja',
  's21': 'bg-img-cares',
  's22': 'bg-img-community',
  's23': 'bg-img-promise'
};

export default function App() {
  const [bottomNavTab, setBottomNavTab] = useState('home');
  const [activeTab, setActiveTab] = useState('blogs');

  useEffect(() => {
    // 0. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    window.lenis = lenis;

    function onLenisRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(onLenisRaf);
    }
    requestAnimationFrame(onLenisRaf);

    // 1. Initialize IntersectionObserver for background layers swapping
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '-5% 0px -5% 0px'
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const targetLayerId = layerMap[sectionId];
          
          // Remove active class from all layers
          document.querySelectorAll('.fixed-bg-layer').forEach(layer => {
            layer.classList.remove('active');
          });

          // Activate mapped background layer
          if (targetLayerId) {
            const targetLayer = document.getElementById(targetLayerId);
            if (targetLayer) {
              targetLayer.classList.add('active');
              
              // 1. Lazy load video source on activation
              if (targetLayer.tagName === 'VIDEO') {
                const source = targetLayer.querySelector('source');
                if (source && source.dataset.src && !source.src) {
                  source.src = source.dataset.src;
                  targetLayer.load();
                }
                targetLayer.play().catch(() => {});
              }
              
              // 2. Lazy load image backgrounds on activation
              if (targetLayer.dataset.bgImg && !targetLayer.style.backgroundImage) {
                targetLayer.style.backgroundImage = `radial-gradient(circle at center, rgba(13,10,6,0.3) 0%, #0D0A06 100%), url("${targetLayer.dataset.bgImg}")`;
              }
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

    // 2. Initialize Scroll progress, Zone indicator, and GSAP playhead scrubbing
    const scrollVideo = document.getElementById('bg-video-hero');

    // Force initial frame render on load
    if (scrollVideo) {
      scrollVideo.currentTime = 0.01;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Update scroll progress bar width
      const progressEl = document.getElementById('scrollProgress');
      if (progressEl) progressEl.style.width = `${pct}%`;

      // Hero Video Scrubbing via GSAP
      const heroSec = document.getElementById('s1');
      if (heroSec && scrollVideo) {
        const rect = heroSec.getBoundingClientRect();
        const height = heroSec.offsetHeight;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const duration = scrollVideo.duration || 4.0;
          const scrollFraction = Math.max(0, Math.min(1, -rect.top / height));
          const targetTime = scrollFraction * duration;
          
          gsap.to(scrollVideo, {
            currentTime: targetTime,
            duration: 0.4,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        }
      }

      // 2.1 Scroll Reveal check: Adds 'visible' class to elements when they cross viewport
      const reveals = document.querySelectorAll('.reveal, .reveal-up');
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
        if (isVisible) {
          el.classList.add('visible');
        }
      });

      // Update active bottom navigation tab based on scrolling offsets
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      const s4Offset = document.getElementById('s4')?.offsetTop || 1000;
      const s8Offset = document.getElementById('s8')?.offsetTop || 3000;
      const s12Offset = document.getElementById('s12')?.offsetTop || 5000;
      const s22Offset = document.getElementById('s22')?.offsetTop || 8000;

      if (scrollPos >= s22Offset) {
        setBottomNavTab('account');
      } else if (scrollPos >= s12Offset) {
        setBottomNavTab('rare');
      } else if (scrollPos >= s8Offset) {
        setBottomNavTab('collections');
      } else if (scrollPos >= s4Offset) {
        setBottomNavTab('guidance');
      } else {
        setBottomNavTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Trigger initial scroll reveal and layout checks immediately on mount
    handleScroll();

    // 3. Pointer spotlight movement event listener
    const handlePointerMove = (e) => {
      const elements = document.querySelectorAll(
        '.btn-gold, .btn-outline-white, .astro-wizard-card, .jcard, .ftcard, .siddha-card, .premium-card, .rare-card'
      );
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      delete window.lenis;
      lenis.destroy();
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <>
      <Header />
      <BackgroundLayers />
      
      {/* Scroll progress bar — thin gold line at top */}
      <div id="scrollProgress" style={{ position: 'fixed', top: 0, left: 0, height: '2px', background: 'var(--gold)', zIndex: 1000, width: '0%', transition: 'width 0.1s ease-out', boxShadow: '0 0 6px rgba(196,154,60,0.5)' }}></div>
      
      {/* Persistant WhatsApp button */}
      <a href="https://wa.me/919867291461" className="whatsapp-floating" target="_blank" rel="noopener noreferrer" title="Consult an Expert">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.6 21.5l3.86-1.28C8.07 21.39 10.01 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.95 13.9c-.3.8-.9 1.4-1.6 1.7-.5.2-1.2.3-2.6-.3-1.8-.7-3.3-2.2-4-4-.6-1.4-.5-2.1-.3-2.6.3-.7.9-1.3 1.7-1.6l.4-.1.8 1.8-.4.4c-.2.2-.3.4-.3.6.1.4.5.9 1.1 1.5.6.6 1.1 1 1.5 1.1.2 0 .4-.1.6-.3l.4-.4 1.8.8-.1.4z"/></svg>
      </a>

      {/* Main Sections Body */}
      

{/* Unified Fixed Storytelling Background Layers (Split-Scroll Architecture) */}
{/* ══ TOP NAV ══ */}



{/* ══════════════════════════════════════════
     S1 · HERO BANNER — RUDRAKSHA
══════════════════════════════════════════ */}
<section id="s1" data-bg="13,10,6">
  <div className="hero-scene">
    <div className="orb">
      <div className="orb-core">📿</div>
    </div>
  </div>
  
  <div className="hero-content">
    <span className="hero-eyebrow">Rudralife — Est. 1999</span>
    <h1 className="hero-h1">A Sacred Companion<br />For Your <em>Life Journey.</em></h1>
    <p className="hero-sub">Authentic Nepal Rudraksha, guided with expertise, tradition and 25 years of unwavering trust.</p>
    <div className="hero-btns">
      <a href="#s4" className="btn-gold">Begin Your Journey →</a>
      <a href="#s7" className="btn-outline-white">New to Rudraksha? Start Here</a>
    </div>
  </div>
  <div className="trust-strip">
    <div className="ts-item"><span className="ts-val">ACE</span><span className="ts-lbl">Energized</span></div>
    <div className="ts-item"><span className="ts-val">RRTL</span><span className="ts-lbl">Lab Certified</span></div>
    <div className="ts-item"><span className="ts-val">100%</span><span className="ts-lbl">Ethically Sourced</span></div>
    <div className="ts-item"><span className="ts-val">7‑Day</span><span className="ts-lbl">Returns</span></div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S4 · GUIDED DISCOVERY
══════════════════════════════════════════ */}
<section className="dark" id="s4" data-bg="10,8,4">
  <div className="inner">
    <div className="desktop-2col">
      <div className="sh reveal">
        <span className="eyebrow">Your Path</span>
        <h2 className="display">How Would You Like<br />To <em>Begin?</em></h2>
        <p>Every journey is unique. Discover the path that resonates with you. Whether you seek deep inner peace, protection from negativity, spiritual elevation, or custom astrological consultation — we are here to walk with you.</p>
      </div>
      <div className="journey-grid reveal" style={{ marginTop: 0 }}>
        <a href="https://wa.me/919867291461?text=Hi%2C%20I%27m%20seeking%20peace%20through%20Rudraksha.%20Can%20you%20guide%20me%3F" target="_blank" rel="noopener noreferrer" className="jcard">
        <span className="jcard-icon"><PeaceIcon /></span>
        <h3>Seeking Peace</h3>
        <p>Find clarity and calm through the right Rudraksha</p>
        <span className="arrow">Explore →</span>
      </a>
      <a href="#" className="jcard">
        <span className="jcard-icon"><ShieldIcon /></span>
        <h3>Protection &amp; Safety</h3>
        <p>Shield yourself and family from negative energies</p>
        <span className="arrow">Explore →</span>
      </a>
      <a href="#" className="jcard">
        <span className="jcard-icon"><GrowthIcon /></span>
        <h3>Spiritual Growth</h3>
        <p>Deepen your practice and divine connection</p>
        <span className="arrow">Explore →</span>
      </a>
      <a href="#" className="jcard">
        <span className="jcard-icon"><GuidanceIcon /></span>
        <h3>Guidance &amp; Clarity</h3>
        <p>Navigate life's crossroads with focused intention</p>
        <span className="arrow">Explore →</span>
      </a>
      <a href="#" className="jcard" style={{gridColumn: '1 / -1', background: 'rgba(196,154,60,0.08)', borderColor: 'rgba(196,154,60,0.35)'}}>
        <span className="jcard-icon"><RareIcon /></span>
        <h3>I'm Looking for Rare Pieces</h3>
        <p>Access our exclusive collector's selection and sacred acquisitions</p>
        <span className="arrow" style={{color: 'var(--gold-lt)'}}>PRIVATE ACCESS →</span>
      </a>
    </div>
    </div>
    <AstroWizard />
{/* 5-stage progression stepper */}
    <div className="stepper-container reveal">
      <span className="eyebrow" style={{marginBottom: '12px', display: 'block'}}>Rudraksha Learning Path</span>
      <div className="stepper-line">
        <div className="step-dot active" >1</div>
        <div className="step-dot" >2</div>
        <div className="step-dot" >3</div>
        <div className="step-dot" >4</div>
        <div className="step-dot" >5</div>
      </div>
      <div className="stepper-details-box" id="stepperDetails">
        <h4 id="stepperTitle" className="display" style={{fontSize: '16px', color: 'var(--white)', marginBottom: '4px'}}>Level 1: Beginner</h4>
        <p id="stepperDesc" style={{fontSize: '12.5px', color: 'rgba(255,253,248,0.6)', lineHeight: '1.5'}}>Build a strong foundation. Focus on purification and daily alignment. Recommended: 5 Mukhi, 6 Mukhi, or basic Rudraksha bracelets.</p>
      </div>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S7 · FIRST TIME BUYING RUDRAKSHA
══════════════════════════════════════════ */}
<section className="light" id="s7" data-bg="250,246,238">
  <div className="inner">
    <div className="desktop-2col">
      <div className="sh reveal">
        <span className="eyebrow" style={{color: 'var(--teak)'}}>First Time Here?</span>
        <h2 className="display">New To Rudraksha?<br />Start With <em>Confidence.</em></h2>
        <p style={{color: 'rgba(26,18,9,0.75)'}}>Guidance, exclusive benefits and expert support for your very first step. We welcome you to experience the transformative power of authentic Nepal Rudraksha with zero friction and absolute confidence.</p>
      </div>
      <div className="ftcard reveal" style={{ marginTop: 0 }}>
        <span className="gift"><GiftIcon /></span>
        <h3>Welcome Benefits</h3>
        <ul className="blist">
          <li>10% welcome benefit on your first purchase</li>
          <li>Complimentary Puja Video performed in your name</li>
          <li>Free 7 Mukhi Devi Lakshmi Bracelet on orders above ₹15,001</li>
          <li>Dedicated expert guidance from selection to wearing</li>
          <li>Care &amp; Maintenance guide included with every order</li>
        </ul>
        <a href="#s24" className="btn-gold" style={{width: '100%', justifyContent: 'center'}}>Speak With An Expert →</a>
      </div>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S16 · STORIES OF TRANSFORMATION
══════════════════════════════════════════ */}
<section className="light" id="s16" data-bg="250,246,238">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Real People</span>
      <h2 className="display">Real Journeys.<br />Real <em>Transformations.</em></h2>
      <p>Discover how Rudraksha has quietly changed thousands of lives.</p>
    </div>
  </div>
  <div className="stories-scroll reveal">
    <div className="story-card">
      <div className="story-img">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '110px', color: 'rgba(196, 154, 60, 0.24)', lineHeight: 1, marginTop: '28px', userSelect: 'none' }}>“</span>
      </div>
      <div className="story-body">
        <span className="story-tag">Peace &amp; Clarity</span>
        <h4>"My anxiety reduced within weeks"</h4>
        <p>Priya S., Mumbai — 5 Mukhi Rudraksha</p>
      </div>
    </div>
    <div className="story-card">
      <div className="story-img">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '110px', color: 'rgba(196, 154, 60, 0.24)', lineHeight: 1, marginTop: '28px', userSelect: 'none' }}>“</span>
      </div>
      <div className="story-body">
        <span className="story-tag">Success &amp; Growth</span>
        <h4>"The clarity I needed to make the leap"</h4>
        <p>Rajiv M., Bangalore — Siddha Mala</p>
      </div>
    </div>
    <div className="story-card">
      <div className="story-img">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '110px', color: 'rgba(196, 154, 60, 0.24)', lineHeight: 1, marginTop: '28px', userSelect: 'none' }}>“</span>
      </div>
      <div className="story-body">
        <span className="story-tag">Spiritual Growth</span>
        <h4>"My meditation deepened instantly"</h4>
        <p>Anita K., Delhi — 14 Mukhi Rudraksha</p>
      </div>
    </div>
    <div className="story-card">
      <div className="story-img">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '110px', color: 'rgba(196, 154, 60, 0.24)', lineHeight: 1, marginTop: '28px', userSelect: 'none' }}>“</span>
      </div>
      <div className="story-body">
        <span className="story-tag">Health &amp; Healing</span>
        <h4>"Doctors were surprised by my recovery"</h4>
        <p>Suresh R., Chennai — 2 Mukhi Rudraksha</p>
      </div>
    </div>
  </div>
  <div style={{textAlign: 'center', padding: '0 20px', marginTop: '6px'}} className="reveal">
    <a href="#" className="btn-teak">Watch Experiences &amp; Read More Stories →</a>
  </div>
</section>




{/* ══════════════════════════════════════════
     S2 · HERO BANNER — MILIND SOMAN
══════════════════════════════════════════ */}
<section className="dark hero-banner-sec" id="s2" data-bg="13,10,6">
  <div className="inner">
    <div className="desktop-2col">
      <div className="sh reveal">
        <span className="eyebrow">From Seeker To Advocate</span>
        <h2 className="display">A Journey That Began<br />With A Siddha Mala.</h2>
        <p style={{ marginTop: '16px', color: 'var(--muted)' }}>Discover the personal experience that turned a prominent fitness icon into a passionate advocate for Vedic Rudraksha wisdom.</p>
        <div style={{ marginTop: '22px' }}>
          <a href="#" className="btn-outline">Watch His Story →</a>
        </div>
      </div>
      <div className="milind-wrap reveal" style={{ marginTop: 0 }}>
        <div className="milind-img">
          <div className="milind-badge">
            <span className="bv">Siddha</span>
            <span className="bl">Mala Wearer</span>
          </div>
          <img src="/milind_soman.png" alt="Milind Soman wearing Siddha Mala" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
        <div className="milind-body">
          <blockquote>"I wear my Siddha Mala every single day. Not because someone told me to — because I felt the difference myself."</blockquote>
          <span className="attrib">— Milind Soman, Fitness Icon &amp; Ironman</span>
        </div>
      </div>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S3 · HERO BANNER — CLIENTS / TRUST
══════════════════════════════════════════ */}
<section className="dark hero-banner-sec" id="s3" data-bg="20,14,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Our Community</span>
      <h2 className="display">Trusted By Seekers<br />Across The World.</h2>
      <p>From first-time buyers to lifelong collectors — every journey matters.</p>
    </div>
    <div className="world-trust reveal">
      <div className="map-world-container reveal">
      <div className="map-world-dots"></div>
      <div className="map-pulse-dot" style={{top: '60%', left: '63%'}} title="Mumbai"></div>
      <div className="map-pulse-dot" style={{top: '55%', left: '62%'}} title="Delhi"></div>
      <div className="map-pulse-dot" style={{top: '52%', left: '56%'}} title="Dubai"></div>
      <div className="map-pulse-dot" style={{top: '35%', left: '47%'}} title="London"></div>
      <div className="map-pulse-dot" style={{top: '38%', left: '24%'}} title="New York"></div>
      <div className="map-pulse-dot" style={{top: '66%', left: '74%'}} title="Singapore"></div>
      <div className="map-pulse-dot" style={{top: '80%', left: '88%'}} title="Sydney"></div>
    </div>
      <p style={{fontSize: '13px', color: 'rgba(255,253,248,.55)', marginBottom: '14px'}}>
        Seekers across India, UAE, US, UK, Singapore, Australia and more
      </p>
      <div className="trust-chips">
        <div className="chip"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 6c-3 0-5 2.5-5 5.5s1 4.5 3 4.5h4c2 0 3-1.5 3-4.5S15 9 12 9zm-1 9v2h2v-2h-2z"/></svg></span>Seekers</div>
        <div className="chip"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10-2h4v2h-4V4zm10 14H4V8h16v10z"/></svg></span>Professionals</div>
        <div className="chip"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M5 16h14a1 1 0 0 0 1-1l-2-6-4 4-2-6-2 6-4-4-2 6a1 1 0 0 0 1 1zm-1 2h16v2H4v-2z"/></svg></span>Leaders</div>
        <div className="chip"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M13.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-1.1 3.2L9.6 13l2.8.9v5.6h2v-4.5l-2-.7 1.8-3.1 3.5 1.5.8-1.8-4.5-2.2z"/></svg></span>Athletes</div>
        <div className="chip"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2a10 10 0 0 0 0 20c1.2 0 2.2-1 2.2-2.2 0-.5-.2-1-.5-1.4l-.2-.3c-.3-.3-.4-.5-.4-.8 0-.6.4-1 1-1h1.9c3 0 5-2.4 5-5.3C21 6.5 17 2 12 2zm-5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg></span>Artists</div>
        <div className="chip"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2s-4 4-4 8v5l4 3 4-3v-5c0-4-4-4-4-4zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg></span>Entrepreneurs</div>
        <div className="chip"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5.5 8.5v3.5h-11v-3.5H5v-4h14v4h-1.5z"/></svg></span>Families</div>
      </div>
    </div>
    <div className="trust-stats reveal">
      <div className="ts-cell"><span className="ts-num">1,008+</span><span className="ts-lab">Google Reviews</span></div>
      <div className="ts-cell"><span className="ts-num">1,000+</span><span className="ts-lab">Written Stories</span></div>
      <div className="ts-cell"><span className="ts-num">Video</span><span className="ts-lab">Testimonials</span></div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-outline">Read 1,000+ Stories →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S5 · 3 GENERATIONS OF LEGACY
══════════════════════════════════════════ */}
<section className="light" id="s5" data-bg="250,246,238">
  <div className="inner">
    <div className="desktop-2col">
      <div className="sh reveal">
        <span className="eyebrow" style={{color: 'var(--teak)'}}>Our Heritage</span>
        <h2 className="display" style={{color: 'var(--black)'}}>Three Generations.<br />One Lifelong Commitment.</h2>
        <p style={{color: 'rgba(26,18,9,0.75)'}}>Over a century of combined experience dedicated to authentic Rudraksha guidance. Our family legacy is built on the pillars of absolute scientific purity, deep scriptural research, and direct relationships with Nepal's farmers.</p>
      </div>
      <div className="stat6 reveal" style={{ marginTop: 0 }}>
        <div className="s6cell"><span className="s6num">25+</span><span className="s6lbl">Years of Trust</span></div>
      <div className="s6cell"><span className="s6num">2.75L+</span><span className="s6lbl">Seekers Guided</span></div>
      <div className="s6cell"><span className="s6num">1,200+</span><span className="s6lbl">Global Exhibitions</span></div>
      <div className="s6cell"><span className="s6num">ISO</span><span className="s6lbl">Laboratory</span></div>
      <div className="s6cell"><span className="s6num">10,000+</span><span className="s6lbl">Journeys</span></div>
      <div className="s6cell"><span className="s6num">100%</span><span className="s6lbl">Authentic &amp; Ethically Sourced</span></div>
    </div>
    </div>
    <div className="gen-timeline reveal">
      <div className="gen-row">
        <div className="gen-num">I</div>
        <div>
          <h4>The Founding Vision</h4>
          <p>Grandfather's deep-rooted knowledge of Nepal sourcing, building sacred relationships with farming communities spanning decades.</p>
        </div>
      </div>
      <div className="gen-row">
        <div className="gen-num">II</div>
        <div>
          <h4>Science Meets Tradition</h4>
          <p>Built India's first dedicated Rudraksha lab — RRTL — marrying Vedic wisdom with X-ray scientific verification.</p>
        </div>
      </div>
      <div className="gen-row">
        <div className="gen-num">III</div>
        <div>
          <h4>Global Trust, Local Roots</h4>
          <p>Expanded to 20+ Indian cities and 5+ international destinations while keeping every bead individually energized and tested.</p>
        </div>
      </div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#s17" className="btn-teak">Our Legacy Story →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S15 · HEART BEHIND RUDRALIFE
══════════════════════════════════════════ */}
<section className="dark" id="s15" data-bg="13,10,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Our People</span>
      <h2 className="display">The People Behind<br />Every Blessing.</h2>
      <p>Experts, artisans, scientists and Vedic Brahmins working together with care and purpose.</p>
    </div>
    <div className="team-grid reveal">
      <div className="tcard">
        <span className="ti"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M9 3l4 7H5l4-7zM6 21h12M12 10v11"/><path d="M17 21H7a1 1 0 0 1-.89-1.45l2-4h5.78l2 4A1 1 0 0 1 17 21z" opacity="0.3"/></svg></span>
        <h4>Lab Scientists</h4>
        <p>RRTL-certified testing on every single bead</p>
      </div>
      <div className="tcard">
        <span className="ti"><svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle'}}><text x="16" y="22" textAnchor="middle" fontSize="20" fontFamily="serif">ॐ</text></svg></span>
        <h4>Vedic Brahmins</h4>
        <p>Authentic energization rituals performed daily</p>
      </div>
      <div className="tcard">
        <span className="ti"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5" opacity="0.6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg></span>
        <h4>Spiritual Advisors</h4>
        <p>Guiding every seeker on their personal journey</p>
      </div>
      <div className="tcard">
        <span className="ti"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M3 12c0-4 9-10 9-10s9 6 9 10a9 9 0 0 1-18 0z"/><path d="M12 2v20M6 10c0 3 2.7 5 6 5s6-2 6-5" opacity="0.5"/></svg></span>
        <h4>Mala Artisans</h4>
        <p>Crafting each piece with devotion and skill</p>
      </div>
      <div className="tcard">
        <span className="ti"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></span>
        <h4>Support Team</h4>
        <p>Operations &amp; Care — Ensuring secure, insured shipping &amp; post-purchase assistance.</p>
      </div>
    </div>
    <div style={{textAlign: 'center', marginTop: '8px'}} className="reveal">
      <a href="#" className="btn-outline">Meet The Full Team →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S18 · RUDRALIFE HEAD OFFICE
══════════════════════════════════════════ */}
<section className="light" id="s18" data-bg="250,246,238">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Our Home</span>
      <h2 className="display" style={{color: 'var(--black)'}}>A Place Built On<br />Faith And Trust.</h2>
      <p>Step inside the home of one of the world's most respected Rudraksha organisations.</p>
    </div>
    <div className="office-gallery reveal">
      <div className="oimg o1"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h20v-2H2v2zm18-12v7h3v-7h-3zM12 2L2 6v2h20V6L12 2z"/></svg>️</div>
      <div className="oimg o2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M9 3l4 7H5l4-7zM6 21h12M12 10v11"/><path d="M17 21H7a1 1 0 0 1-.89-1.45l2-4h5.78l2 4A1 1 0 0 1 17 21z" opacity="0.3"/></svg></div>
      <div className="oimg o3"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><circle cx="12" cy="6" r="1.5" fill="currentColor"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></svg></div>
    </div>
    <div className="office-quote reveal">
      "Every Rudraksha that enters our office is examined, tested, energized and lovingly packaged before reaching the person it's truly meant for."
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-teak">Take A Virtual Tour →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S17 · 25 YEARS OF TRUST
══════════════════════════════════════════ */}
<section className="dark" id="s17" data-bg="13,10,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Est. 1999</span>
      <h2 className="display">25 Years Of Serving<br />Spiritual <em>Seekers.</em></h2>
      <p>A journey shaped by trust, tradition and meaningful human impact.</p>
    </div>
    <div className="legacy-hero reveal">
      <div className="legacy-big">25</div>
      <div className="legacy-label">Years of Trust</div>
    </div>
    <div className="milestones reveal">
      <div className="milestone">
        <span className="my">1999</span>
        <p>Founded in Mumbai — make authentic Rudraksha accessible to sincere seekers</p>
      </div>
      <div className="milestone">
        <span className="my">2004</span>
        <p>Established India's first dedicated Rudraksha testing laboratory — RRTL</p>
      </div>
      <div className="milestone">
        <span className="my">2010</span>
        <p>First international exhibitions — Singapore, Dubai and the UK</p>
      </div>
      <div className="milestone">
        <span className="my">2016</span>
        <p>Achieved ISO 9001:2015 certification — formally recognising our quality standards</p>
      </div>
      <div className="milestone">
        <span className="my">2024</span>
        <p>2,75,000+ beads tested, 10,000+ seekers guided — every journey still treated as personal</p>
      </div>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S9 · RRTL LAB
══════════════════════════════════════════ */}
<section className="light" id="s9" data-bg="250,246,238">
  <div className="inner">
    <div className="desktop-2col">
      <div className="sh reveal">
        <span className="eyebrow" style={{color: 'var(--teak)'}}>Science &amp; Trust</span>
        <h2 className="display" style={{color: 'var(--black)'}}>Authenticity You<br />Can Verify.</h2>
        <p style={{color: 'rgba(26,18,9,0.75)'}}>India's first dedicated Rudraksha testing laboratory — where ancient beads meet modern science. Every bead is subjected to non-destructive testing, checking under X-ray, microscopy, and physical density metrics to ensure perfect purity and grading.</p>
        <div style={{marginTop: '22px'}}>
          <a href="#" className="btn-teak">Explore Our Testing Process →</a>
        </div>
      </div>
      <XRaySlider />
    </div>

    <div className="lab-nums reveal">
      <div className="lnum"><span className="n">2.75L+</span><span className="l">Beads Tested</span></div>
      <div className="lnum"><span className="n">10+</span><span className="l">Verification Parameters</span></div>
      <div className="lnum"><span className="n">Strict</span><span className="l">Rejection Standards</span></div>
    </div>
    <div className="lab-steps reveal">
      <div className="lstep">
        <div className="ldot">1</div>
        <div>
          <h4>Visual Inspection</h4>
          <p>Examined under magnification to count Mukhs and check for artificial cuts or surface damage.</p>
        </div>
      </div>
      <div className="lstep">
        <div className="ldot">2</div>
        <div>
          <h4>X-Ray Analysis</h4>
          <p>Internal seed compartments mapped to confirm the exact Mukhi count with scientific precision.</p>
        </div>
      </div>
      <div className="lstep">
        <div className="ldot">3</div>
        <div>
          <h4>Weight &amp; Dimension</h4>
          <p>Precise measurements confirm origin — Nepali beads have distinct signatures that cannot be faked.</p>
        </div>
      </div>
      <div className="lstep">
        <div className="ldot">4</div>
        <div>
          <h4>Certification Issued</h4>
          <p>A government-lab backed certificate is issued with X-ray scan and full test data for each bead.</p>
        </div>
      </div>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S8 · ACE PROCESS
══════════════════════════════════════════ */}
<section className="dark" id="s8" data-bg="13,10,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Our Method</span>
      <h2 className="display">More Than Authentic.<br />Carefully Energized.</h2>
      <p>Every Rudraksha passes through three layers of integrity before reaching you.</p>
    </div>
    
    <AceProcess />

    <div className="ace-flow reveal">
      <div className="ace-step">
        <div className="ace-icon"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>
        <div>
          <h4>Authentic Selection</h4>
          <p>Visual, X-ray and dimensional lab testing in our RRTL — zero artificial treatment or modifications accepted.</p>
        </div>
      </div>
      <div className="ace-step">
        <div className="ace-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M4 4l7 7M4 11l7-7M15 4l5 5-10 11H5v-5L15 4z"/></svg></div>
        <div>
          <h4>Cleanse &amp; Prepare</h4>
          <p>Beads are cleansed with Gangajal, sandalwood paste and Panchgavya to purify before energization begins.</p>
        </div>
      </div>
      <div className="ace-step">
        <div className="ace-icon"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/></svg></div>
        <div>
          <h4>Energetic Alignment</h4>
          <p>Vedic Brahmins perform Abhishek and Pranapratishtha — invoking the presiding deity of each specific Mukhi.</p>
        </div>
      </div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-outline">Learn About ACE →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S10 · VEDIC ENERGIZATION
══════════════════════════════════════════ */}
<section className="dark" id="s10" data-bg="20,14,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">The Sacred Ritual</span>
      <h2 className="display">Prepared With Intention<br />And Reverence.</h2>
      <p>Each Rudraksha is energized through authentic Vedic rituals before it reaches you.</p>
    </div>
    <div className="ritual-list reveal">
      <div className="ritual-item">
        <span className="ri"><svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle'}}><text x="16" y="22" textAnchor="middle" fontSize="20" fontFamily="serif">ॐ</text></svg></span>
        <div>
          <h4>Mantra Energization</h4>
          <p>The specific Beej Mantra of each Mukhi is chanted 108 times by qualified Vedic Brahmins.</p>
        </div>
      </div>
      <div className="ritual-item">
        <span className="ri"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><ellipse cx="12" cy="20" rx="7" ry="2.5"/><path d="M12 17.5V10M9 10c0-1.5 1-3 3-5 2 2 3 3.5 3 5a3 3 0 0 1-6 0z"/><circle cx="12" cy="5" r="1" fill="currentColor"/></svg></span>
        <div>
          <h4>Ritual Puja</h4>
          <p>Full Abhishek ceremony performed with Gangajal, kumkum, flowers and lit diyas.</p>
        </div>
      </div>
      <div className="ritual-item">
        <span className="ri"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M12 2.5C12 2.5 5 10 5 14a7 7 0 0 0 14 0c0-4-7-11.5-7-11.5z"/></svg></span>
        <div>
          <h4>Purification Process</h4>
          <p>Beads are bathed in Panchgavya and sandalwood paste to remove all accumulated energies.</p>
        </div>
      </div>
      <div className="ritual-item">
        <span className="ri"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><circle cx="12" cy="6" r="1.5" fill="currentColor"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></svg></span>
        <div>
          <h4>Sacred Handling Practices</h4>
          <p>Every bead is handled with consecrated hands only — never with unconsecrated contact.</p>
        </div>
      </div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-outline">Watch Energization Video →</a>
    </div>

    {/* Animated Sri Yantra Sacred Geometry */}
    <div className="yantra-section-wrapper reveal">
      <SriYantraCanvas size={280} />
      <div className="yantra-label">
        <h3>The Sri Yantra — Sacred Geometry of Creation</h3>
        <p>Geometric blueprint of cosmic consciousness</p>
      </div>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S11 · MALA MAKING MASTERY
══════════════════════════════════════════ */}
<section className="linen" id="s11" data-bg="232,223,200">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Handcrafted Malas</span>
      <h2 className="display" style={{color: 'var(--black)'}}>Crafted To Be Worn<br />For A Lifetime.</h2>
      <p>Designed with precision, comfort and spiritual significance. 25+ styles. Built for you.</p>
    </div>
    <div className="mala-grid reveal">
      <div className="mala-card">
        <span className="mi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#C49A3C" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8" strokeWidth="1.2" opacity="0.5"/></svg></span>
        <h4>Gold Malas</h4>
        <p>Premium collector</p>
      </div>
      <div className="mala-card">
        <span className="mi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4" opacity="0.3"/></svg></span>
        <h4>Silver Malas</h4>
        <p>Elegant &amp; sacred</p>
      </div>
      <div className="mala-card">
        <span className="mi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M5 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4 4-2 4-4 2-4 4-4 4 2 4 4"/></svg></span>
        <h4>Scratch Malas</h4>
        <p>Traditional style</p>
      </div>
      <div className="mala-card">
        <span className="mi"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><circle cx="12" cy="6" r="1.5" fill="currentColor"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></svg></span>
        <h4>Bead Malas</h4>
        <p>Pure Rudraksha</p>
      </div>
      <div className="mala-card">
        <span className="mi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21V9L6 3M12 21V9l6-6"/></svg></span>
        <h4>Full Malas</h4>
        <p>108+1 count</p>
      </div>
      <div className="mala-card">
        <span className="mi"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.3em',height:'1.3em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M20 6h-2.18c.11-.31.18-.65.18-1a2.5 2.5 0 0 0-5-0.5L12 6l-1-1.5a2.5 2.5 0 0 0-5 0.5c0 .35.07.69.18 1H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .41-.16.78-.44 1.06L12 8V4.5zm-4.5-1.5C8.33 3 9 3.67 9 4.5V8H6.44c-.28-.28-.44-.65-.44-1.06 0-.83.67-1.5 1.5-1.5zM4 8h7v10H4V8zm16 10h-7V8h7v10z"/></svg></span>
        <h4>Custom Design</h4>
        <p>Made for you</p>
      </div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-teak">Explore All Malas →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S12 · RAREST COLLECTIONS
══════════════════════════════════════════ */}
<section className="dark" id="s12" data-bg="13,10,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">For The Serious Collector</span>
      <h2 className="display">Among The World's Most<br />Extraordinary Rudraksha.</h2>
      <p>Rare, collectible and deeply revered pieces sourced with utmost care and verified individually.</p>
    </div>
    <div className="rare-cards reveal">
      <a href="#" className="rare-card">
        <div className="rare-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/></svg></div>
        <div>
          <h4>Ek Mukhi Kaju</h4>
          <p>The rarest form — half-moon shaped, governs the Sun. Very few available annually.</p>
          <span className="rare-tag"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle',marginRight:'3px'}}><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/></svg> Extremely Limited</span>
        </div>
      </a>
      <a href="#" className="rare-card">
        <div className="rare-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
        <div>
          <h4>20 &amp; 21 Mukhi</h4>
          <p>Highest Mukhi count — extremely scarce, sourced directly from Nepal forests.</p>
          <span className="rare-tag"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle',marginRight:'3px'}}><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/></svg> Collector Grade</span>
        </div>
      </a>
      <a href="#" className="rare-card">
        <div className="rare-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><ellipse cx="12" cy="12" rx="6" ry="10"/><circle cx="12" cy="8" r="2"/><path d="M9 13c0 2 1.5 3 3 3s3-1 3-3"/></svg></div>
        <div>
          <h4>Trijuti Rudraksha</h4>
          <p>Natural three-bead cluster — exceptionally auspicious and protective.</p>
          <span className="rare-tag"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle',marginRight:'3px'}}><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/></svg> Naturally Fused</span>
        </div>
      </a>
      <a href="#" className="rare-card">
        <div className="rare-icon"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/></svg></div>
        <div>
          <h4>Gauri Shankar</h4>
          <p>Two naturally joined beads — Shiva &amp; Parvati united for harmony and relationships.</p>
          <span className="rare-tag"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle',marginRight:'3px'}}><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/></svg> Naturally Joined</span>
        </div>
      </a>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-gold">Explore Rare Collections →</a>
    </div>

    {/* Interactive 3D Bead Viewer */}
    <div className="reveal" style={{marginTop: '32px'}}>
      <BeadOrbitViewer mukhiCount={1} label="Ek Mukhi Kaju" subtitle="Rarest Form · Half-Moon · Sun" />
    </div>
  </div>
</section>


{/* ══════════════════════════════════════════ */}
<section className="dark" id="s-siddha-mala" data-bg="18,12,6">
  <div className="inner">
    <div className="sh reveal">
      <div className="siddha-trademark-seal">Original<br />Siddha Mala<br />Only By<br />Rudralife</div>
      <span className="eyebrow">Flagship Combination</span>
      <h2 className="display">The World's Most<br />Powerful <em>Mala.</em></h2>
      <p>A registered trademark combination representing supreme alignment of the nine ruling planetary deities.</p>
    </div>
    
    <div style={{border: '1px solid rgba(196,154,60,0.2)', borderRadius: '16px', padding: '22px', background: 'rgba(196,154,60,0.04)', marginBottom: '22px'}} className="reveal">
      <h4 className="display" style={{fontSize: '18px', color: 'var(--white)', marginBottom: '12px', textAlign: 'center'}}>Vedic Astrology Matrix</h4>
      <p style={{fontSize: '12px', color: 'rgba(255,253,248,0.7)', lineHeight: '1.5', marginBottom: '16px', textAlign: 'center'}}>
        Contains beads from 1 to 14 Mukhi, including Gauri Shankar and Ganesh Rudraksha, balancing all major planetary currents.
      </p>
      <div className="planet-chart">
        <div className="planet-node"><span className="pv">☉</span><span className="pl">Sun</span></div>
        <div className="planet-node"><span className="pv">☽</span><span className="pl">Moon</span></div>
        <div className="planet-node"><span className="pv">☿</span><span className="pl">Merc</span></div>
        <div className="planet-node"><span className="pv">♀</span><span className="pl">Venus</span></div>
        <div className="planet-node"><span className="pv">♂</span><span className="pl">Mars</span></div>
        <div className="planet-node"><span className="pv">♃</span><span className="pl">Jup</span></div>
        <div className="planet-node"><span className="pv">♄</span><span className="pl">Sat</span></div>
        <div className="planet-node"><span className="pv">☊</span><span className="pl">Rahu</span></div>
      </div>
      <ul className="blist" style={{marginTop: '18px'}}>
        <li style={{color: 'var(--white)'}}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#C49A3C" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle',marginRight:'6px',flexShrink:0}}><path d="M20 6L9 17l-5-5"/></svg> Maximize personal charisma and influence</li>
        <li style={{color: 'var(--white)'}}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#C49A3C" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle',marginRight:'6px',flexShrink:0}}><path d="M20 6L9 17l-5-5"/></svg> Overcome generational blockages (Kaal Sarp)</li>
        <li style={{color: 'var(--white)'}}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#C49A3C" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle',marginRight:'6px',flexShrink:0}}><path d="M20 6L9 17l-5-5"/></svg> Aura shield against workplace negativity</li>
      </ul>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="https://wa.me/919867291461" target="_blank" className="btn-gold">Explore Siddha Mala Details →</a>
    </div>
  </div>
</section>


{/* ══════════════════════════════════════════
     S13 · SACRED PACKAGING
══════════════════════════════════════════ */}
<section className="dark" id="s13" data-bg="24,18,8">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">The Unboxing Experience</span>
      <h2 className="display">A Sacred Experience<br />From Our Hands To Yours.</h2>
      <p>The moment your Rudraksha arrives should feel as meaningful as wearing it.</p>
    </div>
    <div className="pkg-hero reveal">
      <span className="box-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg></span>
      <h3>What's Inside Every Order</h3>
      <ul className="pkg-list">
        <li>Authenticity Certificate with X-ray scan data</li>
        <li>Energization Documentation — ritual performed in your name</li>
        <li>Care &amp; Wearing Guidance booklet with mantras</li>
        <li>Premium Protective Packaging — wooden or high-grade box</li>
        <li>Small bottle of Gangajal for initial home cleansing</li>
        <li>Sandalwood oil sachet and a soft maintenance brush</li>
      </ul>
    </div>
    <div style={{textAlign: 'center', marginTop: '20px'}} className="reveal">
      <a href="#" className="btn-outline">View Packaging Details →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S19 · WORLD'S LARGEST EXHIBITIONS
══════════════════════════════════════════ */}
<section className="linen" id="s19" data-bg="232,223,200">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Experience In Person</span>
      <h2 className="display" style={{color: 'var(--black)'}}>Experience Rudraksha<br />In Person.</h2>
      <p>Thousands of seekers discover clarity through our exhibitions every year.</p>
    </div>
    <div className="exh-map reveal">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" style={{display:'inline-block',verticalAlign:'middle',opacity:0.5}}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
      <p>Interactive city finder — coming soon</p>
    </div>
    <div className="exh-stat4 reveal">
      <div className="estat"><span className="esvl">20+</span><span className="esll">Cities Visited Annually</span></div>
      <div className="estat"><span className="esvl">5+</span><span className="esll">International Destinations</span></div>
      <div className="estat"><span className="esvl">500+</span><span className="esll">Exhibitions Conducted</span></div>
      <div className="estat"><span className="esvl">Free</span><span className="esll">Entry &amp; Consultation</span></div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-gold">Find An Exhibition Near You →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S14 · RUDRAKSHA PUJAS
══════════════════════════════════════════ */}
<section className="dark" id="s14" data-bg="20,14,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Sacred Services</span>
      <h2 className="display">Your Journey Continues<br />Beyond Ownership.</h2>
      <p>Participate in sacred rituals dedicated to spiritual growth and blessings — performed in your name.</p>
    </div>
    <div className="puja-list reveal">
      <div className="puja-item">
        <span className="pi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M12 2v20M7 6c0-2 2-4 5-4s5 2 5 4-2 4-5 4-5-2-5-4zM5 8h14"/><path d="M5 8l-2 4M19 8l2 4"/></svg></span>
        <div>
          <h4>Rudrabhishek</h4>
          <p>Sacred bathing ritual for Lord Shiva — for blessings, protection and deep inner peace</p>
        </div>
      </div>
      <div className="puja-item">
        <span className="pi"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-17.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg></span>
        <div>
          <h4>Lakshmi Puja</h4>
          <p>For prosperity, wealth and abundance in home and business</p>
        </div>
      </div>
      <div className="puja-item">
        <span className="pi"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5 11h-11C5.1 13 4 14.1 4 15.5V22h16v-6.5c0-1.4-1.1-2.5-2.5-2.5z"/></svg></span>
        <div>
          <h4>Rudraksha Pranapratishtha</h4>
          <p>Full energization ceremony for your newly acquired Rudraksha or Mala</p>
        </div>
      </div>
      <div className="puja-item">
        <span className="pi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><rect x="9" y="10" width="6" height="12" rx="1"/><path d="M12 10V7"/><path d="M10 7c0-1 2-3 2-3s2 2 2 3a2 2 0 0 1-4 0z" fill="currentColor" opacity="0.5"/></svg></span>
        <div>
          <h4>Navagraha Shanti</h4>
          <p>Planetary pacification for challenging astrological alignments</p>
        </div>
      </div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#s24" className="btn-gold">Explore Pujas →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S25 · BESTSELLING BOOKS + KNOWLEDGE CENTER
══════════════════════════════════════════ */}
<section className="dark" id="s25" data-bg="13,10,6">
  {/* Knowledge Center */}
  <div className="inner">
    <div className="sh reveal" style={{marginBottom: '22px'}}>
      <span className="eyebrow">Knowledge Center</span>
      <h3 className="display" style={{fontSize: 'clamp(22px,6vw,30px)'}}>Learn. Reflect. Grow.</h3>
      <p>Explore podcasts, articles and insights from decades of research.</p>
    </div>
    <div className="ktabs reveal" role="tablist" aria-label="Knowledge center">
      <button
        className={`ktab ${activeTab === 'blogs' ? 'active' : ''}`}
        role="tab"
        id="tab-blogs"
        aria-selected={activeTab === 'blogs'}
        aria-controls="k-blogs"
        onClick={() => setActiveTab('blogs')}
      >Blogs</button>
      <button
        className={`ktab ${activeTab === 'myths' ? 'active' : ''}`}
        role="tab"
        id="tab-myths"
        aria-selected={activeTab === 'myths'}
        aria-controls="k-myths"
        onClick={() => setActiveTab('myths')}
      >Myths</button>
      <button
        className={`ktab ${activeTab === 'care' ? 'active' : ''}`}
        role="tab"
        id="tab-care"
        aria-selected={activeTab === 'care'}
        aria-controls="k-care"
        onClick={() => setActiveTab('care')}
      >Care</button>
    </div>
    <div
      className={`kpanel ${activeTab === 'blogs' ? 'active' : ''}`}
      id="k-blogs"
      role="tabpanel"
      aria-labelledby="tab-blogs"
      hidden={activeTab !== 'blogs'}
    >
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></span>
        <div><h4>How to Choose Your First Rudraksha</h4><p>A beginner's guide to selecting the right bead</p></div>
      </a>
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span>
        <div><h4>Understanding Mukhi Numbers 1–21</h4><p>What each Mukhi represents and governs</p></div>
      </a>
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 19v3M9 22h6"/></svg></span>
        <div><h4>Podcast: Sacred Science of Rudraksha</h4><p>45-min deep dive with Rudralife founders</p></div>
      </a>
    </div>
    <div
      className={`kpanel ${activeTab === 'myths' ? 'active' : ''}`}
      id="k-myths"
      role="tabpanel"
      aria-labelledby="tab-myths"
      hidden={activeTab !== 'myths'}
    >
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#E05555" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle'}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
        <div><h4>Can Women Wear Rudraksha?</h4><p>Debunking the myth — no scriptural restrictions</p></div>
      </a>
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#E05555" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle'}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
        <div><h4>Should I Remove It While Sleeping?</h4><p>Scriptures say 24/7 — here's what we recommend</p></div>
      </a>
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#E05555" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle'}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
        <div><h4>Do Cheap Rudraksha Work The Same?</h4><p>The truth about formalin-treated beads</p></div>
      </a>
    </div>
    <div
      className={`kpanel ${activeTab === 'care' ? 'active' : ''}`}
      id="k-care"
      role="tabpanel"
      aria-labelledby="tab-care"
      hidden={activeTab !== 'care'}
    >
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M12 2.5C12 2.5 5 10 5 14a7 7 0 0 0 14 0c0-4-7-11.5-7-11.5z"/></svg></span>
        <div><h4>Monthly Oiling &amp; Cleaning Ritual</h4><p>Maintain with almond oil and clean water</p></div>
      </a>
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M3 21c3-9 8-15 18-17C20 13 14 18 3 21z"/></svg></span>
        <div><h4>Energising Your Rudraksha at Home</h4><p>Daily practices to keep your bead's energy alive</p></div>
      </a>
      <a href="#" className="kitem">
        <span className="kii"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg></span>
        <div><h4>Storing Collector Beads Properly</h4><p>Long-term preservation for rare Rudraksha</p></div>
      </a>
    </div>
    <div style={{textAlign: 'center', marginTop: '6px'}} className="reveal">
      <a href="#" className="btn-outline">Browse All Articles &amp; Podcasts →</a>
    </div>
  </div>

  {/* Divider */}
  <div className="inner" style={{marginTop: '36px', marginBottom: '24px'}}>
    <div className="divider reveal">
      <div className="divider-dot"></div>
    </div>
  </div>

  {/* Bestselling Books */}
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Bestselling Books</span>
      <h2 className="display">Go Deeper Into<br />The World Of Rudraksha.</h2>
      <p>Authentic research and spiritual wisdom captured across bestselling volumes.</p>
    </div>
  </div>

  <div className="books-scroll reveal">
    <div className="book-card">
      <div className="book-cover bc1"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C49A3C" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
      <h4>Rudra Mantra — The Bead of the Gods</h4>
      <p>Isha Khandelwal</p>
    </div>
    <div className="book-card">
      <div className="book-cover bc2"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7C9EC4" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
      <h4>Spiritual Journey with Rudraksha</h4>
      <p>Kiran Mehta</p>
    </div>
    <div className="book-card">
      <div className="book-cover bc3"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7CB87C" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
      <h4>The Power of Rudraksha</h4>
      <p>Vedic Research Team</p>
    </div>
    <div className="book-card">
      <div className="book-cover bc4"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C4A07C" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
      <h4>Living With Shiva — A Devotee's Guide</h4>
      <p>Rudralife Publications</p>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S20 · FIGHT AGAINST FAKES
══════════════════════════════════════════ */}
<section className="dark" id="s20" data-bg="18,8,8">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: '#E05555'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px'}}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Buyer Beware</span>
      <h2 className="display">Know The Difference.<br />Protect Your Journey.</h2>
      <p>80% of Rudraksha sold in markets is fake. Learn how to identify misleading claims and avoid costly mistakes.</p>
    </div>
    <div className="fakes-alert reveal">
      <span className="ai"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px'}}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>️</span>
      <p>Many beads are treated with formalin, have artificially carved Mukhs, or are made from wood and plastic. Without lab testing they are nearly impossible to detect visually.</p>
    </div>
    <div className="fake-grid reveal">
      <div className="fake-chip">
        <span className="fi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M9 3h6M9 3l-4 15a1 1 0 0 0 .95 1.3h10.1A1 1 0 0 0 21 18L17 3"/><path d="M6 14h12" opacity="0.4"/></svg></span>
        <p>Fake Mukhi Lines</p>
      </div>
      <div className="fake-chip">
        <span className="fi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><ellipse cx="12" cy="16" rx="9" ry="4"/><path d="M3 16V8c0-2 4-4 9-4s9 2 9 4v8" opacity="0.4"/></svg></span>
        <p>Fake Holes Drilled</p>
      </div>
      <div className="fake-chip">
        <span className="fi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M2 7c0 8 10 14 10 14S22 15 22 7a10 10 0 0 0-20 0z"/><path d="M8 11c0 1 .5 2 1.5 2S11 12 11 11M13 11c0 1 .5 2 1.5 2S16 12 16 11" opacity="0.6"/></svg></span>
        <p>Hollow Body</p>
      </div>
      <div className="fake-chip">
        <span className="fi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><rect x="3" y="9" width="18" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/></svg></span>
        <p>Sold as Medicine</p>
      </div>
      <div className="fake-chip">
        <span className="fi"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><ellipse cx="12" cy="12" rx="10" ry="7"/><path d="M2 12c0 2 4.5 7 10 7s10-5 10-7M12 5v14" opacity="0.4"/></svg></span>
        <p>Fake Material</p>
      </div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#s9" className="btn-gold">Download Free Authenticity Guide →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S23 · OUR PROMISE & TRANSPARENCY
══════════════════════════════════════════ */}
<section className="dark" id="s23" data-bg="13,10,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Our Commitment</span>
      <h2 className="display">Guidance Without<br />Hidden Conditions.</h2>
      <p>Clear policies, honest communication and a genuine commitment to your trust.</p>
    </div>
    <div className="promise-cards reveal">
      <div className="pcard">
        <div className="pi2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M9 3l4 7H5l4-7zM6 21h12M12 10v11"/><path d="M17 21H7a1 1 0 0 1-.89-1.45l2-4h5.78l2 4A1 1 0 0 1 17 21z" opacity="0.3"/></svg></div>
        <div><h4>100% Lab-Tested Authenticity</h4><p>Every bead tested in our own RRTL lab — not outsourced, not skipped.</p></div>
      </div>
      <div className="pcard">
        <div className="pi2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/><polyline points="9 9 10 9"/></svg></div>
        <div><h4>Certificate of Authenticity</h4><p>Government lab-backed certificate with X-ray scan data in every order.</p></div>
      </div>
      <div className="pcard">
        <div className="pi2"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5 11h-11C5.1 13 4 14.1 4 15.5V22h16v-6.5c0-1.4-1.1-2.5-2.5-2.5z"/></svg></div>
        <div><h4>Vedic Energization, Always</h4><p>Your bead is energized by Vedic Brahmins before it is packaged.</p></div>
      </div>
      <div className="pcard">
        <div className="pi2"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2s-4 4-4 8v5l4 3 4-3v-5c0-4-4-4-4-4zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg></div>
        <div><h4>Safe, Tracked, Insured Delivery</h4><p>Premium packaging, full insurance and end-to-end tracking on every shipment.</p></div>
      </div>
      <div className="pcard">
        <div className="pi2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <div><h4>Lifetime Expert Support</h4><p>Your relationship with us doesn't end at checkout — our experts are always here.</p></div>
      </div>
    </div>
    <div className="policy-box reveal">
      <div className="days">7</div>
      <p>Day No-Questions-Asked Return Policy<br />on every purchase, no hidden clauses</p>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S21 · RUDRALIFE CARES
══════════════════════════════════════════ */}
<section className="linen" id="s21" data-bg="232,223,200">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Beyond Business</span>
      <h2 className="display" style={{color: 'var(--black)'}}>Spirituality Finds Meaning<br />Through Service.</h2>
      <p>Supporting communities, temples and causes that create lasting human impact.</p>
    </div>
    <div className="cares-grid reveal">
      <div className="cares-item">
        <span className="ci"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M3 21h18M6 21V8l6-5 6 5v13M10 21v-5h4v5"/><path d="M9 8h6M12 3v5" opacity="0.5"/></svg></span>
        <h4>Temples</h4>
        <p>Supporting the upkeep and restoration of ancient temples across India</p>
      </div>
      <div className="cares-item">
        <span className="ci"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg></span>
        <h4>Education</h4>
        <p>Funding education for children of Nepal's Rudraksha farming families</p>
      </div>
      <div className="cares-item">
        <span className="ci"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M8 4c0-.6.4-1 1-1h6a1 1 0 0 1 1 1v9a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V4z"/><path d="M4 14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5zM12 16v5M8 21h8"/></svg></span>
        <h4>Charity</h4>
        <p>Regular donations to UNICEF and local grassroots charitable causes</p>
      </div>
      <div className="cares-item">
        <span className="ci"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.2em',height:'1.2em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5h-2V13h2v3.5zm0-4.5h-2V7.5h2V12z"/></svg></span>
        <h4>Service</h4>
        <p>Fair-trade sourcing and one Rudraksha tree planted per 100 orders</p>
      </div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-teak">Follow Our Journey →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S22 · JOIN OUR VIBRANT COMMUNITY
══════════════════════════════════════════ */}
<section className="light" id="s22" data-bg="250,246,238">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Stay Connected</span>
      <h2 className="display" style={{color: 'var(--black)'}}>You Are Not Walking<br />This Path Alone.</h2>
      <p>Join a global community of seekers, learners and devotees.</p>
    </div>
    <div className="community-q reveal">
      "The path to the divine is rarely walked alone — it is walked in community."
    </div>
    <div className="social-grid reveal">
      <a href="#" className="scard sc-ig">
        <span className="sci"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span>
        <h4>Instagram</h4>
        <p>195K+ Followers</p>
      </a>
      <a href="#" className="scard sc-yt">
        <span className="sci"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" opacity="0.7"/></svg></span>
        <h4>YouTube</h4>
        <p>65K+ Subscribers</p>
      </a>
      <a href="#" className="scard sc-wa">
        <span className="sci"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
        <h4>WhatsApp</h4>
        <p>Join Our Group</p>
      </a>
      <a href="#" className="scard sc-li">
        <span className="sci"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
        <h4>LinkedIn</h4>
        <p>3K+ Connections</p>
      </a>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-teak">Follow Us →</a>
    </div>
  </div>
</section>


{/* ══════════════════════════════════════════
     S24 · INDRA MALA OFFERED TO LORD SHIVA (OPTIONAL)
══════════════════════════════════════════ */}
<section className="dark" id="s-indra-mala" data-bg="13,10,6">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow">Sacred Offering</span>
      <h2 className="display">Offered At The<br />Feet Of <em>Mahadev.</em></h2>
      <p>A rare spiritual moment reflecting devotion, gratitude and reverence before ownership.</p>
    </div>
    <div className="indra-card reveal">
      <div className="indra-icon-wrapper">🔱</div>
      <h3>The Indra Mala Blessing Ritual</h3>
      <p style={{fontSize: '14px', color: 'rgba(255,253,248,0.65)', marginBottom: '18px', textAlign: 'center'}}>
        Reserved for our most extraordinary 1 to 21 Mukhi combinations. Each Indra Mala is taken to the historic temples of Lord Shiva for direct sanctification.
      </p>
      <div className="indra-features">
        <div className="indra-feat-item">
          <strong>Direct Sanctification:</strong> Offered at the sanctum sanctorum (Garbhagriha) of Kashi Vishwanath or Pashupatinath temple.
        </div>
        <div className="indra-feat-item">
          <strong>Vedic Abhishek:</strong> Energized through traditional milk, honey, and gangajal rituals by senior priests.
        </div>
        <div className="indra-feat-item">
          <strong>Archana & Blessings:</strong> Performed specifically in your name and gotra, with full video verification shared.
        </div>
      </div>
    </div>
  </div>
</section>

{/* ══════════════════════════════════════════
     S25 · CELEBRITIES & INFLUENCERS (OPTIONAL)
══════════════════════════════════════════ */}
<section className="linen" id="s-celebrities" data-bg="232,223,200">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Vetted Experiences</span>
      <h2 className="display">Chosen By Those Who<br />Value <em>Authenticity.</em></h2>
      <p>Worn by leaders, executives, and spiritual seekers who discovered Rudraksha through genuine experience.</p>
    </div>
    <div className="cel-grid reveal">
      <div className="cel-card">
        <div className="cel-quote">
          "Wearing the Siddha Mala has brought a deep level of centered focus and mental resilience to my daily decision making. The authenticity is something you feel."
        </div>
        <div className="cel-meta">
          <div className="cel-avatar">AM</div>
          <div className="cel-info">
            <h4>Aditya Mehta</h4>
            <p>Managing Director, Tech Capital</p>
          </div>
        </div>
      </div>
      <div className="cel-card">
        <div className="cel-quote">
          "Finding original Nepali beads is extremely difficult today. Rudralife's certifications and scientific approach give me complete peace of mind."
        </div>
        <div className="cel-meta">
          <div className="cel-avatar">DS</div>
          <div className="cel-info">
            <h4>Dr. Sanjay Sharma</h4>
            <p>Senior Consultative Cardiologist</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* ══════════════════════════════════════════
     S6 · OUR CLIENTS
══════════════════════════════════════════ */}
<section className="linen" id="s6" data-bg="232,223,200">
  <div className="inner">
    <div className="sh reveal">
      <span className="eyebrow" style={{color: 'var(--teak)'}}>Our Community</span>
      <h2 className="display" style={{color: 'var(--black)'}}>Every Walk Of Life.<br />One Sacred Thread.</h2>
      <p>Seekers, professionals, athletes, artists — Rudraksha has no boundaries.</p>
    </div>
    <div className="client-pills reveal">
      <div className="cp"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 6c-3 0-5 2.5-5 5.5s1 4.5 3 4.5h4c2 0 3-1.5 3-4.5S15 9 12 9zm-1 9v2h2v-2h-2z"/></svg></span>Spiritual Seekers</div>
      <div className="cp"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10-2h4v2h-4V4zm10 14H4V8h16v10z"/></svg></span>Professionals</div>
      <div className="cp"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M5 16h14a1 1 0 0 0 1-1l-2-6-4 4-2-6-2 6-4-4-2 6a1 1 0 0 0 1 1zm-1 2h16v2H4v-2z"/></svg></span>Leaders</div>
      <div className="cp"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M13.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-1.1 3.2L9.6 13l2.8.9v5.6h2v-4.5l-2-.7 1.8-3.1 3.5 1.5.8-1.8-4.5-2.2z"/></svg></span>Athletes</div>
      <div className="cp"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2a10 10 0 0 0 0 20c1.2 0 2.2-1 2.2-2.2 0-.5-.2-1-.5-1.4l-.2-.3c-.3-.3-.4-.5-.4-.8 0-.6.4-1 1-1h1.9c3 0 5-2.4 5-5.3C21 6.5 17 2 12 2zm-5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg></span>Artists</div>
      <div className="cp"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 2s-4 4-4 8v5l4 3 4-3v-5c0-4-4-4-4-4zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg></span>Entrepreneurs</div>
      <div className="cp"><span><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5.5 8.5v3.5h-11v-3.5H5v-4h14v4h-1.5z"/></svg></span>Families</div>
    </div>
    <div style={{textAlign: 'center'}} className="reveal">
      <a href="#" className="btn-teak">View All Client Stories →</a>
    </div>
  </div>
</section>




{/* ══════════════════════════════════════════
     S24 · FINAL CTA
══════════════════════════════════════════ */}
<section className="dark" id="s24" data-bg="8,6,3">
  <div className="inner">
    <div className="final-wrap reveal">
      <h2 className="display">Begin Your Journey<br /><em>With Confidence.</em></h2>
      <p>Let us help you discover the Rudraksha aligned to your intention, path and purpose.</p>
      <div className="final-btns">
        <a href="https://wa.me/919867291461" className="btn-wa" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Consult On WhatsApp</a>
        <a href="tel:+919193990043210" className="btn-gold"><svg className="svg-icon" viewBox="0 0 24 24" style={{width:'1.1em',height:'1.1em',display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}><path fill="currentColor" d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg> Call +91 93199 43210</a>
        <a href="mailto:info@rudralife.com" className="btn-outline"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" style={{display:'inline-block',verticalAlign:'middle'}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Write To Us</a>
      </div>
    </div>
  </div>
</section>


{/* ══ FOOTER ══ */}


      <Footer />

      {/* 📱 Bottom Navigation Bar (Fixed on Mobile/Tablet viewports) */}
      <nav className="bottom-nav">
        {/* Home Tab */}
        <button 
          className={`bn ih-icon ${bottomNavTab === 'home' ? 'active' : ''}`}
          onClick={() => document.getElementById('s1')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Home"
        >
          <span className="bni">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
              <g className="bookmark-body" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </g>
            </svg>
          </span>
          <span className="bnl">Home</span>
        </button>

        {/* Guidance Tab */}
        <button 
          className={`bn ih-icon ${bottomNavTab === 'guidance' ? 'active' : ''}`}
          onClick={() => document.getElementById('s4')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Guidance"
        >
          <span className="bni">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
              <g className="bulb-body" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                <line x1="9" y1="18" x2="15" y2="18" />
                <line x1="10" y1="22" x2="14" y2="22" />
              </g>
            </svg>
          </span>
          <span className="bnl">Guidance</span>
        </button>

        {/* Collections Tab */}
        <button 
          className={`bn ih-icon ${bottomNavTab === 'collections' ? 'active' : ''}`}
          onClick={() => document.getElementById('s-siddha-mala')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Collections"
        >
          <span className="bni">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
              <g className="cart-icon" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </g>
            </svg>
          </span>
          <span className="bnl">Collections</span>
        </button>

        {/* Rare Tab */}
        <button 
          className={`bn ih-icon ${bottomNavTab === 'rare' ? 'active' : ''}`}
          onClick={() => document.getElementById('s12')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Rare"
        >
          <span className="bni">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
              <g className="trophy-group" style={{ transformOrigin: 'center bottom', transformBox: 'fill-box' }}>
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
              </g>
            </svg>
          </span>
          <span className="bnl">Rare</span>
        </button>

        {/* Account Tab */}
        <button 
          className={`bn ih-icon ${bottomNavTab === 'account' ? 'active' : ''}`}
          onClick={() => document.getElementById('s22')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Account"
        >
          <span className="bni">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
              <g className="github-icon" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </g>
            </svg>
          </span>
          <span className="bnl">Account</span>
        </button>
      </nav>
    </>
  );
}
