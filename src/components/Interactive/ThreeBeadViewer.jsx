import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const beadTypes = {
  1: {
    name: "1 Mukhi (Kaju / Half-Moon)",
    rarity: "Extremely Rare",
    planet: "Sun (Surya)",
    desc: "The legendary single-furrow bead, naturally shaped like a crescent moon (Kaju-dana). Carries the direct blessing of Lord Shiva."
  },
  14: {
    name: "14 Mukhi (Deva Mani)",
    rarity: "Collector Grade",
    planet: "Saturn (Shani)",
    desc: "Derived from the third eye of Shiva. Awakens strong intuition, supreme courage, and total protection from negative influences."
  },
  21: {
    name: "21 Mukhi (Kubera Bead)",
    rarity: "Ultimate Treasure",
    planet: "Wealth Lord (Kubera)",
    desc: "The rarest of all Rudrakshas, representing Lord Kubera himself. Bestows unimaginable prosperity, luck, and global influence."
  }
};

export default function ThreeBeadViewer() {
  const containerRef = useRef(null);
  const [selectedMukhi, setSelectedMukhi] = useState(1);
  const selectedMukhiRef = useRef(selectedMukhi);

  useEffect(() => {
    selectedMukhiRef.current = selectedMukhi;
  }, [selectedMukhi]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 320;
    const height = containerRef.current.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc49a3c, 1.5);
    dirLight2.position.set(-5, -2, 3);
    scene.add(dirLight2);

    // Group for the bead and orbit rings
    const viewerGroup = new THREE.Group();
    scene.add(viewerGroup);

    // Group for bead specifically (so we can rotate it dynamically)
    const beadGroup = new THREE.Group();
    viewerGroup.add(beadGroup);

    // Golden Orbit Ring
    const orbitGeometry = new THREE.RingGeometry(1.6, 1.62, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xc49a3c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitRing.rotation.x = Math.PI / 2.3;
    viewerGroup.add(orbitRing);

    // Mini Orbit nodes
    const nodeGeom = new THREE.SphereGeometry(0.03, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffe082 });
    const orbitNodes = [];
    const nodeCount = 3;
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      viewerGroup.add(node);
      orbitNodes.push(node);
    }

    // Material for the Rudraksha bead
    const beadMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e4726,
      roughness: 0.85,
      metalness: 0.05,
      bumpScale: 0.05
    });

    // We build 3 distinct geometries for the three types
    const buildBeadGeometry = (mukhi) => {
      const geometry = new THREE.SphereGeometry(1.0, 64, 64);
      const posAttr = geometry.attributes.position;
      const tempV = new THREE.Vector3();

      for (let i = 0; i < posAttr.count; i++) {
        tempV.fromBufferAttribute(posAttr, i);
        const theta = Math.atan2(tempV.z, tempV.x);
        const phi = Math.acos(tempV.y / tempV.length());

        if (mukhi === 1) {
          // Kaju Shape: Bend the sphere into a crescent bean
          const bend = Math.sin(phi) * 0.45;
          tempV.x = tempV.x * (1.25 - bend * 0.3) + bend * 0.55;
          tempV.y = tempV.y * 0.95;
          tempV.z = tempV.z * (0.8 - Math.sin(phi) * 0.1);

          // Add a single dominant Mukhi line
          const groove = Math.abs(Math.sin(theta)) < 0.1 ? -0.06 : 0;
          tempV.multiplyScalar(1.0 + groove);
        } else {
          // 14 or 21 Mukhi: Procedural lobes and ridges
          const ridgeCount = mukhi;
          const groove = Math.sin(theta * ridgeCount) * 0.08;
          const noise = Math.sin(theta * 20) * Math.cos(phi * 20) * 0.03 + Math.sin(phi * 12) * 0.02;
          
          const scale = 1.05 - Math.abs(groove) + noise;
          tempV.multiplyScalar(scale);
        }

        posAttr.setXYZ(i, tempV.x, tempV.y, tempV.z);
      }
      geometry.computeVertexNormals();
      return geometry;
    };

    // Instantiate geometries
    const geometries = {
      1: buildBeadGeometry(1),
      14: buildBeadGeometry(14),
      21: buildBeadGeometry(21)
    };

    // Initial mesh creation
    let currentBeadMesh = new THREE.Mesh(geometries[selectedMukhiRef.current], beadMaterial);
    beadGroup.add(currentBeadMesh);

    // Thread running through
    const threadGeom = new THREE.CylinderGeometry(0.015, 0.015, 2.6, 8);
    const threadMat = new THREE.MeshBasicMaterial({ color: 0xc49a3c });
    const threadMesh = new THREE.Mesh(threadGeom, threadMat);
    beadGroup.add(threadMesh);

    // Track dynamic changes
    let activeMukhi = selectedMukhiRef.current;

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
    const clock = new THREE.Clock();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      const elapsedTime = clock.getElapsedTime();

      // Check if selected mukhi count changed
      if (selectedMukhiRef.current !== activeMukhi) {
        activeMukhi = selectedMukhiRef.current;
        beadGroup.remove(currentBeadMesh);
        currentBeadMesh = new THREE.Mesh(geometries[activeMukhi], beadMaterial);
        beadGroup.add(currentBeadMesh);
      }

      // Auto rotation of bead when not dragging
      if (!isDragging) {
        beadGroup.rotation.y += 0.005;
      }

      // Spin orbit ring slowly
      orbitRing.rotation.z = elapsedTime * 0.15;

      // Position nodes along the orbit ring
      orbitNodes.forEach((node, idx) => {
        const offset = (idx * Math.PI * 2) / nodeCount;
        const angle = elapsedTime * 0.35 + offset;
        const radius = 1.6;
        
        // Compute position on tilted ring plane
        const px = radius * Math.cos(angle);
        const pz = radius * Math.sin(angle);
        
        const pos = new THREE.Vector3(px, 0, pz);
        pos.applyMatrix4(orbitRing.matrixWorld);
        node.position.copy(pos);
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
      Object.values(geometries).forEach(g => g.dispose());
      beadMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      threadGeom.dispose();
      threadMat.dispose();
      renderer.dispose();
      if (dom && renderer.domElement.parentNode) {
        dom.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="three-bead-viewer-wrapper">
      <div className="three-bead-canvas-container" ref={containerRef}>
        <div className="orbit-hint">✦ Drag to orbit in 3D ✦</div>
      </div>

      {/* Rarity Tabs */}
      <div className="bead-type-tabs">
        {Object.keys(beadTypes).map((key) => (
          <button 
            key={key} 
            className={`bead-tab-btn ${selectedMukhi === Number(key) ? 'active' : ''}`}
            onClick={() => setSelectedMukhi(Number(key))}
          >
            {key} Mukhi
          </button>
        ))}
      </div>

      {/* Specifications Explainer */}
      <div className="bead-specs-box">
        <div className="spec-meta">
          <span className="meta-badge">{beadTypes[selectedMukhi].rarity}</span>
          <span className="meta-label">Ruling Planet: <strong>{beadTypes[selectedMukhi].planet}</strong></span>
        </div>
        <h4>{beadTypes[selectedMukhi].name}</h4>
        <p>{beadTypes[selectedMukhi].desc}</p>
        
        <div className="bead-action-row">
          <button className="btn-gold-sm" onClick={() => alert("Our curators will connect with you via WhatsApp/Email shortly.")}>Inquire Availability</button>
          <a href="#s-siddha-mala" className="btn-outline-sm">View Combinations</a>
        </div>
      </div>
    </div>
  );
}
