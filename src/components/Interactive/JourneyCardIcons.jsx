import React from 'react';
import { motion } from 'framer-motion';

// 1. Seeking Peace: Unfolding 3-Layer Lotus Mandala
export const PeaceIcon = () => (
  <div style={{ position: 'relative', width: '56px', height: '56px', margin: '0 auto 12px' }}>
    {/* Concentric glowing rings */}
    <motion.div
      style={{
        position: 'absolute',
        inset: '2px',
        borderRadius: '50%',
        border: '1px dashed rgba(196,154,60,0.18)',
      }}
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    />
    
    <motion.svg
      viewBox="0 0 64 64"
      width="56"
      height="56"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12 }}
    >
      {/* Outer Lotus petals */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '32px 32px' }}
      >
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <path
              key={`outer-${i}`}
              d="M32 32 C32 20, 36 12, 32 4 C28 12, 32 20, 32 32"
              transform={`rotate(${angle} 32 32)`}
              opacity="0.45"
            />
          );
        })}
      </motion.g>

      {/* Mid Lotus petals */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '32px 32px' }}
      >
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8 + 15;
          return (
            <path
              key={`mid-${i}`}
              d="M32 32 C32 22, 35 16, 32 8 C29 16, 32 22, 32 32"
              transform={`rotate(${angle} 32 32)`}
              opacity="0.75"
              strokeWidth="1.8"
            />
          );
        })}
      </motion.g>

      {/* Inner sacred circles & Bindu */}
      <circle cx="32" cy="32" r="6" fill="var(--gold)" opacity="0.25" stroke="none" />
      <circle cx="32" cy="32" r="2.5" fill="var(--gold-lt)" stroke="none" />
    </motion.svg>
  </div>
);

// 2. Protection: Cosmic Kavach / Shield with Radiating Glow
export const ShieldIcon = () => (
  <div style={{ position: 'relative', width: '56px', height: '56px', margin: '0 auto 12px' }}>
    {/* Pulsing glow ring */}
    <motion.div
      style={{
        position: 'absolute',
        inset: '-4px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,154,60,0.1) 0%, transparent 70%)',
      }}
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    <motion.svg
      viewBox="0 0 64 64"
      width="56"
      height="56"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      whileHover={{ scale: 1.15, y: -2 }}
    >
      {/* Dynamic forcefield ring */}
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        strokeDasharray="4 6"
        opacity="0.35"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Main Shield Outline */}
      <path d="M32 54 C48 46, 50 32, 50 16 L32 8 L14 16 C14 32, 16 46, 32 54 Z" strokeWidth="1.8" />
      
      {/* Inner protective Yantra lines */}
      <path d="M32 16 L44 32 L32 48 L20 32 Z" opacity="0.4" fill="rgba(196,154,60,0.08)" />
      
      {/* Sacred Trident / Trishul Centerpiece */}
      <path d="M32 44 L32 20 M26 24 C28 28, 36 28, 38 24 M32 16 L32 20" strokeWidth="1.8" strokeLinecap="round" />
    </motion.svg>
  </div>
);

