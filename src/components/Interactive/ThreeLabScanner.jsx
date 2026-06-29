import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const anatomicalParts = {
  shell: {
    title: "Endocarp (Outer Shell)",
    desc: "The protective outer casing displaying natural Mukhi ridges and organic protective textures."
  },
  canal: {
    title: "Central Core (Sushumna Path)",
    desc: "The natural central cavity running top-to-bottom, acting as the energetic spinal axis."
  },
  chambers: {
    title: "Locule Cavities (Seed Chambers)",
    desc: "Symmetrical internal chambers that house the seeds. A genuine bead has exactly one chamber per Mukhi."
  },
  seeds: {
    title: "Spiritual Seeds (Nucleus)",
    desc: "The biological life force inside the compartments containing the sacred energetic blueprint."
  }
};

export default function ThreeLabScanner() {
  const containerRef = useRef(null);
  const [scanProgress, setScanProgress] = useState(50); // 0 (natural) to 100 (full X-Ray)
  const [selectedPart, setSelectedPart] = useState('shell');

  // Keep progress in a ref to avoid recreating the effect loop
  const progressRef = useRef(scanProgress);
  useEffect(() => {
    progressRef.current = scanProgress;
  }, [scanProgress]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 320;
    const height = containerRef.current.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff0dd, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00d2ff, 1.5);
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    // 1. Group for outer/inner components to rotate together
    const beadGroup = new THREE.Group();
    scene.add(beadGroup);

    // 2. Build Outer Shell (Solid Rudraksha Mesh)
    const shellGeometry = new THREE.SphereGeometry(1.3, 64, 64);
    
    // Add procedural displacement directly to geometry vertices for ridges
    const posAttr = shellGeometry.attributes.position;
    const tempV = new THREE.Vector3();
    for (let i = 0; i < posAttr.count; i++) {
      tempV.fromBufferAttribute(posAttr, i);
      const theta = Math.atan2(tempV.z, tempV.x);
      const phi = Math.acos(tempV.y / tempV.length());
      
      const mukhiLines = 5;
      const groove = Math.sin(theta * mukhiLines) * 0.12;
      const noise = Math.sin(theta * 18) * Math.cos(phi * 18) * 0.05 + Math.sin(phi * 8) * 0.03;
      
      const scale = 1 - Math.abs(groove) + noise;
      tempV.multiplyScalar(scale);
      posAttr.setXYZ(i, tempV.x, tempV.y, tempV.z);
    }
    shellGeometry.computeVertexNormals();

    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 1.0
    });
    const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
    beadGroup.add(shellMesh);

    // 3. Build Outer Shell Wireframe (Hologram look)
    const shellWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.0
    });
    const shellWireframe = new THREE.Mesh(shellGeometry, shellWireframeMaterial);
    beadGroup.add(shellWireframe);

    // 4. Build Internal Sushumna Canal (Central cylinder)
    const canalGeom = new THREE.CylinderGeometry(0.12, 0.12, 2.2, 16);
    const canalMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x0055ff,
      transparent: true,
      opacity: 0.2
    });
    const canalMesh = new THREE.Mesh(canalGeom, canalMat);
    beadGroup.add(canalMesh);

    // 5. Build Locule Chambers (5 compartments)
    const chambers = [];
    const seeds = [];
    const chamberCount = 5;
    
    for (let i = 0; i < chamberCount; i++) {
      const angle = (i * Math.PI * 2) / chamberCount;
      const radius = 0.58;
      const cx = radius * Math.cos(angle);
      const cz = radius * Math.sin(angle);
      
      // Chamber Mesh (Capsule/Sphere container)
      const chamberGeom = new THREE.SphereGeometry(0.24, 16, 16);
      chamberGeom.scale(1, 2.2, 1);
      const chamberMat = new THREE.MeshStandardMaterial({
        color: 0x00aaff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const chamberMesh = new THREE.Mesh(chamberGeom, chamberMat);
      chamberMesh.position.set(cx, 0, cz);
      chamberMesh.rotation.y = -angle;
      beadGroup.add(chamberMesh);
      chambers.push(chamberMesh);

      // Seed Mesh (inside chamber)
      const seedGeom = new THREE.SphereGeometry(0.12, 16, 16);
      seedGeom.scale(1, 1.6, 1);
      const seedMat = new THREE.MeshStandardMaterial({
        color: 0xffddaa,
        emissive: 0x552200,
        transparent: true,
        opacity: 0.2
      });
      const seedMesh = new THREE.Mesh(seedGeom, seedMat);
      seedMesh.position.set(cx, 0, cz);
      beadGroup.add(seedMesh);
      seeds.push(seedMesh);
    }

    // Drag Interaction Logic
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      beadGroup.rotation.y += deltaX * 0.008;
      beadGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = containerRef.current;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('mousemove', handlePointerMove);
    dom.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown);
    dom.addEventListener('touchmove', handlePointerMove);
    dom.addEventListener('touchend', handlePointerUp);

    // Animation loop
    let animationFrameId;
    
    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      // Auto rotation when not dragging
      if (!isDragging) {
        beadGroup.rotation.y += 0.006;
      }

      // Update materials opacity based on scan progress slider
      const p = progressRef.current / 100; // 0 to 1

      // Shell goes from solid to translucent wireframe
      shellMaterial.opacity = 1.0 - p * 0.88;
      shellWireframeMaterial.opacity = p * 0.65;

      // Internal elements light up
      canalMat.opacity = 0.2 + p * 0.7;
      chambers.forEach(c => {
        c.material.opacity = 0.1 + p * 0.55;
      });
      seeds.forEach(s => {
        s.material.opacity = 0.15 + p * 0.75;
      });

      renderer.render(scene, camera);
    };

    tick();

    // Resize observer
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
        dom.removeEventListener('mousedown', handlePointerDown);
        dom.removeEventListener('mousemove', handlePointerMove);
        dom.removeEventListener('mouseup', handlePointerUp);
        dom.removeEventListener('touchstart', handlePointerDown);
        dom.removeEventListener('touchmove', handlePointerMove);
        dom.removeEventListener('touchend', handlePointerUp);
      }
      shellGeometry.dispose();
      shellMaterial.dispose();
      shellWireframeMaterial.dispose();
      canalGeom.dispose();
      canalMat.dispose();
      renderer.dispose();
      if (dom && renderer.domElement.parentNode) {
        dom.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="lab-scanner-wrapper">
      <div className="lab-scanner-canvas-container" ref={containerRef}>
        {/* Holographic scanner crosshair overlay */}
        <div className="scanner-crosshair" />
        <div className="scanner-line-glow" style={{ top: `${scanProgress}%` }} />
      </div>

      {/* Control Dial Slider */}
      <div className="scanner-control-bar">
        <span className="slider-label left">Natural</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={scanProgress}
          onChange={(e) => setScanProgress(Number(e.target.value))}
          className="scanner-range-input" 
        />
        <span className="slider-label right">Digital X-Ray</span>
      </div>

      {/* Interactive Explainer Section */}
      <div className="scanner-selector-grid">
        {Object.keys(anatomicalParts).map((key) => (
          <button 
            key={key} 
            className={`scanner-tab-btn ${selectedPart === key ? 'active' : ''}`}
            onClick={() => setSelectedPart(key)}
          >
            {key === 'shell' && "Outer Shell"}
            {key === 'canal' && "Central Canal"}
            {key === 'chambers' && "Seed Chambers"}
            {key === 'seeds' && "Sacred Seeds"}
          </button>
        ))}
      </div>

      <div className="scanner-info-box">
        <h4>{anatomicalParts[selectedPart].title}</h4>
        <p>{anatomicalParts[selectedPart].desc}</p>
      </div>
    </div>
  );
}
