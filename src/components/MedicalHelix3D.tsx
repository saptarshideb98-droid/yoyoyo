import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  Dna,
  Orbit,
  Cpu,
  Pause,
  Play,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export type VisualPreset = 'helix' | 'lattice' | 'core';

interface MedicalHelix3DProps {
  activePreset?: VisualPreset;
  onSelectCategory?: (categoryId: string) => void;
}

// Reusable module-scope math objects to ensure zero GC inside the render loop
const _dummyObj = new THREE.Object3D();
const _vec3 = new THREE.Vector3();
const _color = new THREE.Color();

export const MedicalHelix3D: React.FC<MedicalHelix3DProps> = ({
  activePreset: initialPreset = 'helix',
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [preset, setPreset] = useState<VisualPreset>(initialPreset);
  const [isRotating, setIsRotating] = useState(true);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const presetRef = useRef<VisualPreset>(preset);
  const isRotatingRef = useRef<boolean>(isRotating);
  const pointerTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    presetRef.current = preset;
  }, [preset]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Detect software WebGL (SwiftShader / llvmpipe / Basic Render)
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl =
          probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = Math.max(280, container.clientWidth || 520);
    const height = Math.max(280, container.clientHeight || 420);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear container and mount canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Scene, Fog & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06101f, 0.045);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 9.2);
    camera.lookAt(0, -0.2, 0);

    // 3. Studio Environment Reflection via RoomEnvironment + PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // 4. Balanced 3-Point Studio Lighting Rig (Warm Key + Cool Hemisphere + Cyan Rim)
    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x051329, 1.1);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(5, 7, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 20;
      const d = 5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x06b6d4, 3.2, 18);
    rimLight.position.set(-5, 2.5, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x10b981, 2.0, 15);
    fillLight.position.set(4, -3, 3);
    scene.add(fillLight);

    // 5. Composite Multi-Part Procedural 3D Molecular & DNA Sculpture (THREE.Group)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Part A: Dual Helical Backbones using TubeGeometry along parametric 3D curves
    const helixTurns = 2.2;
    const helixHeight = 4.6;
    const helixRadius = 1.25;
    const curvePointsA: THREE.Vector3[] = [];
    const curvePointsB: THREE.Vector3[] = [];
    const sampleCount = 64;

    for (let i = 0; i <= sampleCount; i++) {
      const t = i / sampleCount;
      const angle = t * Math.PI * 2 * helixTurns;
      const y = (t - 0.5) * helixHeight;
      curvePointsA.push(
        new THREE.Vector3(
          Math.cos(angle) * helixRadius,
          y,
          Math.sin(angle) * helixRadius
        )
      );
      curvePointsB.push(
        new THREE.Vector3(
          Math.cos(angle + Math.PI) * helixRadius,
          y,
          Math.sin(angle + Math.PI) * helixRadius
        )
      );
    }

    const curveA = new THREE.CatmullRomCurve3(curvePointsA);
    const curveB = new THREE.CatmullRomCurve3(curvePointsB);

    const tubeGeoA = new THREE.TubeGeometry(curveA, 72, 0.075, 16, false);
    const tubeGeoB = new THREE.TubeGeometry(curveB, 72, 0.075, 16, false);

    const strandMatA = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.78,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      emissive: 0x0284c7,
      emissiveIntensity: 0.22,
    });

    const strandMatB = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.72,
      roughness: 0.44, // varied roughness >= 0.25 from adjacent part
      clearcoat: 0.9,
      clearcoatRoughness: 0.2,
      emissive: 0x059669,
      emissiveIntensity: 0.2,
    });

    const strandMeshA = new THREE.Mesh(tubeGeoA, strandMatA);
    const strandMeshB = new THREE.Mesh(tubeGeoB, strandMatB);
    rootGroup.add(strandMeshA, strandMeshB);

    // Part B: Instanced Base-Pair Rungs & Nucleotide Nodes (> 20 repeated elements)
    const rungCount = 22;
    const rungGeo = new THREE.CylinderGeometry(0.032, 0.032, helixRadius * 2, 12);
    rungGeo.rotateZ(Math.PI / 2);
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      metalness: 0.85,
      roughness: 0.22,
    });
    const rungInstanced = new THREE.InstancedMesh(rungGeo, rungMat, rungCount);

    const nodeGeo = new THREE.SphereGeometry(0.135, 18, 18);
    const nodeMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      metalness: 0.45,
      roughness: 0.15,
      clearcoat: 1.0,
      emissive: 0x0891b2,
      emissiveIntensity: 0.35,
    });
    const nodeInstanced = new THREE.InstancedMesh(
      nodeGeo,
      nodeMat,
      rungCount * 2
    );

    const paletteColors = [0x38bdf8, 0x10b981, 0x06b6d4, 0x60a5fa];

    for (let i = 0; i < rungCount; i++) {
      const t = (i + 0.5) / rungCount;
      const angle = t * Math.PI * 2 * helixTurns;
      const y = (t - 0.5) * helixHeight;

      // Rung connecting strand A and B
      _dummyObj.position.set(0, y, 0);
      _dummyObj.rotation.set(0, -angle, 0);
      _dummyObj.scale.set(1, 1, 1);
      _dummyObj.updateMatrix();
      rungInstanced.setMatrixAt(i, _dummyObj.matrix);
      _color.setHex(paletteColors[i % paletteColors.length]);
      rungInstanced.setColorAt(i, _color);

      // Node on strand A
      const sA = 0.92 + (i % 3) * 0.08;
      _dummyObj.position.set(
        Math.cos(angle) * helixRadius,
        y,
        Math.sin(angle) * helixRadius
      );
      _dummyObj.rotation.set(0, 0, 0);
      _dummyObj.scale.setScalar(sA);
      _dummyObj.updateMatrix();
      nodeInstanced.setMatrixAt(i * 2, _dummyObj.matrix);
      _color.setHex(0x38bdf8);
      nodeInstanced.setColorAt(i * 2, _color);

      // Node on strand B
      _dummyObj.position.set(
        Math.cos(angle + Math.PI) * helixRadius,
        y,
        Math.sin(angle + Math.PI) * helixRadius
      );
      _dummyObj.scale.setScalar(sA);
      _dummyObj.updateMatrix();
      nodeInstanced.setMatrixAt(i * 2 + 1, _dummyObj.matrix);
      _color.setHex(0x10b981);
      nodeInstanced.setColorAt(i * 2 + 1, _color);
    }

    rungInstanced.instanceMatrix.needsUpdate = true;
    if (rungInstanced.instanceColor)
      rungInstanced.instanceColor.needsUpdate = true;
    rungInstanced.computeBoundingSphere();

    nodeInstanced.instanceMatrix.needsUpdate = true;
    if (nodeInstanced.instanceColor)
      nodeInstanced.instanceColor.needsUpdate = true;
    nodeInstanced.computeBoundingSphere();

    rootGroup.add(rungInstanced, nodeInstanced);

    // Part C: Diagnostic Gyroscope Orbital Rings & Core Medical Cross Crystal
    const orbitalGroup = new THREE.Group();
    rootGroup.add(orbitalGroup);

    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.024, 16, 96);
    const ringGeo2 = new THREE.TorusGeometry(2.68, 0.018, 16, 96);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.92,
      roughness: 0.16,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25,
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      metalness: 0.85,
      roughness: 0.45,
      emissive: 0x0d9488,
      emissiveIntensity: 0.18,
    });

    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.set(Math.PI / 2.8, 0.3, 0);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.set(-Math.PI / 3.2, -0.4, 0.2);
    orbitalGroup.add(ringMesh1, ringMesh2);

    // Central Diagnostic Core (3D Beveled Medical Cross + Optical Shell)
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    const crossArmVertGeo = new THREE.BoxGeometry(0.36, 1.12, 0.36);
    const crossArmHorizGeo = new THREE.BoxGeometry(1.12, 0.36, 0.36);
    const crossArmDepthGeo = new THREE.BoxGeometry(0.36, 0.36, 1.12);
    const coreCrossMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.65,
      roughness: 0.18,
      clearcoat: 1.0,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
    });
    const crossV = new THREE.Mesh(crossArmVertGeo, coreCrossMat);
    const crossH = new THREE.Mesh(crossArmHorizGeo, coreCrossMat);
    const crossD = new THREE.Mesh(crossArmDepthGeo, coreCrossMat);
    coreGroup.add(crossV, crossH, crossD);

    const shellGeo = new THREE.OctahedronGeometry(0.95, 1);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x7dd3fc,
      metalness: 0.1,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.28 : 1,
      ior: 1.52,
      thickness: 1.2,
      clearcoat: 1.0,
      depthWrite: false,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    shellMesh.renderOrder = 2;
    coreGroup.add(shellMesh);

    // Part D: Floating Molecular Lattice Satellites (InstancedMesh of 36 octahedrons)
    const satCount = 36;
    const satGeo = new THREE.OctahedronGeometry(0.075, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.3,
    });
    const satInstanced = new THREE.InstancedMesh(satGeo, satMat, satCount);
    for (let i = 0; i < satCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / satCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.85 + (i % 3) * 0.32;
      _dummyObj.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.85,
        r * Math.sin(phi) * Math.sin(theta)
      );
      _dummyObj.rotation.set(i * 0.4, i * 0.7, 0);
      const scale = 0.75 + (i % 4) * 0.18;
      _dummyObj.scale.setScalar(scale);
      _dummyObj.updateMatrix();
      satInstanced.setMatrixAt(i, _dummyObj.matrix);
    }
    satInstanced.instanceMatrix.needsUpdate = true;
    satInstanced.computeBoundingSphere();
    rootGroup.add(satInstanced);

    // Part E: Grounding Contact Shadow Plane beneath the sculpture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 6, 64, 64, 60);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
      grad.addColorStop(0.5, 'rgba(2, 12, 27, 0.45)');
      grad.addColorStop(1, 'rgba(2, 12, 27, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowPlaneGeo = new THREE.PlaneGeometry(5.6, 5.6);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.85;
    scene.add(shadowPlane);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. Software-WebGL Safe Animation Loop with Exponential Damping
    let frameId = 0;
    let isDisposed = false;
    let lastTimeMs = performance.now();
    const startTimeMs = lastTimeMs;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    let spinAngle = 0.35;

    function tick() {
      if (isDisposed) return;
      const nowMs = performance.now();
      const dt = Math.min(Math.max((nowMs - lastTimeMs) / 1000, 0.001), 0.1);
      lastTimeMs = nowMs;
      const elapsed = (nowMs - startTimeMs) / 1000;

      const activeMode = presetRef.current;
      const helixScaleTarget =
        activeMode === 'helix' ? 1 : activeMode === 'lattice' ? 0.72 : 0.25;
      const coreScaleTarget =
        activeMode === 'core' ? 1.55 : activeMode === 'lattice' ? 1.15 : 0.65;
      const satScaleTarget =
        activeMode === 'lattice' ? 1.22 : activeMode === 'core' ? 1.08 : 0.92;

      const sHelix = THREE.MathUtils.damp(
        strandMeshA.scale.x,
        helixScaleTarget,
        5,
        dt
      );
      strandMeshA.scale.setScalar(sHelix);
      strandMeshB.scale.setScalar(sHelix);
      rungInstanced.scale.setScalar(sHelix);
      nodeInstanced.scale.setScalar(sHelix);

      const sCore = THREE.MathUtils.damp(
        coreGroup.scale.x,
        coreScaleTarget,
        5,
        dt
      );
      coreGroup.scale.setScalar(sCore);

      const sSat = THREE.MathUtils.damp(
        satInstanced.scale.x,
        satScaleTarget,
        5,
        dt
      );
      satInstanced.scale.setScalar(sSat);

      if (isRotatingRef.current && !prefersReducedMotion) {
        spinAngle += dt * 0.42;
      }

      const targetRotY = spinAngle + pointerTargetRef.current.x * 0.55;
      const targetRotX = pointerTargetRef.current.y * 0.32;

      rootGroup.rotation.y = THREE.MathUtils.damp(
        rootGroup.rotation.y,
        targetRotY,
        4.5,
        dt
      );
      rootGroup.rotation.x = THREE.MathUtils.damp(
        rootGroup.rotation.x,
        targetRotX,
        4.5,
        dt
      );

      ringMesh1.rotation.z = elapsed * 0.28;
      ringMesh2.rotation.y = -elapsed * 0.22;
      coreGroup.rotation.y = -elapsed * 0.5;
      coreGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.18;

      renderer.render(scene, camera);

      if (prefersReducedMotion) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    tick();

    const handleResize = () => {
      if (!container || isDisposed) return;
      const nextW = Math.max(260, container.clientWidth);
      const nextH = Math.max(260, container.clientHeight);
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH);
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);

      // Clean up geometries, materials, and textures
      tubeGeoA.dispose();
      tubeGeoB.dispose();
      strandMatA.dispose();
      strandMatB.dispose();
      rungGeo.dispose();
      rungMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      crossArmVertGeo.dispose();
      crossArmHorizGeo.dispose();
      crossArmDepthGeo.dispose();
      coreCrossMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      shadowTex.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerTargetRef.current = { x: nx, y: ny };
  };

  const handlePointerLeave = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
  };

  // Graceful SVG fallback if WebGL is disabled on device
  if (!webglSupported) {
    return (
      <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl border border-cyan-500/25 bg-[#06101F] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <Dna className="w-16 h-16 text-cyan-400 mb-3" aria-hidden="true" />
        <p className="font-heading text-lg text-white">
          Molecular Diagnostics &amp; Multi-Speciality Care
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Interactive 3D Visualization · MAZUMDER Medical Hall
        </p>
      </div>
    );
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[340px] sm:h-[410px] rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-[#071326] via-[#050D1A] to-[#030811] overflow-hidden shadow-[0_20px_50px_rgba(2,12,27,0.75)] select-none"
    >
      {/* Top-Left Minimal Spec Badge (Unobstructed 3D Center) */}
      <div className="pointer-events-none absolute top-3.5 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-lg bg-[#071527]/90 border border-cyan-500/25 text-[11px] font-medium text-cyan-300 tracking-wider uppercase">
        <Dna className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
        <span>3D Bio-Diagnostic Core</span>
      </div>

      {/* Dedicated Isolated WebGL Canvas Mount */}
      <div
        ref={canvasMountRef}
        aria-label="Interactive 3D Molecular Helix and Diagnostic Visualization"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Unified Collapsible Bottom Control Dock (No backdrop-filter over WebGL) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center max-w-[94%] w-auto">
        <button
          type="button"
          onClick={() => setDockCollapsed((prev) => !prev)}
          aria-expanded={!dockCollapsed}
          aria-label={dockCollapsed ? 'Show 3D controls' : 'Hide 3D controls'}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-t-lg bg-[#08172B] border border-b-0 border-cyan-500/30 text-[10px] font-medium text-cyan-300 hover:text-white transition-colors"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3" aria-hidden="true" />
              <span>3D View</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" aria-hidden="true" />
              <span>Hide</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div
            role="toolbar"
            aria-label="3D Visualization Mode Controls"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#08172B] border border-cyan-500/30 shadow-lg"
          >
            <button
              type="button"
              onClick={() => setPreset('helix')}
              aria-pressed={preset === 'helix'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                preset === 'helix'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Dna className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>DNA Helix</span>
            </button>

            <button
              type="button"
              onClick={() => setPreset('lattice')}
              aria-pressed={preset === 'lattice'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                preset === 'lattice'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Orbit className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>Molecular</span>
            </button>

            <button
              type="button"
              onClick={() => setPreset('core')}
              aria-pressed={preset === 'core'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                preset === 'core'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Cpu className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>Core</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRotating((prev) => !prev)}
              aria-label={isRotating ? 'Pause 3D rotation' : 'Resume 3D rotation'}
              title={isRotating ? 'Pause rotation' : 'Resume rotation'}
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-cyan-500/25 bg-[#0D213B] text-cyan-300 hover:text-white transition-colors"
            >
              {isRotating ? (
                <Pause className="w-3 h-3" aria-hidden="true" />
              ) : (
                <Play className="w-3 h-3" aria-hidden="true" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHelix3D;
