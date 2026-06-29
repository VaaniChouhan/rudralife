import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroOrb() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const isMobile = window.innerWidth < 768;
    camera.position.z = isMobile ? 4.3 : 5.8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Particle Texture creation programmatically
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 230, 150, 1)');
    grad.addColorStop(0.2, 'rgba(220, 180, 100, 0.8)');
    grad.addColorStop(0.5, 'rgba(196, 154, 60, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(pCanvas);

    // Particle Configuration
    const particleCount = 8500;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Generate Rudraksha shape particles
    const R = 1.6; // Base radius
    const mukhiCount = 5;

    for (let i = 0; i < particleCount; i++) {
      // Uniform distribution on sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);

      // 1. Organic lobes/grooves that taper down near the poles
      const grooveFactor = Math.sin(phi);
      const groove = Math.sin(theta * mukhiCount) * 0.16 * grooveFactor;

      // 2. Central canal opening / polar depression
      const shapeFactor = 0.85 + 0.15 * Math.sin(phi);

      // 3. Multi-frequency organic bumpy texture
      const bump1 = Math.sin(theta * 24) * Math.cos(phi * 24) * 0.08;
      const bump2 = Math.sin(theta * 48) * Math.cos(phi * 48) * 0.04;
      const macroRidges = Math.cos(phi * 6) * 0.04;

      const currentR = R * shapeFactor - Math.abs(groove) + bump1 + bump2 + macroRidges;

      const x = currentR * Math.sin(phi) * Math.cos(theta);
      const y = currentR * Math.cos(phi);
      const z = currentR * Math.sin(phi) * Math.sin(theta);

      // Save coords
      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Velocities initial zero
      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      // 4. Vertex Colors matching warm sacred tones (gold, terracotta, dark teak, sparks)
      const colorVal = Math.random();
      let r, g, b;
      if (colorVal < 0.12) {
        // Gold Sparks
        r = 1.0; g = 0.95; b = 0.75;
      } else if (colorVal < 0.50) {
        // Bright Gold/Amber
        r = 0.77; g = 0.60; b = 0.24;
      } else if (colorVal < 0.82) {
        // Warm Terracotta/Teak Wood
        r = 0.49; g = 0.36; b = 0.18;
      } else {
        // Deep Dark Teak
        r = 0.22; g = 0.14; b = 0.06;
      }

      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;
    }

    const geometry = new THREE.BufferAttribute(positions, 3);
    const colorGeometry = new THREE.BufferAttribute(colors, 3);
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', geometry);
    particleGeometry.setAttribute('color', colorGeometry);

    // Points material with vertexColors enabled
    const material = new THREE.PointsMaterial({
      size: 0.088,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const points = new THREE.Points(particleGeometry, material);
    scene.add(points);

    // Mouse Tracking setup
    const mouse = new THREE.Vector2(-999, -999);
    const targetMouse = new THREE.Vector2(-999, -999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Intersection plane

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      targetMouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerLeave = () => {
      targetMouse.set(-999, -999);
    };

    const dom = containerRef.current;
    dom.addEventListener('mousemove', handlePointerMove);
    dom.addEventListener('mouseleave', handlePointerLeave);
    dom.addEventListener('touchstart', handlePointerMove);
    dom.addEventListener('touchmove', handlePointerMove);
    dom.addEventListener('touchend', handlePointerLeave);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      const delta = Math.min(clock.getDelta(), 0.03); // Cap delta

      // Smooth mouse interpolation
      if (targetMouse.x !== -999) {
        if (mouse.x === -999) {
          mouse.copy(targetMouse);
        } else {
          mouse.x += (targetMouse.x - mouse.x) * 0.12;
          mouse.y += (targetMouse.y - mouse.y) * 0.12;
        }
      } else {
        mouse.set(-999, -999);
      }

      // Rotate whole orb slowly
      points.rotation.y += 0.15 * delta;
      points.rotation.x = Math.sin(points.rotation.y * 0.5) * 0.15;

      // Project mouse coordinates to 3D space
      let mouse3D = null;
      if (mouse.x !== -999) {
        raycaster.setFromCamera(mouse, camera);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersectPoint);
        mouse3D = intersectPoint;
        // Invert points rotation to align coordinates
        mouse3D.applyEuler(new THREE.Euler(-points.rotation.x, -points.rotation.y, 0));
      }

      // Physics loop
      const positionsArray = particleGeometry.attributes.position.array;
      const repulsionRadius = 0.95;
      const repulsionStrength = 22.0;
      const springStrength = 4.2;
      const damping = 0.88;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Current coords
        let px = positionsArray[i3];
        let py = positionsArray[i3 + 1];
        let pz = positionsArray[i3 + 2];

        // Target original positions
        const tx = originalPositions[i3];
        const ty = originalPositions[i3 + 1];
        const tz = originalPositions[i3 + 2];

        // Fetch velocities
        let vx = velocities[i3];
        let vy = velocities[i3 + 1];
        let vz = velocities[i3 + 2];

        // 1. Repulsion from pointer
        if (mouse3D) {
          const dx = px - mouse3D.x;
          const dy = py - mouse3D.y;
          const dz = pz - mouse3D.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < repulsionRadius && dist > 0.01) {
            const force = (repulsionRadius - dist) / repulsionRadius * repulsionStrength;
            // Push direction
            vx += (dx / dist) * force * delta;
            vy += (dy / dist) * force * delta;
            vz += (dz / dist) * force * delta;
          }
        }

        // 2. Spring pull to target position
        const sx = (tx - px) * springStrength;
        const sy = (ty - py) * springStrength;
        const sz = (tz - pz) * springStrength;

        vx += sx * delta;
        vy += sy * delta;
        vz += sz * delta;

        // 3. Damping and Integration
        vx *= damping;
        vy *= damping;
        vz *= damping;

        px += vx;
        py += vy;
        pz += vz;

        // Update positions
        positionsArray[i3] = px;
        positionsArray[i3 + 1] = py;
        positionsArray[i3 + 2] = pz;

        // Save velocities
        velocities[i3] = vx;
        velocities[i3 + 1] = vy;
        velocities[i3 + 2] = vz;
      }

      particleGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (dom) {
        dom.removeEventListener('mousemove', handlePointerMove);
        dom.removeEventListener('mouseleave', handlePointerLeave);
        dom.removeEventListener('touchstart', handlePointerMove);
        dom.removeEventListener('touchmove', handlePointerMove);
        dom.removeEventListener('touchend', handlePointerLeave);
      }
      material.dispose();
      texture.dispose();
      particleGeometry.dispose();
      renderer.dispose();
      if (dom && renderer.domElement.parentNode) {
        dom.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'auto',
        touchAction: 'none'
      }} 
    />
  );
}
