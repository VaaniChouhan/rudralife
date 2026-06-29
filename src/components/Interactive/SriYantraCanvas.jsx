import React, { useEffect, useRef } from 'react';

/**
 * SriYantraCanvas — Animated sacred geometry drawn on HTML5 Canvas.
 * Renders the 9 interlocking triangles of the Sri Yantra with a slow
 * golden stroke-draw animation and a soft breathing glow on hover.
 */
export default function SriYantraCanvas({ size = 320 }) {
  const canvasRef = useRef(null);
  const phaseRef = useRef(0);
  const glowRef = useRef(0);
  const glowDirRef = useRef(1);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const s = size;

    canvas.width = s * dpr;
    canvas.height = s * dpr;
    canvas.style.width = `${s}px`;
    canvas.style.height = `${s}px`;
    ctx.scale(dpr, dpr);

    const cx = s / 2;
    const cy = s / 2;
    const R = s * 0.42;

    // Sri Yantra triangle definitions (upward △ and downward ▽ pairs)
    // Each triangle: [cx_offset, cy_offset, radius, rotation]
    const upTriangles = [
      { r: R * 0.98, rot: 0 },
      { r: R * 0.68, rot: 0 },
      { r: R * 0.52, rot: 0 },
      { r: R * 0.36, rot: 0 },
    ];
    const downTriangles = [
      { r: R * 0.85, rot: Math.PI },
      { r: R * 0.60, rot: Math.PI },
      { r: R * 0.44, rot: Math.PI },
      { r: R * 0.30, rot: Math.PI },
      { r: R * 0.18, rot: Math.PI },
    ];

    function triangle(ctx, cx, cy, r, rot) {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = rot + (i * 2 * Math.PI) / 3 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawLotus(ctx, cx, cy, r) {
      const petals = 16;
      for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, -r * 0.88, r * 0.13, r * 0.42, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(196,154,60,0.10)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }
    }

    function draw(phase) {
      ctx.clearRect(0, 0, s, s);

      // Outer Bhupura (square gateway)
      const sq = R * 1.06;
      ctx.strokeStyle = `rgba(196,154,60,0.20)`;
      ctx.lineWidth = 0.8;
      // Outer square with gates
      ctx.beginPath();
      ctx.rect(cx - sq, cy - sq, sq * 2, sq * 2);
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(196,154,60,0.16)`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Lotus petals
      drawLotus(ctx, cx, cy, R);

      // Bindu (central dot)
      const glow = 0.5 + glowRef.current * 0.5;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.05);
      grad.addColorStop(0, `rgba(255,220,120,${glow})`);
      grad.addColorStop(1, `rgba(196,154,60,0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.03, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw triangles with progressive alpha
      const totalLines = upTriangles.length + downTriangles.length;
      const currentLine = Math.floor(phase * totalLines);
      const lineProgress = (phase * totalLines) - currentLine;

      [...upTriangles, ...downTriangles].forEach((t, i) => {
        const alpha = i < currentLine ? 0.55 : (i === currentLine ? lineProgress * 0.55 : 0);
        if (alpha <= 0) return;
        ctx.save();
        triangle(ctx, cx, cy, t.r, t.rot);
        const strokeGrad = ctx.createLinearGradient(cx - t.r, cy - t.r, cx + t.r, cy + t.r);
        strokeGrad.addColorStop(0, `rgba(255,220,120,${alpha})`);
        strokeGrad.addColorStop(0.5, `rgba(196,154,60,${alpha})`);
        strokeGrad.addColorStop(1, `rgba(124,92,46,${alpha})`);
        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });
    }

    let startTime = null;
    const DRAW_DURATION = 3200; // ms to complete the full draw

    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      phaseRef.current = Math.min(elapsed / DRAW_DURATION, 1);

      // Breathing glow
      glowRef.current += 0.008 * glowDirRef.current;
      if (glowRef.current >= 1) glowDirRef.current = -1;
      if (glowRef.current <= 0) glowDirRef.current = 1;

      draw(phaseRef.current);
      // keep animating forever for breathing glow
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        margin: '0 auto',
        filter: 'drop-shadow(0 0 24px rgba(196,154,60,0.25))',
        borderRadius: '50%',
      }}
      aria-label="Animated Sri Yantra Sacred Geometry"
    />
  );
}
