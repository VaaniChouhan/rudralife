import React, { useRef, useEffect } from 'react';

/**
 * BeadOrbitViewer — Pure CSS + JS 3D orbiting bead viewer.
 * Renders an authentic Rudraksha bead (drawn with Canvas) 
 * with a 3D CSS orbit ring and floating mukhi labels.
 * No external dependencies required.
 */
export default function BeadOrbitViewer({ mukhiCount = 1, label = "Ek Mukhi Kaju", subtitle = "Rarest Form — Half-Moon" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rotRef = useRef({ x: -15, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const autoRotRef = useRef(true);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 160, H = 160;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H / 2;

    function drawBead(progress) {
      ctx.clearRect(0, 0, W, H);
      const r = 58;

      // Drop shadow
      const shadowGrad = ctx.createRadialGradient(cx + 4, cy + 6, 0, cx + 4, cy + 6, r * 1.1);
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.ellipse(cx + 4, cy + 6, r, r * 0.8, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // Main bead body — rich dark brown
      const bodyGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
      bodyGrad.addColorStop(0, '#6B4423');
      bodyGrad.addColorStop(0.3, '#3D2010');
      bodyGrad.addColorStop(0.7, '#2A1508');
      bodyGrad.addColorStop(1, '#120900');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Mukhi lines (vertical grooves)
      const mukhi = Math.max(1, mukhiCount);
      ctx.save();
      ctx.clip(); // clip to bead circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      for (let i = 0; i < mukhi; i++) {
        const angle = (i / mukhi) * Math.PI * 2 + progress * 0.5;
        const x1 = cx + r * 0.85 * Math.cos(angle - Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(cx + (x1 - cx) * 0.4, cy - r * 0.7);
        ctx.quadraticCurveTo(cx + Math.cos(angle) * r * 0.9, cy, cx + (x1 - cx) * 0.4, cy + r * 0.7);
        ctx.strokeStyle = `rgba(0,0,0,0.45)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();

      // Specular highlight (top-left)
      const hiGrad = ctx.createRadialGradient(cx - r * 0.32, cy - r * 0.35, 0, cx - r * 0.3, cy - r * 0.3, r * 0.6);
      hiGrad.addColorStop(0, 'rgba(255,210,120,0.30)');
      hiGrad.addColorStop(0.4, 'rgba(255,180,80,0.08)');
      hiGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = hiGrad;
      ctx.fill();

      // Gold threading hole top
      const holeGrad = ctx.createRadialGradient(cx, cy - r + 4, 0, cx, cy - r + 4, 7);
      holeGrad.addColorStop(0, '#0D0A06');
      holeGrad.addColorStop(1, 'rgba(13,10,6,0)');
      ctx.beginPath();
      ctx.ellipse(cx, cy - r + 5, 5, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = holeGrad;
      ctx.fill();

      // Gold threading hole bottom
      ctx.beginPath();
      ctx.ellipse(cx, cy + r - 5, 5, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = holeGrad;
      ctx.fill();

      // Gold thread
      ctx.beginPath();
      ctx.moveTo(cx, cy - r + 2);
      ctx.lineTo(cx, cy - r - 16);
      ctx.strokeStyle = 'rgba(196,154,60,0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy + r - 2);
      ctx.lineTo(cx, cy + r + 10);
      ctx.stroke();
    }

    let t = 0;
    function animate() {
      t += 0.012;
      drawBead(t);
      frameRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [mukhiCount]);

  // Mouse drag for 3D orbit rotation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (e) => {
      isDragging.current = true;
      autoRotRef.current = false;
      const pos = e.touches ? e.touches[0] : e;
      lastPos.current = { x: pos.clientX, y: pos.clientY };
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      const pos = e.touches ? e.touches[0] : e;
      const dx = pos.clientX - lastPos.current.x;
      const dy = pos.clientY - lastPos.current.y;
      rotRef.current.y += dx * 0.5;
      rotRef.current.x = Math.max(-30, Math.min(30, rotRef.current.x + dy * 0.3));
      lastPos.current = { x: pos.clientX, y: pos.clientY };
      el.querySelector('.bead-3d-inner').style.transform =
        `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
    };
    const onUp = () => {
      isDragging.current = false;
      setTimeout(() => { autoRotRef.current = true; }, 2000);
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    // Auto-rotate
    let raf;
    function autoRotate() {
      if (autoRotRef.current) {
        rotRef.current.y += 0.25;
        const inner = el.querySelector('.bead-3d-inner');
        if (inner) inner.style.transform =
          `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
      }
      raf = requestAnimationFrame(autoRotate);
    }
    raf = requestAnimationFrame(autoRotate);

    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="bead-orbit-viewer" style={{ cursor: 'grab', userSelect: 'none' }}>
      <div
        className="bead-3d-scene"
        style={{ perspective: '600px', width: '240px', height: '240px', margin: '0 auto', position: 'relative' }}
      >
        {/* Orbit ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '220px',
            height: '60px',
            borderRadius: '50%',
            border: '1px solid rgba(196,154,60,0.22)',
            boxShadow: '0 0 20px rgba(196,154,60,0.08)',
            transform: 'rotateX(75deg)',
          }} />
        </div>

        <div
          className="bead-3d-inner"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transform: `rotateX(-15deg) rotateY(0deg)`,
            transition: 'transform 0.05s linear',
          }}
        >
          <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px',
          color: 'var(--gold-lt)',
          fontStyle: 'italic',
          marginBottom: '4px',
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '11px',
          color: 'rgba(255,253,248,0.45)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          {subtitle}
        </div>
        <div style={{
          marginTop: '10px',
          fontSize: '10px',
          color: 'rgba(196,154,60,0.5)',
          letterSpacing: '0.08em',
        }}>
          ✦ Drag to rotate ✦
        </div>
      </div>
    </div>
  );
}
