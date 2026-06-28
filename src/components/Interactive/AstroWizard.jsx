import React, { useState } from 'react';

export default function AstroWizard() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [intention, setIntention] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('');
  const [loaderStatus, setLoaderStatus] = useState('Aligning birth coordinates...');
  const [result, setResult] = useState({ rashi: '', lagna: '', text: '' });

  const selectIntention = (selectedIntention) => {
    setIntention(selectedIntention);
  };

  const handleStep2Submit = () => {
    if (!dob || !tob || !pob) {
      alert('Please enter all birth details.');
      return;
    }
    setStep(3);
    setLoaderStatus('Aligning birth coordinates...');

    const statuses = [
      'Aligning birth coordinates...',
      'Calculating Rashi Lagna...',
      'Analyzing active planetary Dashas...'
    ];

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < statuses.length) {
        setLoaderStatus(statuses[i]);
      } else {
        clearInterval(interval);
        displayAstroResult();
      }
    }, 1000);
  };

  const displayAstroResult = () => {
    const rashis = ['Vrishabha (Taurus)', 'Mesha (Aries)', 'Mithuna (Gemini)', 'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)'];
    const lagnas = ['Cancer', 'Leo', 'Taurus', 'Aries', 'Virgo'];
    const nakshatras = ['Rohini', 'Ashwini', 'Ardra', 'Pushya', 'Chitra'];

    const day = new Date(dob).getDate() || 1;
    const rashi = rashis[day % rashis.length];
    const lagna = lagnas[day % lagnas.length];
    const nakshatra = nakshatras[day % nakshatras.length];

    const finalName = name || 'Seeker';
    let recText = '';

    if (intention === 'peace') {
      recText = `Dear ${finalName}, your Rohini Nakshatra period currently experiences high sensory stimuli. We recommend a 5 Mukhi & 9 Mukhi combination to bring immense peace, emotional calm, and protection against everyday stress.`;
    } else if (intention === 'career') {
      recText = `Dear ${finalName}, based on your ${lagna} lagna alignment, Saturn is transitioning into a powerful house. We recommend the flagship Siddha Mala or a 7 Mukhi & 14 Mukhi combination to maximize leadership, professional gains, and victory over challenges.`;
    } else if (intention === 'health') {
      recText = `Dear ${finalName}, your planetary profile points to an active energetic cleanse phase. We recommend a 3 Mukhi & 11 Mukhi combination for elevated physical vitality, protection, and aura enhancement.`;
    } else {
      recText = `Dear ${finalName}, to safeguard your planetary matrix against affliction, we recommend the 8 Mukhi & 9 Mukhi combinations (Rahu-Ketu balance) to shield you from negative influences and dosha cycles.`;
    }

    setResult({
      rashi: `Moon Sign: ${rashi}`,
      lagna: `Lagna: ${lagna} | Nakshatra: ${nakshatra}`,
      text: recText
    });
    setStep(4);
  };

  const resetWizard = () => {
    setName('');
    setDob('');
    setTob('');
    setPob('');
    setIntention('');
    setStep(1);
  };

  return (
    <div style={{ marginTop: '22px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          className="btn-gold" 
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? 'Close Recommendations ↑' : 'Get Personalised Astrological Recommendation →'}
        </button>
      </div>

      {isVisible && (
        <div className="astro-wizard-card reveal" style={{ display: 'block', marginBottom: '24px' }}>
          <h3 className="display" style={{ fontSize: '22px', color: 'var(--gold)', textAlign: 'center', marginBottom: '16px' }}>
            Svaras Astrological Matcher
          </h3>
          
          {/* Step 1: Intention */}
          {step === 1 && (
            <div className="wizard-step active">
              <p style={{ fontSize: '13px', textAlign: 'center', marginBottom: '16px', color: 'rgba(255,253,248,0.7)' }}>
                Choose your primary life intention:
              </p>
              <div className="step-grid">
                <div 
                  className={`step-choice ${intention === 'peace' ? 'selected' : ''}`} 
                  onClick={() => selectIntention('peace')}
                >
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 4px' }}><path d="M12 2a5 5 0 0 1 5 5c0 2-1 3.5-2.5 4.5M12 7v10M8 17h8M7 10.5C5.5 9.5 5 8 5 7a7 7 0 0 1 14 0c0 1-.5 2.5-2 3.5"/></svg>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--white)' }}>Peace &amp; Calm</span>
                </div>
                <div 
                  className={`step-choice ${intention === 'career' ? 'selected' : ''}`} 
                  onClick={() => selectIntention('career')}
                >
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 4px' }}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--white)' }}>Career Success</span>
                </div>
                <div 
                  className={`step-choice ${intention === 'health' ? 'selected' : ''}`} 
                  onClick={() => selectIntention('health')}
                >
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 4px' }}><path d="M12 22c4-3 8-6.5 8-11A5 5 0 0 0 7.5 7C6.5 8 6 9 6 10c0 2 1 4 2.5 5.5M12 14V2"/></svg>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--white)' }}>Health &amp; Vigor</span>
                </div>
                <div 
                  className={`step-choice ${intention === 'protection' ? 'selected' : ''}`} 
                  onClick={() => selectIntention('protection')}
                >
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 4px' }}><path d="M12 2l8 3v6c0 5.5-3.5 10.1-8 11C7.5 21.1 4 16.5 4 11V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--white)' }}>Protection</span>
                </div>
              </div>
              <button 
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center' }} 
                onClick={() => intention ? setStep(2) : alert('Please select an intention first.')}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Birth Info */}
          {step === 2 && (
            <div className="wizard-step active">
              <p style={{ fontSize: '13px', textAlign: 'center', marginBottom: '16px', color: 'rgba(255,253,248,0.7)' }}>
                Enter birth coordinates for Kundali mapping:
              </p>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your Name" 
                className="wizard-input" 
              />
              <input 
                type="date" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)} 
                className="wizard-input" 
              />
              <input 
                type="time" 
                value={tob} 
                onChange={(e) => setTob(e.target.value)} 
                className="wizard-input" 
              />
              <input 
                type="text" 
                value={pob} 
                onChange={(e) => setPob(e.target.value)} 
                placeholder="Place of Birth (City)" 
                className="wizard-input" 
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button 
                  className="btn-outline-white" 
                  style={{ flex: 1, justifyContent: 'center', padding: '10px 0', borderRadius: '30px' }} 
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button 
                  className="btn-gold" 
                  style={{ flex: 2, justifyContent: 'center', padding: '10px 0', borderRadius: '30px' }} 
                  onClick={handleStep2Submit}
                >
                  Align Profile →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Loading */}
          {step === 3 && (
            <div className="wizard-step active" style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '13px', textAlign: 'center', marginTop: '10px', color: 'var(--gold)' }}>
                {loaderStatus}
              </p>
              <div className="yantra-loader">
                <svg viewBox="0 0 100 100" width="64" height="64" style={{ animation: 'spin 3s linear infinite', display: 'block', margin: '12px auto' }}>
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(196,154,60,0.15)" strokeWidth="4"/>
                  <circle cx="50" cy="50" r="10" fill="none" stroke="#C49A3C" strokeWidth="3"/>
                  {[0,45,90,135,180,225,270,315].map((angle, i) => {
                    const rad = angle * Math.PI / 180;
                    const x1 = 50 + 13 * Math.cos(rad); const y1 = 50 + 13 * Math.sin(rad);
                    const x2 = 50 + 36 * Math.cos(rad); const y2 = 50 + 36 * Math.sin(rad);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C49A3C" strokeWidth="2.5" opacity={0.3 + i * 0.09} />;
                  })}
                  <circle cx="50" cy="6" r="5" fill="#C49A3C"/>
                  <circle cx="50" cy="94" r="5" fill="#C49A3C"/>
                  <circle cx="6" cy="50" r="5" fill="#C49A3C"/>
                  <circle cx="94" cy="50" r="5" fill="#C49A3C"/>
                  <circle cx="21.7" cy="21.7" r="4" fill="rgba(196,154,60,0.5)"/>
                  <circle cx="78.3" cy="21.7" r="4" fill="rgba(196,154,60,0.5)"/>
                  <circle cx="21.7" cy="78.3" r="4" fill="rgba(196,154,60,0.5)"/>
                  <circle cx="78.3" cy="78.3" r="4" fill="rgba(196,154,60,0.5)"/>
                </svg>
              </div>
              <p style={{ fontSize: '11.5px', textAlign: 'center', color: 'var(--muted)', fontStyle: 'italic' }}>
                Computing moon sign nakshatra &amp; planetary lords...
              </p>
            </div>
          )}

          {/* Step 4: Recommendation Result */}
          {step === 4 && (
            <div className="wizard-step active">
              <div style={{ border: '1px solid var(--gold)', borderRadius: '12px', padding: '16px', background: 'rgba(0,0,0,0.3)', textAlign: 'center', marginBottom: '16px' }}>
                <span className="eyebrow">Sacred Profile Generated</span>
                <h4 className="display" style={{ fontSize: '20px', color: 'var(--white)', margin: '6px 0' }}>
                  {result.rashi}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {result.lagna}
                </p>
                <div style={{ borderTop: '1px solid rgba(196,154,60,0.2)', paddingTop: '12px', marginTop: '12px' }}>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,253,248,0.85)', lineHeight: 1.5 }}>
                    {result.text}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="https://wa.me/919867291461" target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.6 21.5l3.86-1.28C8.07 21.39 10.01 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.95 13.9c-.3.8-.9 1.4-1.6 1.7-.5.2-1.2.3-2.6-.3-1.8-.7-3.3-2.2-4-4-.6-1.4-.5-2.1-.3-2.6.3-.7.9-1.3 1.7-1.6l.4-.1.8 1.8-.4.4c-.2.2-.3.4-.3.6.1.4.5.9 1.1 1.5.6.6 1.1 1 1.5 1.1.2 0 .4-.1.6-.3l.4-.4 1.8.8-.1.4z"/></svg>
                  Speak to Astrologer (WhatsApp)
                </a>
                <button 
                  className="btn-outline-white" 
                  style={{ justifyContent: 'center', borderRadius: '30px' }} 
                  onClick={resetWizard}
                >
                  Reset Form
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
