import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  { id: 'mumbai', name: 'Mumbai, India', coords: { x: 67, y: 55 }, stats: "Headquarters & Temple Blessing Altar", seekers: "85,000+ Seekers", note: "Over 25 years of local expert consulting and custom mala crafting." },
  { id: 'nyc', name: 'New York, USA', coords: { x: 26, y: 35 }, stats: "Annual Spiritual Exhibition Hub", seekers: "14,000+ Seekers", note: "Serving collectors and seekers across the North American region." },
  { id: 'london', name: 'London, UK', coords: { x: 46, y: 30 }, stats: "European Advisory Center", seekers: "11,000+ Seekers", note: "Providing certified consultation and authentic beads to Europe." },
  { id: 'singapore', name: 'Singapore', coords: { x: 76, y: 64 }, stats: "South-East Asian Exhibition Hub", seekers: "9,000+ Seekers", note: "Host of major annual Rudraksha blessings and spiritual expos." },
  { id: 'sydney', name: 'Sydney, Australia', coords: { x: 88, y: 82 }, stats: "Oceania Delivery & Care Center", seekers: "6,000+ Seekers", note: "Reaching devotees and spiritual communities down under." }
];

export default function CommunityMap() {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <div className="community-map-wrapper">
      <h4 className="map-title">Global Seekers Connection Network</h4>
      <div className="map-container">
        {/* Minimalist World Map Outline */}
        <svg viewBox="0 0 100 100" className="world-map-svg">
          {/* Stylized background landmass outlines (highly abstract & premium) */}
          <path 
            d="M10,25 C15,22 22,25 25,32 C28,38 20,45 15,50 C10,55 12,65 15,70 C18,75 14,80 10,80 Z 
               M40,20 C45,18 52,22 55,28 C58,34 50,42 48,50 C46,58 48,68 40,75 Z 
               M60,40 C65,38 72,40 76,46 C80,52 82,60 80,68 C78,76 72,82 66,80 C60,78 58,68 60,60 Z
               M78,20 C82,18 88,22 92,26 C96,30 98,38 95,45 C92,52 85,58 80,55 Z" 
            fill="none" 
            stroke="var(--gold)" 
            strokeWidth="0.5" 
            opacity="0.12" 
          />
          <path 
            d="M30,30 L38,38 M45,40 L52,50 M62,55 L70,68 M15,45 L25,52 M76,28 L82,34" 
            stroke="var(--gold)" 
            strokeWidth="0.3" 
            strokeDasharray="2 3" 
            opacity="0.15" 
          />

          {/* Connection arcs from Mumbai to global hubs */}
          {cities.map((city) => {
            if (city.id === 'mumbai') return null;
            // Draw path from Mumbai (67, 55) to city coords
            const dx = city.coords.x - 67;
            const dy = city.coords.y - 55;
            const mx = 67 + dx / 2;
            const my = 55 + dy / 2 - 12; // Arced offset upwards
            return (
              <motion.path
                key={`arc-${city.id}`}
                d={`M 67 55 Q ${mx} ${my} ${city.coords.x} ${city.coords.y}`}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.8"
                opacity="0.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            );
          })}

          {/* Pulsating City Beacons */}
          {cities.map((city) => (
            <g 
              key={city.id} 
              className="city-beacon-group"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              {/* Outer pulsing ring */}
              <motion.circle
                cx={city.coords.x}
                cy={city.coords.y}
                r="3.5"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.8"
                animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Core Dot */}
              <circle
                cx={city.coords.x}
                cy={city.coords.y}
                r="1.8"
                fill={city.id === 'mumbai' ? 'var(--gold-lt)' : 'var(--gold)'}
              />
            </g>
          ))}
        </svg>

        {/* Hover Info Tooltip */}
        <AnimatePresence>
          {hoveredCity && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="map-tooltip"
              style={{
                position: 'absolute',
                left: `${hoveredCity.coords.x}%`,
                top: `${hoveredCity.coords.y - 14}%`,
              }}
            >
              <h5>{hoveredCity.name}</h5>
              <span className="tooltip-seekers">{hoveredCity.seekers}</span>
              <span className="tooltip-stats">{hoveredCity.stats}</span>
              <p className="tooltip-note">{hoveredCity.note}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
