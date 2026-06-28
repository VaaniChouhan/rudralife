import React, { useState } from 'react';

// North Indian style Kundali Chart SVG component
const KundaliChart = ({ rashiName, lagnaName, NakshatraName, intention }) => {
  const [hoveredHouse, setHoveredHouse] = useState(null);

  // House attributes and planetary placements for the dynamic infographic
  const houses = {
    1: { name: "1st House (Lagna)", attr: "Self, physical body, vitality, and general life path", planets: ["Asc", "Ascendant"] },
    2: { name: "2nd House (Dhana)", attr: "Wealth, family values, speech, and early education", planets: [] },
    3: { name: "3rd House (Sahaja)", attr: "Courage, sibling relationship, mental strength, communication", planets: ["♂ Mars"] },
    4: { name: "4th House (Sukha)", attr: "Mother, home, happiness, peace of mind, property", planets: ["☽ Moon"] },
    5: { name: "5th House (Putra)", attr: "Children, creativity, intellect, past life merits, luck", planets: [] },
    6: { name: "6th House (Shatru)", attr: "Obstacles, debt, diseases, daily routine, service", planets: ["☊ Rahu"] },
    7: { name: "7th House (Kalatra)", attr: "Marriage, partnerships, spouse, public relations", planets: ["♀ Venus"] },
    8: { name: "8th House (Ayur)", attr: "Longevity, secret knowledge, sudden events, occult sciences", planets: [] },
    9: { name: "9th House (Dharma)", attr: "Higher learning, guru, father, luck, long journeys", planets: ["♃ Jupiter"] },
    10: { name: "10th House (Karma)", attr: "Career, status, leadership, professional achievements", planets: ["☉ Sun", "☿ Merc"] },
    11: { name: "11th House (Labha)", attr: "Gains, friendships, aspirations, income sources", planets: [] },
    12: { name: "12th House (Vyaya)", attr: "Losses, isolation, foreign land, sleep, liberation", planets: ["♄ Sat", "☋ Ketu"] }
  };

  // Adjust placement for career focus (put Sun in 10th for success, etc.)
  if (intention === 'career') {
    houses[10].planets = ["☉ Sun", "☿ Merc", "♃ Jupiter"];
    houses[9].planets = [];
  } else if (intention === 'peace') {
    houses[4].planets = ["☽ Moon", "♀ Venus"];
    houses[7].planets = [];
  } else if (intention === 'health') {
    houses[1].planets = ["Asc", "♃ Jupiter"];
    houses[9].planets = [];
  }

  // Paths for 12 houses in North Indian style Kundali (diamond layout)
  // ViewBox: 0 0 100 100
  return (
    <div style={{ marginTop: '16px', position: 'relative' }}>
      <h5 className="display" style={{ fontSize: '13px', color: 'var(--gold)', textAlign: 'center', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Dynamic Birth Chart (Kundali Matrix)
      </h5>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <svg viewBox="0 0 100 100" style={{ width: '220px', height: '220px', background: '#0D0A06', border: '1px solid rgba(196,154,60,0.3)', borderRadius: '4px', overflow: 'visible' }}>
          {/* Border */}
          <rect x="2" y="2" width="96" height="96" fill="none" stroke="var(--gold)" strokeWidth="1" />
          
          {/* Diagonals */}
          <line x1="2" y1="2" x2="98" y2="98" stroke="rgba(196,154,60,0.5)" strokeWidth="0.8" />
          <line x1="2" y1="98" x2="98" y2="2" stroke="rgba(196,154,60,0.5)" strokeWidth="0.8" />
          
          {/* Inner Diamond */}
          <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke="rgba(196,154,60,0.8)" strokeWidth="1" />

          {/* Interactive invisible hit areas for houses to show tooltips */}
          {/* House 1: Central top triangle */}
          <polygon 
            points="50,2 26,26 50,50 74,26" 
            fill={hoveredHouse === 1 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(1)}
            onMouseLeave={() => setHoveredHouse(null)}
          />
          
          {/* House 2: Upper left triangle */}
          <polygon 
            points="2,2 50,2 26,26" 
            fill={hoveredHouse === 2 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(2)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 3: Far left upper triangle */}
          <polygon 
            points="2,2 26,26 2,50" 
            fill={hoveredHouse === 3 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(3)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 4: Central left triangle */}
          <polygon 
            points="2,50 26,26 50,50 26,74" 
            fill={hoveredHouse === 4 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(4)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 5: Far left lower triangle */}
          <polygon 
            points="2,50 26,74 2,98" 
            fill={hoveredHouse === 5 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(5)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 6: Lower left triangle */}
          <polygon 
            points="2,98 50,98 26,74" 
            fill={hoveredHouse === 6 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(6)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 7: Central bottom triangle */}
          <polygon 
            points="50,50 26,74 50,98 74,74" 
            fill={hoveredHouse === 7 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(7)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 8: Lower right triangle */}
          <polygon 
            points="50,98 98,98 74,74" 
            fill={hoveredHouse === 8 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(8)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 9: Far right lower triangle */}
          <polygon 
            points="98,50 74,74 98,98" 
            fill={hoveredHouse === 9 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(9)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 10: Central right triangle */}
          <polygon 
            points="50,50 74,26 98,50 74,74" 
            fill={hoveredHouse === 10 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(10)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 11: Far right upper triangle */}
          <polygon 
            points="98,2 74,26 98,50" 
            fill={hoveredHouse === 11 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(11)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House 12: Upper right triangle */}
          <polygon 
            points="50,2 98,2 74,26" 
            fill={hoveredHouse === 12 ? 'rgba(196,154,60,0.15)' : 'transparent'} 
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredHouse(12)}
            onMouseLeave={() => setHoveredHouse(null)}
          />

          {/* House Numbers */}
          <text x="50" y="32" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">1</text>
          <text x="36" y="16" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">2</text>
          <text x="16" y="36" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">3</text>
          <text x="32" y="51" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">4</text>
          <text x="16" y="66" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">5</text>
          <text x="36" y="86" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">6</text>
          <text x="50" y="70" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">7</text>
          <text x="64" y="86" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">8</text>
          <text x="84" y="66" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">9</text>
          <text x="68" y="51" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">10</text>
          <text x="84" y="36" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">11</text>
          <text x="64" y="16" fill="var(--gold-lt)" fontSize="3.5" textAnchor="middle" opacity="0.6">12</text>

          {/* Render planets in houses dynamically */}
          {/* House 1 planets */}
          {houses[1].planets.map((p, idx) => (
            <text key={idx} x="50" y={22 + idx * 4} fill="#FFFDF8" fontSize="3" fontWeight="bold" textAnchor="middle">{p}</text>
          ))}
          {/* House 3 planets */}
          {houses[3].planets.map((p, idx) => (
            <text key={idx} x="10" y={26 + idx * 4} fill="#FFFDF8" fontSize="2.8" textAnchor="middle">{p}</text>
          ))}
          {/* House 4 planets */}
          {houses[4].planets.map((p, idx) => (
            <text key={idx} x="26" y={48 + idx * 4} fill="#FFFDF8" fontSize="2.8" textAnchor="middle">{p}</text>
          ))}
          {/* House 6 planets */}
          {houses[6].planets.map((p, idx) => (
            <text key={idx} x="32" y={78 + idx * 4} fill="#FFFDF8" fontSize="2.8" textAnchor="middle">{p}</text>
          ))}
          {/* House 7 planets */}
          {houses[7].planets.map((p, idx) => (
            <text key={idx} x="50" y={78 + idx * 4} fill="#FFFDF8" fontSize="2.8" textAnchor="middle">{p}</text>
          ))}
          {/* House 9 planets */}
          {houses[9].planets.map((p, idx) => (
            <text key={idx} x="86" y={78 + idx * 4} fill="#FFFDF8" fontSize="2.8" textAnchor="middle">{p}</text>
          ))}
          {/* House 10 planets */}
          {houses[10].planets.map((p, idx) => (
            <text key={idx} x="74" y={48 + idx * 4} fill="#FFFDF8" fontSize="2.8" textAnchor="middle">{p}</text>
          ))}
          {/* House 12 planets */}
          {houses[12].planets.map((p, idx) => (
            <text key={idx} x="68" y={24 + idx * 4} fill="#FFFDF8" fontSize="2.8" textAnchor="middle">{p}</text>
          ))}
        </svg>

        {/* Dynamic description of hovered house */}
        <div style={{ width: '100%', minHeight: '62px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px', border: '1px solid rgba(196,154,60,0.1)', padding: '10px', fontSize: '11px', textAlign: 'left', lineHeight: '1.4' }}>
          {hoveredHouse ? (
            <div>
              <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '2px' }}>
                {houses[hoveredHouse].name}
              </strong>
              <span style={{ color: 'rgba(255,253,248,0.85)' }}>
                {houses[hoveredHouse].attr}
              </span>
              {houses[hoveredHouse].planets.length > 0 && (
                <div style={{ marginTop: '4px', fontSize: '10.5px', color: '#00d2ff' }}>
                  Occupying: {houses[hoveredHouse].planets.join(", ")}
                </div>
              )}
            </div>
          ) : (
            <span style={{ color: 'var(--muted)', fontStyle: 'italic', display: 'block', textAlign: 'center', marginTop: '10px' }}>
              Hover over chart segments to inspect astrological houses &amp; planetary currents.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

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
          <h3 className="display" style={{ fontSize: '20px', color: 'var(--gold)', textAlign: 'center', marginBottom: '16px', letterSpacing: '0.05em' }}>
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
              <div style={{ border: '1px solid var(--gold)', borderRadius: '12px', padding: '16px', background: 'rgba(0,0,0,0.35)', textAlign: 'center', marginBottom: '16px' }}>
                <span className="eyebrow">Sacred Profile Generated</span>
                <h4 className="display" style={{ fontSize: '20px', color: 'var(--white)', margin: '6px 0' }}>
                  {result.rashi}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {result.lagna}
                </p>
                
                {/* Custom Dynamic Kundali Chart Infographic */}
                <KundaliChart 
                  rashiName={result.rashi} 
                  lagnaName={result.lagna} 
                  intention={intention} 
                />
                
                <div style={{ borderTop: '1px solid rgba(196,154,60,0.2)', paddingTop: '12px', marginTop: '16px' }}>
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
