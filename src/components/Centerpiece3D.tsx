"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/animations";

export function Centerpiece3D({
  interactive = true,
  className = "",
}: {
  interactive?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Master Group for mouse tilt and auto-rotation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Geodesic / Icosahedron faceted outer core
    const geoOuter = new THREE.IcosahedronGeometry(2.1, 1);
    const wireOuter = new THREE.WireframeGeometry(geoOuter);
    const lineMatOuter = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.65,
    });
    const lineOuter = new THREE.LineSegments(wireOuter, lineMatOuter);
    masterGroup.add(lineOuter);

    // 2. Inner faceted jewel core
    const geoInner = new THREE.OctahedronGeometry(1.3, 0);
    const wireInner = new THREE.WireframeGeometry(geoInner);
    const lineMatInner = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.9,
    });
    const lineInner = new THREE.LineSegments(wireInner, lineMatInner);
    masterGroup.add(lineInner);

    // 3. Floating vertex nodes
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = geoOuter.attributes.position.clone();
    nodeGeo.setAttribute("position", nodePos);
    const nodeMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    masterGroup.add(nodes);

    // 4. Orbiting rings (Cyber Gyroscope)
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    // 5. Background Ambient Particle Swarm
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer Tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.35;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        masterGroup.rotation.y += deltaX * 0.008;
        masterGroup.rotation.x += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion()) {
        if (!isDragging) {
          masterGroup.rotation.y += 0.28 * delta;
          masterGroup.rotation.x += 0.12 * delta;

          // Smooth pointer tilt interpolation
          masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
          masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;
        }

        // Counter-rotations for gyroscopes
        ring1.rotation.z += 0.35 * delta;
        ring2.rotation.x -= 0.45 * delta;
        lineInner.rotation.y -= 0.5 * delta;

        // Subtle pulsation / breathing
        const scale = 1 + Math.sin(elapsed * 1.8) * 0.03;
        lineInner.scale.set(scale, scale, scale);

        // Particle gentle drifting
        particles.rotation.y = elapsed * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js objects
      geoOuter.dispose();
      wireOuter.dispose();
      lineMatOuter.dispose();
      geoInner.dispose();
      wireInner.dispose();
      lineMatInner.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-hidden="true"
    />
  );
}