// 3. Spiritual Growth: Rising Tree / Kundalini Spiral
export const GrowthIcon = () => (
  <div style={{ position: 'relative', width: '56px', height: '56px', margin: '0 auto 12px' }}>
    <motion.svg
      viewBox="0 0 64 64"
      width="56"
      height="56"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      whileHover={{ scale: 1.12 }}
    >
      {/* Concentric aura arcs */}
      {[...Array(3)].map((_, i) => (
        <motion.path
          key={i}
          d={`M16 ${18 + i*6} A 16 16 0 0 1 48 ${18 + i*6}`}
          opacity={0.25 - i * 0.07}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      
      {/* Ground Roots / Base */}
      <path d="M14 54 C24 51, 40 51, 50 54" strokeWidth="1" strokeLinecap="round" />
      
      {/* Dual Intertwined Rising Spirals (Ida & Pingala) */}
      <motion.path
        d="M32 54 Q24 40, 32 30 T32 8"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0.9 }}
        whileHover={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="M32 54 Q40 40, 32 30 T32 8"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.68"
        initial={{ pathLength: 0.9 }}
        whileHover={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      
      {/* Blooming energy buds */}
      <circle cx="32" cy="8" r="2.5" fill="var(--gold)" stroke="none" />
      <circle cx="21" cy="24" r="1.5" fill="var(--gold)" stroke="none" />
      <circle cx="43" cy="24" r="1.5" fill="var(--gold)" stroke="none" />
    </motion.svg>
  </div>
);

// 4. Guidance & Clarity: Celestial Astrolabe / Focal Compass
export const GuidanceIcon = () => (
  <div style={{ position: 'relative', width: '56px', height: '56px', margin: '0 auto 12px' }}>
    <motion.svg
      viewBox="0 0 64 64"
      width="56"
      height="56"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      whileHover={{ scale: 1.15, rotate: 90 }}
      transition={{ type: 'spring', stiffness: 140, damping: 12 }}
    >
      {/* Outer compass ring */}
      <circle cx="32" cy="32" r="28" strokeWidth="1.8" />
      <circle cx="32" cy="32" r="24" strokeDasharray="2 3" opacity="0.4" />
      
      {/* Compass Directions */}
      <line x1="32" y1="4" x2="32" y2="8" strokeWidth="1.8" />
      <line x1="32" y1="56" x2="32" y2="60" strokeWidth="1.8" />
      <line x1="4" y1="32" x2="8" y2="32" strokeWidth="1.8" />
      <line x1="56" y1="32" x2="60" y2="32" strokeWidth="1.8" />
      
      {/* Concentric 8-point radiating sun */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '32px 32px' }}
      >
        <polygon points="32,12 36,26 50,32 36,38 32,52 28,38 14,32 28,26" fill="rgba(196,154,60,0.12)" />
        <polygon points="32,17 34,28 45,32 34,36 32,47 30,36 19,32 30,28" fill="rgba(196,154,60,0.15)" strokeWidth="1" />
      </motion.g>
      
      {/* Center Core */}
      <circle cx="32" cy="32" r="2" fill="var(--white)" stroke="none" />
    </motion.svg>
  </div>
);

// 5. Private Access: Collector's Sacred Crown & Aura Orbits
export const RareIcon = () => (
  <div style={{ position: 'relative', width: '56px', height: '56px', margin: '0 auto 12px' }}>
    {/* Floating vertical translation */}
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      <motion.svg
        viewBox="0 0 64 64"
        width="56"
        height="56"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.5"
        whileHover={{ scale: 1.15 }}
      >
        {/* Sacred geometric orbital ellipse */}
        <motion.ellipse
          cx="32"
          cy="32"
          rx="28"
          ry="8"
          transform="rotate(-15 32 32)"
          opacity="0.35"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '32px 32px' }}
        />
        <motion.ellipse
          cx="32"
          cy="32"
          rx="28"
          ry="8"
          transform="rotate(15 32 32)"
          opacity="0.25"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '32px 32px' }}
        />
        
        {/* Detailed Crown / Tiara Path */}
        <path d="M8 46 L14 20 L24 34 L32 14 L40 34 L50 20 L56 46 Z" fill="rgba(196,154,60,0.12)" strokeWidth="1.8" />
        <line x1="6" y1="48" x2="58" y2="48" strokeWidth="1.8" />
        
        {/* Crown Spherical Jewels */}
        <circle cx="14" cy="18" r="2.2" fill="var(--gold)" stroke="none" />
        <circle cx="32" cy="12" r="2.2" fill="var(--gold)" stroke="none" />
        <circle cx="50" cy="18" r="2.2" fill="var(--gold)" stroke="none" />
        <circle cx="32" cy="32" r="3" fill="var(--gold-lt)" stroke="none" />
      </motion.svg>
    </motion.div>
  </div>
);
