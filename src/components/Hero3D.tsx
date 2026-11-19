import { Canvas, useFrame } from "@react-three/fiber";
import {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "../lib/motion";

type ColumnDef = {
  x: number;
  z: number;
  width: number;
  depth: number;
  heights: number[];
};

const COLUMNS: ColumnDef[] = [
  { x: -1.5, z: -0.15, width: 1.05, depth: 0.95, heights: [0.34, 0.48, 0.38, 0.55] },
  { x: 0, z: 0.15, width: 1.15, depth: 1, heights: [0.4, 0.62, 0.42, 0.5, 0.35] },
  { x: 1.5, z: -0.1, width: 0.95, depth: 0.85, heights: [0.3, 0.5, 0.36] },
];

type Slab = {
  position: [number, number, number];
  size: [number, number, number];
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Scene({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const gem = useRef<THREE.Mesh>(null);
  const grid = useRef<THREE.GridHelper>(null);

  const slabs = useMemo<Slab[]>(() => {
    const result: Slab[] = [];
    COLUMNS.forEach((column) => {
      let y = -1.9;
      column.heights.forEach((height, index) => {
        const offset = index % 2 === 0 ? 0.02 : -0.02;
        result.push({
          position: [column.x + offset, y + height / 2, column.z],
          size: [column.width, height, column.depth],
        });
        y += height + 0.075;
      });
    });
    return result;
  }, []);

  const edges = useMemo(
    () =>
      slabs.map(
        (slab) => new THREE.EdgesGeometry(new THREE.BoxGeometry(...slab.size)),
      ),
    [slabs],
  );

  useEffect(() => {
    return () => {
      edges.forEach((geometry) => geometry.dispose());
    };
  }, [edges]);

  useEffect(() => {
    if (!grid.current) return;
    const material = grid.current.material as THREE.Material;
    material.transparent = true;
    material.opacity = 0.55;
  }, []);

  useFrame((state, delta) => {
    if (reduced || !group.current) return;

    const time = state.clock.elapsedTime;
    const scroll = window.scrollY / Math.max(window.innerHeight, 1);

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.35 + state.pointer.x * 0.32 + Math.sin(time * 0.13) * 0.05,
      2.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * -0.07,
      2.2,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      -scroll * 1.2,
      1.8,
      delta,
    );

    if (ringA.current) ringA.current.rotation.z += delta * 0.06;
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.04;
      ringB.current.rotation.x = 1.1 + Math.sin(time * 0.2) * 0.05;
    }
    if (gem.current) {
      gem.current.rotation.x += delta * 0.18;
      gem.current.rotation.y += delta * 0.26;
      gem.current.position.y = 1.25 + Math.sin(time * 0.8) * 0.12;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#070907", 8, 18]} />
      <ambientLight intensity={0.45} color="#d9e4cd" />
      <directionalLight position={[5, 7, 5]} intensity={2.2} color="#f4ffe4" />
      <pointLight position={[-4, 2, 2]} intensity={24} distance={14} color="#c9f24d" />
      <pointLight position={[3, -2, 4]} intensity={9} distance={12} color="#a7c0ff" />

      <group ref={group} rotation={[0, -0.35, 0]}>
        {slabs.map((slab, index) => (
          <group key={index} position={slab.position}>
            <mesh>
              <boxGeometry args={slab.size} />
              <meshStandardMaterial
                color="#171e13"
                metalness={0.55}
                roughness={0.36}
                emissive="#0a1006"
                emissiveIntensity={0.7}
              />
            </mesh>
            <lineSegments geometry={edges[index]}>
              <lineBasicMaterial color="#c9f24d" transparent opacity={0.16} />
            </lineSegments>
          </group>
        ))}

        <mesh position={[0, 0.34, 0.15]}>
          <boxGeometry args={[1.18, 0.018, 1.03]} />
          <meshBasicMaterial color="#c9f24d" transparent opacity={0.85} />
        </mesh>
        <mesh position={[-1.5, -0.48, -0.15]}>
          <boxGeometry args={[1.07, 0.014, 0.97]} />
          <meshBasicMaterial color="#c9f24d" transparent opacity={0.5} />
        </mesh>
        <mesh position={[1.5, -0.2, -0.1]}>
          <boxGeometry args={[0.97, 0.012, 0.87]} />
          <meshBasicMaterial color="#c9f24d" transparent opacity={0.4} />
        </mesh>
      </group>

      <mesh position={[0, -0.4, -1.6]}>
        <torusGeometry args={[2.38, 0.012, 6, 140, Math.PI]} />
        <meshBasicMaterial color="#c9f24d" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ringA} position={[0, 0, -2.1]} rotation={[1.15, 0, 0]}>
        <torusGeometry args={[2.9, 0.006, 6, 140]} />
        <meshBasicMaterial color="#c9f24d" transparent opacity={0.22} />
      </mesh>
      <mesh ref={ringB} position={[0, 0, -2.4]} rotation={[1.1, 0.2, 0]}>
        <torusGeometry args={[3.15, 0.004, 6, 140]} />
        <meshBasicMaterial color="#eef2e7" transparent opacity={0.12} />
      </mesh>

      <mesh ref={gem} position={[2.35, 1.25, -1.2]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#c9f24d" wireframe transparent opacity={0.2} />
      </mesh>

      <gridHelper ref={grid} args={[26, 52, "#202a1b", "#0d120c"]} position={[0, -2.3, 0]} />
    </>
  );
}

export function Hero3D() {
  const holder = useRef<HTMLDivElement>(null);
  const [supported] = useState(() => (typeof window === "undefined" ? false : supportsWebGL()));
  const [reduced] = useState(() => prefersReducedMotion());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "180px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero__canvas-holder" ref={holder} aria-hidden="true">
      {supported ? (
        <SceneBoundary fallback={<div className="hero__canvas-fallback" />}>
          <Canvas
            frameloop={visible ? "always" : "never"}
            dpr={[1, 1.6]}
            camera={{ position: [0, 0.3, 8.6], fov: 38 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <Scene reduced={reduced} />
          </Canvas>
        </SceneBoundary>
      ) : (
        <div className="hero__canvas-fallback" />
      )}
    </div>
  );
}
