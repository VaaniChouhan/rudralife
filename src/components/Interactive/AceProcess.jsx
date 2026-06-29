import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

export default function AceProcess() {
  const [activeStep, setActiveStep] = useState('authenticate'); // 'authenticate' | 'cleanse' | 'energize'

  const steps = [
    { id: 'authenticate', label: 'A · Authenticate', icon: '🔬' },
    { id: 'cleanse', label: 'C · Cleanse', icon: '💧' },
    { id: 'energize', label: 'E · Energize', icon: '⚡' }
  ];

  return (
    <div className="ace-infographic reveal" style={{
      background: 'rgba(15, 12, 6, 0.5)',
      border: '1px solid rgba(196, 154, 60, 0.15)',
      borderRadius: 'var(--r-lg)',
      padding: '24px',
      marginTop: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Ambience */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(196,154,60,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* Progress Tabs */}
      <div className="ace-tabs" style={{
        display: 'flex',
        gap: '6px',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '4px',
        borderRadius: 'var(--r-xl)',
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        {steps.map(step => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            style={{
              flex: 1,
              background: activeStep === step.id ? 'var(--gold)' : 'transparent',
              color: activeStep === step.id ? 'var(--black)' : 'rgba(255,253,248,0.6)',
              border: 'none',
              borderRadius: 'var(--r-xl)',
              padding: '10px 8px',
              fontSize: '11.5px',
              fontWeight: activeStep === step.id ? '600' : '400',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
              touchAction: 'manipulation'
            }}
          >
            <span>{step.icon}</span>
            <span>{step.label}</span>
          </button>
        ))}
      </div>

      {/* Main Infographic Workspace */}
      <div className="ace-workspace" style={{ position: 'relative', height: '260px', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {activeStep === 'authenticate' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              {/* Scientific scan visualization */}
              <div style={{
                position: 'relative',
                height: '140px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(196,154,60,0.06)'
              }}>
                {/* Cross-section bead graphic */}
                <svg viewBox="0 0 100 100" width="90" height="90" style={{ opacity: 0.85 }}>
                  <circle cx="50" cy="50" r="35" stroke="var(--gold)" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="30" stroke="var(--gold)" strokeWidth="1.2" fill="none" />
                  
                  {/* Seeds inside compartments (5 Mukhi cross-section drawing) */}
                  {[...Array(5)].map((_, i) => {
                    const angle = (i * 360) / 5;
                    const rad = (angle * Math.PI) / 180;
                    const cx = 50 + 14 * Math.cos(rad);
                    const cy = 50 + 14 * Math.sin(rad);
                    return (
                      <g key={i}>
                        <line x1="50" y1="50" x2={50 + 30 * Math.cos(rad)} y2={50 + 30 * Math.sin(rad)} stroke="var(--gold)" strokeWidth="0.8" opacity="0.6" />
                        <ellipse cx={cx} cy={cy} rx="5" ry="3" fill="var(--gold)" opacity="0.25" stroke="var(--gold)" strokeWidth="0.5" transform={`rotate(${angle} ${cx} ${cy})`} />
                      </g>
                    );
                  })}
                  <circle cx="50" cy="50" r="4" fill="var(--gold)" opacity="0.6" />
                </svg>

                {/* Vertical Laser scanning line */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
                    boxShadow: '0 0 8px var(--gold)',
                    opacity: 0.8
                  }}
                  animate={{ left: ['15%', '85%', '15%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* Tech floating tag */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  color: 'rgba(255,253,248,0.5)',
                  background: 'rgba(0,0,0,0.4)',
                  padding: '3px 6px',
                  borderRadius: '4px'
                }}>
                  SCANNING COMPARTMENTS...
                </div>
              </div>

              {/* Technical specs readout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: 'rgba(255,253,248,0.65)' }}>
                <div style={{ background: 'rgba(255,253,248,0.02)', padding: '8px', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                  <strong>COMPARTMENT SCAN:</strong><br />5 distinct seeds detected, confirming authentic morphology.
                </div>
                <div style={{ background: 'rgba(255,253,248,0.02)', padding: '8px', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                  <strong>X-RAY INTEGRITY:</strong><br />100% solid cores, zero artificial glue or filled cavities.
                </div>
              </div>
            </motion.div>
          )}

          {activeStep === 'cleanse' && (
            <motion.div
              key="cleanse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              {/* Washing / purification animation */}
              <div style={{
                position: 'relative',
                height: '140px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(196,154,60,0.06)'
              }}>
                {/* Bead avatar inside liquid ripples */}
                <motion.div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(196,154,60,0.1)',
                    border: '1px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    position: 'relative',
                    zIndex: 2
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ॐ
                </motion.div>

                {/* Flowing waves inside container */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '45px',
                    background: 'linear-gradient(to top, rgba(196,154,60,0.12), transparent)',
                    borderRadius: '0 0 12px 12px',
                    zIndex: 1
                  }}
                  animate={{ height: ['40px', '50px', '40px'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Floating clean bubbles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'rgba(196,154,60,0.3)',
                      bottom: '10px',
                      left: `${15 + i * 14}%`
                    }}
                    animate={{
                      y: [-10, -90],
                      opacity: [0, 0.7, 0]
                    }}
                    transition={{
                      duration: 2 + (i % 2),
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>

              {/* Cleansing highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: 'rgba(255,253,248,0.65)' }}>
                <div style={{ background: 'rgba(255,253,248,0.02)', padding: '8px', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                  <strong>GANGAJAL ABLUTION:</strong><br />Washed under sacred waters to remove all physical residue.
                </div>
                <div style={{ background: 'rgba(255,253,248,0.02)', padding: '8px', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                  <strong>SANDALWOOD PASTE:</strong><br />Coated to seal natural fiber oils, preventing cracking.
                </div>
              </div>
            </motion.div>
          )}

          {activeStep === 'energize' && (
            <motion.div
              key="energize"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              {/* Prana pratishta (energy canvas) */}
              <div style={{
                position: 'relative',
                height: '140px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(196,154,60,0.1)'
              }}>
                {/* Active energy particles */}
                <ParticleCanvas count={24} color="rgba(196, 154, 60, " style={{ opacity: 0.6 }} />

                {/* Central radiating OM bead */}
                <motion.div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(196,154,60,0.35) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    color: 'var(--gold)',
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 2,
                    textShadow: '0 0 10px rgba(196,154,60,0.8)'
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      '0 0 12px rgba(196,154,60,0.1)',
                      '0 0 24px rgba(196,154,60,0.4)',
                      '0 0 12px rgba(196,154,60,0.1)'
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ॐ
                </motion.div>

                {/* Golden radiating energy lines */}
                <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 360) / 12;
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2={50 + 45 * Math.cos(rad)}
                        y2={50 + 45 * Math.sin(rad)}
                        stroke="var(--gold)"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Mantra vibration stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: 'rgba(255,253,248,0.65)' }}>
                <div style={{ background: 'rgba(255,253,248,0.02)', padding: '8px', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                  <strong>BEEJ MANTRA CHANTING:</strong><br />Consecrated with 1008 repetitions of Shiva Mantras.
                </div>
                <div style={{ background: 'rgba(255,253,248,0.02)', padding: '8px', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                  <strong>PERSONAL CONSECRATION:</strong><br />Blessings linked to your gotra/name on final packing.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
