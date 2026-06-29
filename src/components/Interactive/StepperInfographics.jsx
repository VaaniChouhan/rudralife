import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stepData = [
  {
    level: 1,
    title: "Level 1: Beginner Alignment",
    tagline: "Purification & Daily Stability",
    desc: "Build your foundation. Connect with grounding energies to release stress, establish physical stability, and purify your energetic field. Perfect for daily wear.",
    beads: ["5 Mukhi (Kalagni Rudra)", "6 Mukhi (Kartikeya)", "5 Mukhi Bracelet"],
    chakra: "Muladhara (Root) & Swadhisthana (Sacral)",
    color: "rgba(196, 154, 60, 0.2)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg">
        <circle cx="60" cy="60" r="48" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
        {/* Core bead */}
        <motion.circle 
          cx="60" 
          cy="60" 
          r="10" 
          fill="rgba(196, 154, 60, 0.15)" 
          stroke="var(--gold)" 
          strokeWidth="1.5"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Radiating wave lines */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI) / 3;
          const x2 = 60 + 38 * Math.cos(angle);
          const y2 = 60 + 38 * Math.sin(angle);
          return (
            <motion.line
              key={i}
              x1="60"
              y1="60"
              x2={x2}
              y2={y2}
              stroke="var(--gold)"
              strokeWidth="0.8"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 4, delay: i * 0.4, repeat: Infinity }}
            />
          );
        })}
        {/* Lotus foundation petals */}
        <path d="M48 90 C54 85, 66 85, 72 90 C78 95, 66 98, 60 98 C54 98, 42 95, 48 90 Z" fill="rgba(196,154,60,0.12)" stroke="var(--gold)" strokeWidth="0.8" />
      </svg>
    )
  },
  {
    level: 2,
    title: "Level 2: Active Vitality",
    tagline: "Concentration, Wealth & Aura Balance",
    desc: "Amplify personal power, remove obstacles, and manifest prosperity. Develop greater concentration and emotional resilience to meet professional goals.",
    beads: ["7 Mukhi (Mahalaxmi)", "8 Mukhi (Ganesha)", "Power Combination (5-6-7-8)"],
    chakra: "Manipura (Solar Plexus) & Ajna (Third Eye)",
    color: "rgba(196, 154, 60, 0.35)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg">
        <polygon points="60,18 96,80 24,80" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.3" />
        {/* 3 Bead Cluster */}
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          {/* Top Bead */}
          <circle cx="60" cy="28" r="8" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="1.2" />
          {/* Bottom Left */}
          <circle cx="40" cy="68" r="8" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="1.2" />
          {/* Bottom Right */}
          <circle cx="80" cy="68" r="8" fill="rgba(196,154,60,0.2)" stroke="var(--gold)" strokeWidth="1.2" />
          {/* Connecting energy lines */}
          <line x1="60" y1="28" x2="40" y2="68" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
          <line x1="60" y1="28" x2="80" y2="68" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
          <line x1="40" y1="68" x2="80" y2="68" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
        </motion.g>
        {/* Swirling energy orbits */}
        <motion.ellipse 
          cx="60" cy="54" rx="42" ry="16" 
          stroke="var(--gold)" strokeWidth="0.8" opacity="0.25"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 54px" }}
        />
      </svg>
    )
  },
  {
    level: 3,
    title: "Level 3: Advanced Ascension",
    tagline: "Chakra Awakening & Planetary Shield",
    desc: "Mitigate severe malefic planetary influences, align all major chakras, and transition from material focus to deep spiritual awareness. Ideal for meditators.",
    beads: ["9 Mukhi (Durga)", "10 Mukhi (Vishnu)", "11-14 Mukhi Kantha Malas"],
    chakra: "Anahata (Heart), Vishuddha (Throat), Ajna",
    color: "rgba(196, 154, 60, 0.5)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg">
        {/* Spine vertical axis */}
        <line x1="60" y1="12" x2="60" y2="108" stroke="var(--gold)" strokeWidth="0.8" opacity="0.2" />
        
        {/* Glowing Chakra nodes */}
        {[...Array(5)].map((_, i) => {
          const cy = 20 + i * 20;
          return (
            <g key={i}>
              <motion.circle 
                cx="60" 
                cy={cy} 
                r={i === 2 ? "6" : "3.5"} 
                fill={i === 2 ? "var(--gold)" : "rgba(196,154,60,0.3)"} 
                stroke="var(--gold)" 
                strokeWidth="1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
              <circle cx="60" cy={cy} r={i === 2 ? "12" : "8"} stroke="var(--gold)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
            </g>
          );
        })}
        {/* Concentric aura loops around center heart node */}
        <motion.circle 
          cx="60" cy="60" r="22" 
          stroke="var(--gold)" strokeWidth="0.8" opacity="0.2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>
    )
  },
  {
    level: 4,
    title: "Level 4: Master Integration",
    tagline: "Leadership, Cosmic Protection & Custom Malas",
    desc: "For leaders, healers, and visionaries. Attain ultimate mental strength, remove professional limitations, and envelope yourself in an impenetrable protective field.",
    beads: ["Custom Personal Mala", "14 Mukhi (Dev Mani)", "Rare Nepal Collector Beads"],
    chakra: "Ajna (Third Eye) & Sahasrara (Crown)",
    color: "rgba(196, 154, 60, 0.7)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg">
        {/* Star Hexagram / Yantra Grid */}
        <polygon points="60,12 102,84 18,84" stroke="var(--gold)" strokeWidth="0.6" opacity="0.2" />
        <polygon points="60,108 102,36 18,36" stroke="var(--gold)" strokeWidth="0.6" opacity="0.2" />
        
        {/* Central Master Mandala */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        >
          <circle cx="60" cy="60" r="28" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
          {[...Array(6)].map((_, i) => {
            const angle = (i * 360) / 6;
            return (
              <circle 
                key={i} 
                cx={60 + 20 * Math.cos(angle * Math.PI / 180)} 
                cy={60 + 20 * Math.sin(angle * Math.PI / 180)} 
                r="3.5" 
                fill="rgba(196,154,60,0.3)" 
                stroke="var(--gold)" 
                strokeWidth="0.8" 
              />
            );
          })}
        </motion.g>
        
        {/* Central Master Bead */}
        <circle cx="60" cy="60" r="8" fill="var(--gold)" opacity="0.3" stroke="none" />
        <circle cx="60" cy="60" r="5" fill="var(--gold-lt)" stroke="none" />
      </svg>
    )
  },
  {
    level: 5,
    title: "Level 5: Siddha / Indra Mala",
    tagline: "Cosmic Union & Absolute Abundance",
    desc: "The absolute pinnacle of spiritual and material protection. Contains all Mukhis from 1 to 14, Gauri Shankar, and Ganesh beads, aligning you with the full cosmic order.",
    beads: ["Siddha Mala (1-14 Mukhi + GS + G)", "Indra Mala (Rarest 1-21 Mukhi)"],
    chakra: "All 7 Chakras Harmonized & Sahasrara (Crown)",
    color: "rgba(196, 154, 60, 0.9)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg">
        {/* Cosmic radiating rings */}
        <circle cx="60" cy="60" r="52" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="1 2" opacity="0.3" />
        <circle cx="60" cy="60" r="44" stroke="var(--gold)" strokeWidth="0.8" opacity="0.15" />
        
        {/* Inner Yantra grid */}
        <motion.path 
          d="M60 20 L95 80 L25 80 Z M60 100 L95 40 L25 40 Z" 
          stroke="var(--gold)" 
          strokeWidth="0.8" 
          opacity="0.25"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        />
        
        {/* Golden energy core */}
        <motion.circle 
          cx="60" 
          cy="60" 
          r="14" 
          fill="rgba(196,154,60,0.18)" 
          stroke="var(--gold)" 
          strokeWidth="1.8"
          animate={{ scale: [1, 1.15, 1], rotate: 360 }}
          transition={{ scale: { duration: 3, repeat: Infinity }, rotate: { duration: 15, repeat: Infinity, ease: "linear" } }}
          style={{ transformOrigin: "60px 60px" }}
        />
        <circle cx="60" cy="60" r="6" fill="var(--gold-lt)" stroke="none" />
      </svg>
    )
  }
];

