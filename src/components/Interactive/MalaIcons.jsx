import React from 'react';
import { motion } from 'framer-motion';

// 1. Gold Malas: Gold Capped Bead with Links
export const GoldMalaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="#C49A3C" strokeWidth="1.5">
    {/* Connecting gold links */}
    <line x1="32" y1="4" x2="32" y2="16" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="48" x2="32" y2="60" strokeWidth="2" strokeLinecap="round" />
    
    {/* Gold caps */}
    <path d="M20 18 C24 10, 40 10, 44 18 L32 24 Z" fill="rgba(196,154,60,0.25)" strokeWidth="1.5" />
    <path d="M20 46 C24 54, 40 54, 44 46 L32 40 Z" fill="rgba(196,154,60,0.25)" strokeWidth="1.5" />
    
    {/* Central Rudraksha bead */}
    <circle cx="32" cy="32" r="10" fill="rgba(124,92,46,0.3)" stroke="#7C5C2E" strokeWidth="1" />
    <path d="M32 22 V42 M26 25 Q32 32, 26 39 M38 25 Q32 32, 38 39" stroke="#7C5C2E" strokeWidth="1" opacity="0.6" />
    
    {/* Floating shine */}
    <motion.circle 
      cx="28" 
      cy="28" 
      r="1.5" 
      fill="#fff" 
      stroke="none"
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2.2, repeat: Infinity }}
    />
  </svg>
);

// 2. Silver Malas: Silver Flower Capped Bead with Links
export const SilverMalaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="#A0A0A0" strokeWidth="1.5">
    {/* Connecting links */}
    <line x1="32" y1="4" x2="32" y2="16" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="32" y1="48" x2="32" y2="60" strokeWidth="1.8" strokeLinecap="round" />
    
    {/* Silver flower-style petal caps */}
    <g>
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6;
        return (
          <path
            key={`top-${i}`}
            d="M32 16 Q32 22, 32 18"
            transform={`rotate(${angle} 32 16)`}
            strokeWidth="1.2"
          />
        );
      })}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6;
        return (
          <path
            key={`bot-${i}`}
            d="M32 48 Q32 42, 32 46"
            transform={`rotate(${angle} 32 48)`}
            strokeWidth="1.2"
          />
        );
      })}
    </g>
    
    {/* Rudraksha bead */}
    <circle cx="32" cy="32" r="9.5" fill="rgba(124,92,46,0.2)" stroke="#7C5C2E" strokeWidth="0.8" />
    <path d="M32 22.5 V41.5 M27 26 C32 32, 27 38 M37 26 C32 32, 37 38" stroke="#7C5C2E" strokeWidth="0.8" opacity="0.6" />
  </svg>
);

// 3. Thread Malas: Traditional double-knotted thread sequence
export const ThreadMalaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="#C83C3C" strokeWidth="1.5">
    {/* Saffron/red thread running through */}
    <line x1="32" y1="4" x2="32" y2="60" strokeWidth="1.2" />
    
    {/* Three beads with individual knots in between */}
    {/* Bead 1 */}
    <circle cx="32" cy="18" r="6" fill="rgba(124,92,46,0.3)" stroke="#7C5C2E" strokeWidth="0.8" />
    {/* Knot 1 */}
    <circle cx="32" cy="25" r="2.2" fill="#C83C3C" stroke="none" />
    <circle cx="32" cy="25" r="1.2" fill="#E8A050" stroke="none" />
    
    {/* Bead 2 */}
    <circle cx="32" cy="34" r="6" fill="rgba(124,92,46,0.3)" stroke="#7C5C2E" strokeWidth="0.8" />
    {/* Knot 2 */}
    <circle cx="32" cy="41" r="2.2" fill="#C83C3C" stroke="none" />
    <circle cx="32" cy="41" r="1.2" fill="#E8A050" stroke="none" />
    
    {/* Bead 3 */}
    <circle cx="32" cy="50" r="6" fill="rgba(124,92,46,0.3)" stroke="#7C5C2E" strokeWidth="0.8" />
  </svg>
);

// 4. Bead Malas: Pure Rudraksha bead sequence without spacers
export const PureBeadMalaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="#7C5C2E" strokeWidth="1.2">
    {/* Thread */}
    <line x1="32" y1="4" x2="32" y2="60" stroke="#7C5C2E" strokeWidth="0.8" strokeDasharray="2 2" />
    
    {/* 4 beads packed tightly */}
    {[...Array(4)].map((_, i) => (
      <circle 
        key={i}
        cx="32" 
        cy={14 + i * 12} 
        r="5.5" 
        fill="rgba(124,92,46,0.35)" 
        stroke="#7C5C2E" 
        strokeWidth="1" 
      />
    ))}
  </svg>
);

// 5. Full Malas: 108+1 representation with Guru Bead and Tassel
export const FullMalaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Bead loop */}
    <ellipse cx="32" cy="24" rx="22" ry="12" stroke="rgba(196,154,60,0.3)" strokeWidth="1.2" />
    
    {/* Guru Bead (Sumeru) at bottom of loop */}
    <circle cx="32" cy="36" r="5" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="1.5" />
    
    {/* Knots and connection loop */}
    <line x1="32" y1="36" x2="32" y2="44" stroke="#C83C3C" strokeWidth="1.5" />
    
    {/* Silk Tassel */}
    <motion.path 
      d="M32 44 L32 58 M28 48 C30 52, 34 52, 36 48 M29 58 H35" 
      stroke="#C83C3C" 
      strokeWidth="2" 
      strokeLinecap="round"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: "32px 44px" }}
    />
    <circle cx="32" cy="44" r="2.5" fill="#C83C3C" stroke="none" />
  </svg>
);

// 6. Custom Malas: Intricate alignment with mixed beads
export const CustomMalaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    {/* Custom geometrical thread alignment */}
    <path d="M14 20 L32 38 L50 20 M32 38 L32 58" stroke="rgba(196,154,60,0.3)" strokeWidth="1.2" />
    
    {/* Small beads */}
    <circle cx="18" cy="24" r="3.5" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="0.8" />
    <circle cx="46" cy="24" r="3.5" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="0.8" />
    
    {/* Large center focus bead */}
    <motion.circle 
      cx="32" 
      cy="38" 
      r="6.5" 
      fill="rgba(196,154,60,0.25)" 
      stroke="var(--gold)" 
      strokeWidth="1.5"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <circle cx="32" cy="38" r="2.5" fill="var(--gold-lt)" stroke="none" />
    
    {/* Gold links */}
    <circle cx="32" cy="48" r="2" fill="var(--gold)" stroke="none" />
  </svg>
);
