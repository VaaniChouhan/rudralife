import React from 'react';
import { motion } from 'framer-motion';

// 1. Lab Scientists: Microscope/Scanner with Pulsing Nodes
export const ScientistIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Base structure */}
    <path d="M12 54 H52 M18 54 V46 C18 42, 24 38, 28 38 H36 C40 38, 46 42, 46 46 V54" strokeWidth="1" opacity="0.4" />
    {/* Microscope Lens System */}
    <path d="M32 12 V30 M26 20 H38 M29 30 H35" strokeWidth="1.8" strokeLinecap="round" />
    {/* Specimen dish */}
    <ellipse cx="32" cy="38" rx="8" ry="2.5" fill="rgba(196,154,60,0.12)" />
    {/* Scanning ray */}
    <motion.path 
      d="M24 36 L32 30 L40 36" 
      stroke="var(--gold-lt)" 
      strokeWidth="1"
      animate={{ opacity: [0.2, 0.8, 0.2], y: [-1, 2, -1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="32" cy="38" r="1.5" fill="var(--gold-lt)" stroke="none" />
  </svg>
);

// 2. Vedic Brahmins: Sacred Fire Altar (Yajna) with Ohm Symbol
export const BrahminIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Fire Altar / Kund */}
    <polygon points="32,24 50,50 14,50" fill="rgba(196,154,60,0.1)" strokeWidth="1.8" />
    <line x1="22" y1="50" x2="42" y2="50" strokeWidth="2.5" strokeLinecap="round" />
    {/* Swirling energy */}
    <motion.circle 
      cx="32" 
      cy="36" 
      r="16" 
      strokeDasharray="2 3" 
      opacity="0.3" 
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
    {/* Glowing Holy Flame */}
    <motion.path 
      d="M32 32 Q28 20, 32 8 Q36 20, 32 32" 
      fill="var(--gold)" 
      stroke="none"
      animate={{ scaleY: [1, 1.15, 1], y: [0, -1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ transformOrigin: "32px 32px" }}
    />
    {/* Central Ohm (ॐ) inside flame overlay */}
    <text x="32" y="47" textAnchor="middle" fontSize="11" fontFamily="serif" fill="var(--gold-lt)" fontWeight="bold" stroke="none">ॐ</text>
  </svg>
);

// 3. Spiritual Advisors: Radiating Celestial Guide Compass
export const AdvisorIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Compass outer circle */}
    <circle cx="32" cy="32" r="24" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
    <circle cx="32" cy="32" r="28" strokeWidth="0.8" opacity="0.2" />
    {/* Radiating sun pointer */}
    <motion.g
      animate={{ rotate: -360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '32px 32px' }}
    >
      <polygon points="32,8 35,22 49,25 35,28 32,42 29,28 15,25 29,22" fill="rgba(196,154,60,0.12)" />
      <circle cx="32" cy="25" r="2" fill="var(--gold-lt)" stroke="none" />
    </motion.g>
    {/* Advisor head outline */}
    <circle cx="32" cy="25" r="5.5" fill="rgba(196,154,60,0.08)" />
    <path d="M22 46 C22 38, 26 36, 32 36 C38 36, 42 38, 42 46" fill="rgba(196,154,60,0.08)" strokeLinecap="round" />
  </svg>
);

// 4. Mala Artisans: Bead Threading Loop with Golden Knotting
export const ArtisanIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Curved thread loop */}
    <path d="M12 32 C12 18, 52 18, 52 32 C52 46, 12 46, 12 32" strokeWidth="1.2" opacity="0.45" strokeDasharray="3 2" />
    
    {/* Hand threading needle */}
    <motion.path 
      d="M32 14 L42 24 M38 18 L32 14" 
      strokeWidth="1.8" 
      strokeLinecap="round"
      animate={{ x: [-1, 2, -1], y: [-1, 2, -1] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    />
    
    {/* Three detailed Rudraksha beads strung */}
    <g>
      {/* Bead 1 */}
      <circle cx="20" cy="32" r="5" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="1.2" />
      <line x1="20" y1="27" x2="20" y2="37" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
      {/* Bead 2 */}
      <circle cx="32" cy="35" r="6" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="1.2" />
      <line x1="32" y1="29" x2="32" y2="41" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
      {/* Bead 3 */}
      <circle cx="44" cy="32" r="5" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="1.2" />
      <line x1="44" y1="27" x2="44" y2="37" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
    </g>
    
    {/* Knot ties */}
    <circle cx="26" cy="33.5" r="1.5" fill="var(--gold-lt)" stroke="none" />
    <circle cx="38" cy="33.5" r="1.5" fill="var(--gold-lt)" stroke="none" />
  </svg>
);

// 5. Support Team: Secure Shield with Ring Lines & Customer Headset
export const SupportIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Protective shield */}
    <path d="M32 52 C45 45, 47 34, 47 22 L32 14 L17 22 C17 34, 19 45, 32 52 Z" fill="rgba(196,154,60,0.06)" strokeWidth="1.2" />
    {/* Pulsing phone/headset support waves */}
    <motion.path 
      d="M40 28 A 12 12 0 0 1 40 40" 
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.path 
      d="M44 24 A 16 16 0 0 1 44 44" 
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
    />
    {/* Direct telephone receiver representation */}
    <path d="M22 24 C22 28, 25 32, 29 32 M29 32 L34 27 M25 21 L22 24 M37 33 L34 36 M37 33 L40 30" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="23.5" cy="22.5" r="1.8" fill="var(--gold)" stroke="none" />
    <circle cx="38.5" cy="34.5" r="1.8" fill="var(--gold)" stroke="none" />
  </svg>
);