export default function StepperInfographics() {
  const [activeStep, setActiveStep] = useState(0);

  const activeData = stepData[activeStep];

  return (
    <div className="stepper-wrapper" style={{ marginTop: '28px' }}>
      {/* Step dots selector */}
      <div className="stepper-line">
        {stepData.map((step, idx) => (
          <button
            key={idx}
            className={`step-dot ${idx === activeStep ? 'active' : ''} ${idx < activeStep ? 'completed' : ''}`}
            onClick={() => setActiveStep(idx)}
            aria-label={`Select level ${idx + 1}`}
          >
            {step.level}
          </button>
        ))}
      </div>

      {/* Stepper split grid */}
      <div className="stepper-grid">
        {/* Left column: Highly detailed animated vector infographic */}
        <div className="stepper-visual-card">
          <div className="visual-card-glow" style={{ background: `radial-gradient(circle, ${activeData.color} 0%, transparent 70%)` }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="visual-svg-container"
            >
              {activeData.svg}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right column: Details box */}
        <div className="stepper-details-box">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="step-tag">{activeData.tagline}</span>
              <h4 className="display step-title">{activeData.title}</h4>
              <p className="step-desc">{activeData.desc}</p>
              
              <div className="step-meta">
                <div className="meta-row">
                  <span className="meta-label">Recommended Beads:</span>
                  <div className="meta-chips">
                    {activeData.beads.map((bead, i) => (
                      <span key={i} className="meta-chip">{bead}</span>
                    ))}
                  </div>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Chakra Focus:</span>
                  <span className="meta-value">{activeData.chakra}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
