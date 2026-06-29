import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const benefitItems = [
  {
    id: 0,
    title: "10% Welcome Discount",
    details: "Apply code WELCOME10 at checkout for an instant 10% off your entire first order.",
    svg: (
      <svg viewBox="0 0 100 100" className="welcome-benefit-svg">
        <rect x="10" y="25" width="80" height="50" rx="6" fill="rgba(196,154,60,0.08)" stroke="var(--gold)" strokeWidth="1.5" />
        <line x1="72" y1="25" x2="72" y2="75" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="72" cy="50" r="4" fill="var(--gold)" />
        <text x="40" y="56" fill="var(--gold-lt)" fontSize="14" fontFamily="Cormorant Garamond" fontWeight="bold" textAnchor="middle">WELCOME10</text>
        <text x="72" y="38" fill="var(--gold)" fontSize="8" fontFamily="Inter" textAnchor="middle">10%</text>
        <text x="72" y="66" fill="var(--gold)" fontSize="6" fontFamily="Inter" textAnchor="middle">OFF</text>
        {/* Confetti */}
        <circle cx="20" cy="35" r="1.5" fill="var(--gold-lt)" />
        <circle cx="85" cy="65" r="1.5" fill="var(--gold-lt)" />
        <circle cx="15" cy="60" r="1" fill="var(--gold)" />
      </svg>
    )
  },
  {
    id: 1,
    title: "Complimentary Puja Ceremony",
    details: "A personalized Vedic blessing ritual performed in your name by our resident priests at a Shiva temple. Video recording shared with you.",
    svg: (
      <svg viewBox="0 0 100 100" className="welcome-benefit-svg">
        <circle cx="50" cy="50" r="36" stroke="var(--gold)" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
        {/* Fire Altar / Havan Kund */}
        <polygon points="50,25 75,70 25,70" fill="rgba(196,154,60,0.12)" stroke="var(--gold)" strokeWidth="1.5" />
        <polygon points="50,35 68,66 32,66" fill="rgba(196,154,60,0.15)" stroke="var(--gold)" strokeWidth="1" />
        {/* Flames */}
        <motion.path 
          d="M50 48 Q46 36, 50 22 Q54 36, 50 48" 
          fill="var(--gold)" 
          animate={{ scaleY: [1, 1.2, 1], y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: "50px 48px" }}
        />
        <motion.path 
          d="M48 48 Q44 38, 48 26 Q52 38, 48 48" 
          fill="var(--gold-lt)" 
          animate={{ scaleY: [1, 1.3, 1], y: [0, -1, 0] }}
          transition={{ duration: 1.2, delay: 0.2, repeat: Infinity }}
          style={{ transformOrigin: "48px 48px" }}
        />
        {/* Ghee offering spoon */}
        <line x1="28" y1="36" x2="45" y2="48" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="36" r="3" fill="rgba(196,154,60,0.4)" stroke="var(--gold)" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Free Lakshmi Bracelet",
    details: "Receive a sacred 7 Mukhi Nepal Rudraksha bracelet representing Goddess Lakshmi on orders above ₹15,001 to invite wealth & good fortune.",
    svg: (
      <svg viewBox="0 0 100 100" className="welcome-benefit-svg">
        {/* Thread Loop */}
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="rgba(196,154,60,0.3)" strokeWidth="1.2" />
        {/* Beads on loop */}
        {[...Array(9)].map((_, i) => {
          const angle = (i * Math.PI) / 8 - Math.PI/2;
          const rx = 38;
          const ry = 14;
          const cx = 50 + rx * Math.cos(angle);
          const cy = 50 + ry * Math.sin(angle);
          const isCenter = i === 4;
          return (
            <motion.g key={i} whileHover={{ scale: 1.25 }}>
              <circle 
                cx={cx} 
                cy={cy} 
                r={isCenter ? "6.5" : "4"} 
                fill={isCenter ? "var(--gold)" : "rgba(196,154,60,0.2)"} 
                stroke="var(--gold)" 
                strokeWidth={isCenter ? "1.5" : "0.8"} 
              />
              {/* Lines inside main center bead representing Mukhi facets */}
              {isCenter && (
                <>
                  <path d={`M${cx} ${cy-6.5} Q${cx-3} ${cy}, ${cx} ${cy+6.5}`} stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" />
                  <path d={`M${cx} ${cy-6.5} Q${cx+3} ${cy}, ${cx} ${cy+6.5}`} stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" />
                </>
              )}
            </motion.g>
          );
        })}
        {/* Red holy tassel */}
        <path d="M50 64 L50 78 M47 70 L53 70" stroke="#C83C3C" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="64" r="3.5" fill="#C83C3C" stroke="none" />
      </svg>
    )
  },
  {
    id: 3,
    title: "1-on-1 Expert Advisor",
    details: "Get direct phone, email or WhatsApp access to a senior Vedic advisor who guides you step-by-step from choosing to wearing and maintaining your bead.",
    svg: (
      <svg viewBox="0 0 100 100" className="welcome-benefit-svg">
        <circle cx="50" cy="50" r="42" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
        {/* Advisor Avatar */}
        <circle cx="50" cy="40" r="14" fill="rgba(196,154,60,0.08)" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M28 72 C28 60, 36 56, 50 56 C64 56, 72 60, 72 72" fill="rgba(196,154,60,0.08)" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tilak on forehead */}
        <line x1="50" y1="31" x2="50" y2="36" stroke="#C83C3C" strokeWidth="1.5" />
        <circle cx="50" cy="38" r="1" fill="var(--gold)" />
        {/* Speech / Chat Bubbles */}
        <motion.path 
          d="M74 30 H86 V40 L81 37 L74 37 Z" 
          fill="rgba(196,154,60,0.15)" 
          stroke="var(--gold)" 
          strokeWidth="0.8"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path 
          d="M26 34 H14 V44 L19 41 L26 41 Z" 
          fill="rgba(196,154,60,0.15)" 
          stroke="var(--gold)" 
          strokeWidth="0.8"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </svg>
    )
  },
  {
    id: 4,
    title: "Care Guide Included",
    details: "Every shipment includes a hardcopy maintenance manual covering oils, purification, thread replacements, and wearing rules.",
    svg: (
      <svg viewBox="0 0 100 100" className="welcome-benefit-svg">
        <rect x="26" y="20" width="48" height="60" rx="4" fill="rgba(196,154,60,0.08)" stroke="var(--gold)" strokeWidth="1.5" />
        {/* Book spine details */}
        <line x1="33" y1="20" x2="33" y2="80" stroke="var(--gold)" strokeWidth="1.2" />
        {/* Sacred geometry cover decoration */}
        <polygon points="50,34 58,46 42,46" stroke="var(--gold)" strokeWidth="0.8" opacity="0.6" fill="rgba(196,154,60,0.1)" />
        <polygon points="50,52 58,40 42,40" stroke="var(--gold)" strokeWidth="0.8" opacity="0.6" fill="rgba(196,154,60,0.1)" />
        <circle cx="50" cy="43" r="2.5" fill="var(--gold-lt)" />
        {/* Horizontal text line placeholders */}
        <line x1="38" y1="62" x2="62" y2="62" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
        <line x1="38" y1="68" x2="56" y2="68" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
      </svg>
    )
  }
];

export default function WelcomeIllustration() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBenefit = benefitItems[activeIndex];

  return (
    <div className="welcome-wrapper">
      <div className="welcome-layout">
        {/* Left Side: Dynamic Vector Illustration Card */}
        <div className="welcome-visual-panel">
          <div className="panel-gold-glow" />
          <div className="panel-svg-holder">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.92, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: -90 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ perspective: 1000 }}
              >
                {activeBenefit.svg}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="panel-details">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="benefit-description"
              >
                {activeBenefit.details}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Interactive benefits list */}
        <div className="welcome-list-panel">
          <ul className="welcome-items-list">
            {benefitItems.map((item, idx) => (
              <li
                key={item.id}
                className={`welcome-item-row ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="item-radio">
                  <span className="radio-dot" />
                </div>
                <div className="item-text">
                  <h5>{item.title}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
