import React from 'react';
import { motion } from 'framer-motion';

// 1. Mantra Energization: Soundwave / Cosmic Chant vibration
export const MantraIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Concentric soundwaves */}
    {[...Array(4)].map((_, i) => (
      <motion.circle
        key={i}
        cx="32"
        cy="32"
        r={8 + i * 7}
        strokeWidth="1"
        opacity={0.5 - i * 0.1}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5 - i * 0.1, 0.9 - i * 0.1, 0.5 - i * 0.1] }}
        transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
    {/* Center Ohm (ॐ) symbol */}
    <text x="32" y="36.5" textAnchor="middle" fontSize="14" fontFamily="serif" fill="var(--gold-lt)" fontWeight="bold" stroke="none">ॐ</text>
  </svg>
);

// 2. Ritual Puja: Kalash (Vase containing Ganga water & mango leaves)
export const PujaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Mango leaves */}
    <path d="M22 28 C26 18, 32 12, 32 12 C32 12, 38 18, 42 28" fill="rgba(196,154,60,0.12)" strokeWidth="1" />
    <path d="M28 28 C30 20, 32 16, 32 16 C32 16, 34 20, 36 28" fill="rgba(196,154,60,0.15)" strokeWidth="1" />
    
    {/* Sacred Coconut */}
    <motion.circle 
      cx="32" 
      cy="20" 
      r="4.5" 
      fill="rgba(196,154,60,0.25)" 
      strokeWidth="1.2"
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    {/* Kalash Pot Body */}
    <path d="M24 28 H40 M22 30 H42 M20 32 C20 44, 44 44, 44 32 C44 30, 20 30, 20 32" strokeWidth="1.8" />
    
    {/* Swastik / holy symbol on pot */}
    <line x1="32" y1="33" x2="32" y2="41" strokeWidth="1" strokeLinecap="round" />
    <line x1="28" y1="37" x2="36" y2="37" strokeWidth="1" strokeLinecap="round" />
    <path d="M32 33 H36 M32 41 H28 M28 37 V33 M36 37 V41" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

// 3. Purification Process: Water droplets falling and producing ripple waves
export const PurificationIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Bottom ripple waves */}
    <ellipse cx="32" cy="50" rx="20" ry="6" opacity="0.3" strokeDasharray="3 2" />
    <motion.ellipse 
      cx="32" cy="50" rx="16" ry="4.5"
      animate={{ rx: [8, 18, 8], ry: [2, 5, 2], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2.2, repeat: Infinity }}
    />
    
    {/* Sandalwood paste bowl / Base */}
    <path d="M12 50 C22 48, 42 48, 52 50" strokeWidth="1" opacity="0.4" />
    
    {/* Falling gangajal droplet */}
    <motion.path 
      d="M32 10 C32 10 24 24 24 29 A 8 8 0 0 0 40 29 C40 24 32 10 32 10 Z" 
      fill="rgba(196,154,60,0.12)" 
      strokeWidth="1.8"
      animate={{ y: [0, 16, 0], scaleY: [1, 1.25, 0.9, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    {/* Secondary small droplet */}
    <motion.circle 
      cx="32" 
      cy="8" 
      r="2" 
      fill="var(--gold)" 
      stroke="none"
      animate={{ y: [0, 8, 0], scale: [1, 0.7, 1] }}
      transition={{ duration: 2.2, delay: 0.3, repeat: Infinity }}
    />
  </svg>
);

// 4. Sacred Handling: Consecrated Hands lifting/presenting a glowing bead
export const HandlingIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Glowing energy field */}
    <motion.circle 
      cx="32" 
      cy="20" 
      r="10" 
      fill="none" 
      stroke="rgba(196,154,60,0.18)" 
      strokeWidth="1" 
      strokeDasharray="2 3"
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
    
    {/* Consecrated Bead (floating above hands) */}
    <motion.circle 
      cx="32" 
      cy="20" 
      r="5" 
      fill="var(--gold)" 
      stroke="var(--white)" 
      strokeWidth="1"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    {/* Lotus hands silhouette cradle */}
    <path 
      d="M14 44 C20 40, 28 36, 32 40 C36 36, 44 40, 50 44 L40 54 H24 L14 44 Z" 
      fill="rgba(196,154,60,0.08)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M20 46 L32 38 L44 46" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
  </svg>
);
