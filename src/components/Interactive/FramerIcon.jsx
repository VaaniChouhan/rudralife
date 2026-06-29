import React from 'react';
import { motion } from 'framer-motion';

// 1. Seeking Peace: Lotus Mandala (Breathing & Rotating)
export const PeaceIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="var(--gold)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ 
      rotate: 360,
      scale: [1, 1.08, 1]
    }}
    transition={{ 
      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }}
    whileHover={{ scale: 1.15 }}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    {/* Center circle */}
    <circle cx="12" cy="12" r="2.5" fill="var(--gold)" opacity="0.3" stroke="none" />
    
    {/* Outer petals (8 symmetrical loops) */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 360) / 8;
      return (
        <path
          key={i}
          d="M12 12 C12 8, 14 6, 12 4 C10 6, 12 8, 12 12"
          transform={`rotate(${angle} 12 12)`}
        />
      );
    })}
  </motion.svg>
);

// 2. Protection & Safety: Symmetrical Shield (Pulsing Shield)
export const ShieldIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="var(--gold)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    whileHover={{ 
      scale: 1.18,
      y: -2,
      rotate: [0, -5, 5, 0]
    }}
    transition={{ duration: 0.4 }}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    {/* Outer Shield Path */}
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    
    {/* Inner detail path */}
    <motion.path 
      d="M12 18s5-2.5 5-6.5V7l-5-2-5 2v4.5c0 4 5 6.5 5 6.5z" 
      opacity="0.6"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Center dot */}
    <circle cx="12" cy="11" r="1.5" fill="var(--gold)" stroke="none" />
  </motion.svg>
);

// 3. Spiritual Growth: Rising Spiral / Flame (Path reveal)
export const GrowthIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="var(--gold)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    whileHover={{ scale: 1.15, y: -2 }}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    {/* Growing Sprout / Kundalini Spiral */}
    <motion.path
      d="M12 22c0-5.5-2-10 2-14c1.5-1.5 3-1.5 3 0c0 3-4.5 4-4.5 8c0 2 1.5 3.5 3.5 3.5c3 0 4.5-3.5 3.5-7.5"
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: [0.9, 1, 0.9] }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
    
    <motion.path
      d="M12 22c0-5.5 2-10-2-14c-1.5-1.5-3-1.5-3 0c0 3 4.5 4 4.5 8"
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: [0.9, 1, 0.9] }}
      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
      opacity="0.7"
    />
  </motion.svg>
);

// 4. Guidance & Clarity: Compass / Radiating Sun
export const GuidanceIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="var(--gold)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    whileHover={{ scale: 1.15, rotate: 45 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" fill="var(--gold)" opacity="0.2" stroke="none" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
  </motion.svg>
);

// 5. Private Access: Collector's Crown (Levitating)
export const RareIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="var(--gold)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ y: [0, -3, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ scale: 1.18, y: -5 }}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    {/* Crown shape */}
    <path d="M2 4l3 12h14l3-12l-6 7l-4-7l-4 7l-6-7z" fill="var(--gold)" opacity="0.15" />
    <path d="M3 20h18" />
    
    {/* Jewels details */}
    <circle cx="2" cy="3.5" r="1.2" fill="var(--gold)" stroke="none" />
    <circle cx="12" cy="3.5" r="1.2" fill="var(--gold)" stroke="none" />
    <circle cx="22" cy="3.5" r="1.2" fill="var(--gold)" stroke="none" />
  </motion.svg>
);

// 6. Gift Icon (First Time Buying)
export const GiftIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="var(--gold)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    whileHover={{ scale: 1.18, rotate: [0, -8, 8, 0] }}
    transition={{ duration: 0.5 }}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <rect x="3" y="8" width="18" height="14" rx="2" />
    <path d="M12 8v14" />
    <path d="M3 12h18" />
    {/* Ribbon Bow */}
    <path d="M12 8c-2-2.5-5-2.5-5 0s3 2.5 5 0c2 2.5 5 2.5 5 0s-3-2.5-5 0z" fill="var(--gold)" opacity="0.2" stroke="none" />
  </motion.svg>
);
