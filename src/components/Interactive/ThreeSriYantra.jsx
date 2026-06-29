import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeSriYantra({ size = 280 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = size;
    const height = size;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.6, 5);
    camera.lookAt(0, 0.8, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Group for rotation
    const yantraGroup = new THREE.Group();
    scene.add(yantraGroup);

    // Gold material for wireframe lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc49a3c,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    // Helper to add lines to group
    const addLineLoop = (points) => {
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.LineLoop(geom, lineMaterial);
      yantraGroup.add(line);
    };

    const addLine = (points) => {
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geom, lineMaterial);
      yantraGroup.add(line);
    };

    // 1. Draw Bhupura (Square Base at y = 0)
    const basePts = [];
    const rBase = 1.6;
    // Square with gate cuts
    basePts.push(new THREE.Vector3(-rBase, 0, -rBase));
    basePts.push(new THREE.Vector3(-0.3, 0, -rBase));
    basePts.push(new THREE.Vector3(-0.3, 0, -rBase + 0.2));
    basePts.push(new THREE.Vector3(0.3, 0, -rBase + 0.2));
    basePts.push(new THREE.Vector3(0.3, 0, -rBase));
    basePts.push(new THREE.Vector3(rBase, 0, -rBase));
    
    basePts.push(new THREE.Vector3(rBase, 0, -0.3));
    basePts.push(new THREE.Vector3(rBase - 0.2, 0, -0.3));
    basePts.push(new THREE.Vector3(rBase - 0.2, 0, 0.3));
    basePts.push(new THREE.Vector3(rBase, 0, 0.3));
    basePts.push(new THREE.Vector3(rBase, 0, rBase));
    
    basePts.push(new THREE.Vector3(0.3, 0, rBase));
    basePts.push(new THREE.Vector3(0.3, 0, rBase - 0.2));
    basePts.push(new THREE.Vector3(-0.3, 0, rBase - 0.2));
    basePts.push(new THREE.Vector3(-0.3, 0, rBase));
    basePts.push(new THREE.Vector3(-rBase, 0, rBase));
    
    basePts.push(new THREE.Vector3(-rBase, 0, 0.3));
    basePts.push(new THREE.Vector3(-rBase + 0.2, 0, 0.3));
    basePts.push(new THREE.Vector3(-rBase + 0.2, 0, -0.3));
    basePts.push(new THREE.Vector3(-rBase, 0, -0.3));
    
    addLineLoop(basePts);

    // 2. Draw Concentric Circles and Petals (y = 0.15 & y = 0.3)
    const drawCircle = (radius, y) => {
      const pts = [];
      const segments = 64;
      for (let i = 0; i < segments; i++) {
        const theta = (i * Math.PI * 2) / segments;
        pts.push(new THREE.Vector3(radius * Math.cos(theta), y, radius * Math.sin(theta)));
      }
      addLineLoop(pts);
    };

    drawCircle(1.3, 0.15); // Outer circle
    drawCircle(1.15, 0.22); // Inner circle

    // Draw Petals on Outer Circle
    const petalCount = 16;
    for (let i = 0; i < petalCount; i++) {
      const theta = (i * Math.PI * 2) / petalCount;
      const nextTheta = ((i + 1) * Math.PI * 2) / petalCount;
      const midTheta = (theta + nextTheta) / 2;
      const rOuter = 1.35;
      const rInner = 1.15;
      const y = 0.18;

      const p1 = new THREE.Vector3(rInner * Math.cos(theta), y, rInner * Math.sin(theta));
      const p2 = new THREE.Vector3(rOuter * Math.cos(midTheta), y + 0.05, rOuter * Math.sin(midTheta));
      const p3 = new THREE.Vector3(rInner * Math.cos(nextTheta), y, rInner * Math.sin(nextTheta));

      addLine([p1, p2, p3]);
    }

    // 3. Draw Interlocking 3D Triangles (Maha Meru Pyramids)
    // We define 5 tiers rising up to y = 1.6
    const tiers = [
      { y: 0.35, r: 0.95, count: 12 }, // Tier 1: Base ring
      { y: 0.65, r: 0.72, count: 10 }, // Tier 2
      { y: 0.95, r: 0.50, count: 8 },  // Tier 3
      { y: 1.25, r: 0.28, count: 6 },  // Tier 4
      { y: 1.55, r: 0.12, count: 3 }   // Tier 5: Central triad
    ];

    // Build the pyramids by creating interlocking upward and downward triangles
    tiers.forEach((tier, tIdx) => {
      const height = tier.y;
      const rad = tier.r;
      
      for (let i = 0; i < tier.count; i++) {
        const isUpward = i % 2 === 0;
        const baseAngle = (i * Math.PI * 2) / tier.count;
        
        // Compute 3 vertices for each triangle
        let p1, p2, p3;
        if (isUpward) {
          // Upward pointing triangle
          p1 = new THREE.Vector3(0, height + 0.2, rad * 1.1);
          p2 = new THREE.Vector3(rad * Math.cos(baseAngle - 0.4), height, rad * Math.sin(baseAngle - 0.4));
          p3 = new THREE.Vector3(rad * Math.cos(baseAngle + 0.4), height, rad * Math.sin(baseAngle + 0.4));
        } else {
          // Downward pointing triangle
          p1 = new THREE.Vector3(0, height - 0.1, -rad * 1.1);
          p2 = new THREE.Vector3(rad * Math.cos(baseAngle - 0.4), height, rad * Math.sin(baseAngle - 0.4));
          p3 = new THREE.Vector3(rad * Math.cos(baseAngle + 0.4), height, rad * Math.sin(baseAngle + 0.4));
        }
        
        // Add triangle
        addLineLoop([p1, p2, p3]);

        // Connect tiers together with vertical energy lines
        if (tIdx > 0) {
          const prevTier = tiers[tIdx - 1];
          const prevP = new THREE.Vector3(prevTier.r * Math.cos(baseAngle), prevTier.y, prevTier.r * Math.sin(baseAngle));
          const currP = new THREE.Vector3(rad * Math.cos(baseAngle), height, rad * Math.sin(baseAngle));
          addLine([prevP, currP]);
        }
      }
    });

    // 4. Bindu Apex (Central glowing point at the top)
    const apexGeom = new THREE.SphereGeometry(0.04, 8, 8);
    const apexMat = new THREE.MeshBasicMaterial({ color: 0xffe680 });
    const apexMesh = new THREE.Mesh(apexGeom, apexMat);
    apexMesh.position.set(0, 1.8, 0);
    yantraGroup.add(apexMesh);

    // Connect top tier to the apex Bindu
    const topTier = tiers[tiers.length - 1];
    for (let i = 0; i < topTier.count; i++) {
      const angle = (i * Math.PI * 2) / topTier.count;
      const p = new THREE.Vector3(topTier.r * Math.cos(angle), topTier.y, topTier.r * Math.sin(angle));
      addLine([p, new THREE.Vector3(0, 1.8, 0)]);
    }

    // 5. Golden Dust Particles (Star system revolving around Meru)
    const particleCount = 450;
    const pPositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.0 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = 0.2 + Math.random() * 1.5; // Stretched along height
      pPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Particle Canvas Texture programmatically
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 235, 170, 1)');
    grad.addColorStop(0.3, 'rgba(196, 154, 60, 0.6)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 0.1,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starParticles = new THREE.Points(pGeom, pMaterial);
    yantraGroup.add(starParticles);

    // Mouse interactive shift
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const dom = containerRef.current;
    dom.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      const delta = clock.getDelta();

      // Spin Sri Yantra slowly
      yantraGroup.rotation.y += 0.05 * Math.PI * delta;

      // Particle system wobble
      starParticles.rotation.y -= 0.02 * Math.PI * delta;

      // Apply subtle camera lag based on mouse hover
      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05;
      camera.position.y += ((2.6 + mouse.y * 0.5) - camera.position.y) * 0.05;
      camera.lookAt(0, 0.8, 0);

      renderer.render(scene, camera);
    };

    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (dom) {
        dom.removeEventListener('mousemove', handleMouseMove);
      }
      lineMaterial.dispose();
      apexGeom.dispose();
      apexMat.dispose();
      pGeom.dispose();
      pMaterial.dispose();
      pTexture.dispose();
      renderer.dispose();
      if (dom && renderer.domElement.parentNode) {
        dom.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div 
      className="three-sriyantra-canvas" 
      ref={containerRef} 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        margin: '0 auto', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} 
    />
  );
}
