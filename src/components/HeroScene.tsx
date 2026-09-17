"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LABELS = ["SEARCH", "AI", "TRUST", "AUTHORITY", "VISIBILITY", "IP", "REACH"];

function Nodes() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const pts: { pos: [number, number, number]; yellow: boolean }[] = [];
    const count = 46;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.55;
      pts.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        yellow: i % 9 === 0,
      });
    }
    return pts;
  }, []);

  const lines = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      // deterministic pseudo-random selection so render stays pure
      const seeded = Math.sin(i * 12.9898) * 43758.5453;
      const pseudoRandom = seeded - Math.floor(seeded);
      if (pseudoRandom > 0.55) {
        const a = new THREE.Vector3(...nodes[i].pos);
        const next = nodes[(i + 7) % nodes.length];
        const b = new THREE.Vector3(...next.pos);
        segs.push([a, b]);
      }
    }
    return segs;
  }, [nodes]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.6, 48, 48]} />
        <meshPhysicalMaterial
          color="#eaf3ff"
          transparent
          opacity={0.12}
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={0.6}
          clearcoat={1}
        />
      </mesh>

      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.yellow ? 0.035 : 0.02, 12, 12]} />
          <meshStandardMaterial
            color={n.yellow ? "#ffd43b" : "#2f80ff"}
            emissive={n.yellow ? "#ffd43b" : "#145cff"}
            emissiveIntensity={n.yellow ? 1.4 : 0.8}
          />
        </mesh>
      ))}

      {lines.map(([a, b], i) => (
        <line key={i}>
          <bufferGeometry
            attach="geometry"
            onUpdate={(geo) => geo.setFromPoints([a, b])}
          />
          <lineBasicMaterial attach="material" color="#2f80ff" transparent opacity={0.25} />
        </line>
      ))}
    </group>
  );
}

function RigCamera({ mouse }: { mouse: { x: number; y: number } }) {
  useFrame((state) => {
    state.camera.position.x += (mouse.x * 0.6 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-mouse.y * 0.4 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-soft-blue)] to-white">
        <div className="eyebrow text-royal">AUTHORITY NETWORK</div>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-square w-full"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        });
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setFailed(true);
            },
            false
          );
        }}
        onError={() => setFailed(true)}
        dpr={[1, 1.75]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#2f80ff" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#ffd43b" />
        <Suspense fallback={null}>
          <Nodes />
        </Suspense>
        <RigCamera mouse={mouse} />
      </Canvas>

      {LABELS.map((label, i) => {
        const angle = (i / LABELS.length) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * 44;
        const y = 50 + Math.sin(angle) * 44;
        return (
          <div
            key={label}
            className="glass eyebrow absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-navy/70"
            style={{ left: `${x}%`, top: `${y}%`, animation: `float 6s ease-in-out ${i * 0.4}s infinite` }}
          >
            {label}
          </div>
        );
      })}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
