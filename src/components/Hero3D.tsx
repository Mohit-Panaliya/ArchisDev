import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { prefersReducedMotion } from "../lib/motion";
import { useTheme } from "../lib/theme";

const PANEL_WIDTH = 2.6;
const PANEL_HEIGHT = 1.8;
const CHART_BASE = -0.58;
const BAR_START_X = -0.75;
const BAR_STEP = 0.24;
const BAR_HEIGHTS = [0.17, 0.26, 0.22, 0.35, 0.3, 0.43, 0.38, 0.49];

const panelGeometry = new RoundedBoxGeometry(PANEL_WIDTH, PANEL_HEIGHT, 0.12, 5, 0.05);
const plateGeometry = new RoundedBoxGeometry(PANEL_WIDTH - 0.12, PANEL_HEIGHT - 0.1, 0.08, 4, 0.05);
const chipGeometry = new RoundedBoxGeometry(0.64, 0.36, 0.08, 3, 0.03);
const livePillGeometry = new RoundedBoxGeometry(0.26, 0.09, 0.03, 2, 0.025);

const barGeometry = new THREE.BoxGeometry(0.12, 1, 0.12);
barGeometry.translate(0, 0.5, 0);

const trendCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(BAR_START_X - 0.14, CHART_BASE + 0.1, 0.15),
  ...BAR_HEIGHTS.map(
    (height, index) =>
      new THREE.Vector3(BAR_START_X + index * BAR_STEP, CHART_BASE + height + 0.08, 0.15),
  ),
  new THREE.Vector3(
    BAR_START_X + (BAR_HEIGHTS.length - 1) * BAR_STEP + 0.13,
    CHART_BASE + 0.42,
    0.15,
  ),
]);
const trendGeometry = new THREE.TubeGeometry(trendCurve, 72, 0.006, 5, false);

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

function DashboardPanel() {
  return (
    <group>
      {[-1.13, -1.05, -0.97].map((x) => (
        <mesh key={x} position={[x, 0.72, 0.075]}>
          <sphereGeometry args={[0.019, 10, 10]} />
          <meshBasicMaterial color="#eef2e7" transparent opacity={0.32} />
        </mesh>
      ))}
      <mesh position={[0.2, 0.72, 0.073]}>
        <boxGeometry args={[0.6, 0.018, 0.006]} />
        <meshBasicMaterial color="#eef2e7" transparent opacity={0.13} />
      </mesh>
      <mesh geometry={livePillGeometry} position={[1.02, 0.72, 0.08]}>
        <meshBasicMaterial color="#c9f24d" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.93, 0.72, 0.1]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#0a0e04" />
      </mesh>

      <mesh position={[0, 0.58, 0.07]}>
        <boxGeometry args={[2.3, 0.006, 0.004]} />
        <meshBasicMaterial color="#eef2e7" transparent opacity={0.1} />
      </mesh>

      <mesh position={[-1.09, -0.08, 0.07]}>
        <boxGeometry args={[0.24, 1.14, 0.02]} />
        <meshBasicMaterial color="#eef2e7" transparent opacity={0.045} />
      </mesh>
      {[0.36, 0.14, -0.08, -0.3].map((y, index) => (
        <mesh key={y} position={[-1.09, y, 0.085]}>
          <boxGeometry args={[0.105, 0.105, 0.02]} />
          <meshBasicMaterial
            color={index === 0 ? "#c9f24d" : "#eef2e7"}
            transparent
            opacity={index === 0 ? 0.9 : 0.18}
          />
        </mesh>
      ))}

      {[
        { x: -0.39, width: 0.34 },
        { x: 0.69, width: 0.5 },
      ].map((kpi) => (
        <group key={kpi.x} position={[kpi.x, 0.42, 0]}>
          <mesh position={[0, 0, 0.072]}>
            <boxGeometry args={[0.98, 0.24, 0.03]} />
            <meshBasicMaterial color="#eef2e7" transparent opacity={0.05} />
          </mesh>
          <mesh position={[-0.32, 0.05, 0.091]}>
            <boxGeometry args={[0.24, 0.016, 0.006]} />
            <meshBasicMaterial color="#eef2e7" transparent opacity={0.28} />
          </mesh>
          <mesh position={[-0.26, -0.045, 0.091]}>
            <boxGeometry args={[kpi.width, 0.03, 0.006]} />
            <meshBasicMaterial color="#eef2e7" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0.4, 0.05, 0.091]}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshBasicMaterial color="#c9f24d" />
          </mesh>
        </group>
      ))}

      <mesh position={[0.15, CHART_BASE, 0.07]}>
        <boxGeometry args={[1.94, 0.006, 0.004]} />
        <meshBasicMaterial color="#eef2e7" transparent opacity={0.12} />
      </mesh>

      {[-0.83, 0.15, 0.9].map((x, index) => (
        <group key={x} position={[x, -0.79, 0]}>
          <mesh position={[0, 0, 0.072]}>
            <boxGeometry args={[0.58, 0.09, 0.02]} />
            <meshBasicMaterial color="#eef2e7" transparent opacity={0.055} />
          </mesh>
          <mesh position={[-0.21, 0, 0.085]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial
              color={index === 0 ? "#c9f24d" : "#eef2e7"}
              transparent
              opacity={index === 0 ? 1 : 0.3}
            />
          </mesh>
          <mesh position={[0.03, 0, 0.085]}>
            <boxGeometry args={[0.22, 0.016, 0.006]} />
            <meshBasicMaterial color="#eef2e7" transparent opacity={0.28} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  const theme = useTheme();
  const light = theme === "light";
  const line = light ? "#7ba000" : "#c9f24d";
  const aspect = useThree((state) => state.size.width / Math.max(state.size.height, 1));
  const scale = aspect > 1 ? Math.min(1.7, 1.3 + (aspect - 1) * 0.4) : 1;

  const group = useRef<THREE.Group>(null);
  const chipA = useRef<THREE.Group>(null);
  const trendDot = useRef<THREE.Mesh>(null);
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const grid = useRef<THREE.GridHelper>(null);

  const startPoint = useMemo(() => trendCurve.getPoint(0.04), []);

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
      -0.26 + state.pointer.x * 0.26 + Math.sin(time * 0.13) * 0.04,
      2.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * -0.06,
      2.2,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      aspect > 1 ? 0 : -scroll * 0.9,
      1.8,
      delta,
    );

    if (chipA.current) chipA.current.position.y = 1.02 + Math.sin(time * 0.9) * 0.05;

    bars.current.forEach((bar, index) => {
      if (!bar) return;
      bar.scale.y = BAR_HEIGHTS[index] * (0.94 + 0.06 * Math.sin(time * 1.2 + index * 0.6));
    });

    if (trendDot.current) {
      const phase = (time * 0.11) % 2;
      const point = trendCurve.getPoint(phase < 1 ? phase : 2 - phase);
      trendDot.current.position.set(point.x, point.y, 0.17);
    }

    if (ringA.current) ringA.current.rotation.z += delta * 0.05;
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.035;
      ringB.current.rotation.x = 1.14 + Math.sin(time * 0.18) * 0.04;
    }
  });

  return (
    <>
      <fog attach="fog" args={[light ? "#f4f5ee" : "#070907", 10, 22]} />
      <ambientLight intensity={light ? 0.8 : 0.45} color="#d9e4cd" />
      <directionalLight position={[5, 7, 5]} intensity={2.2} color="#f4ffe4" />
      <pointLight position={[-4, 2, 3]} intensity={22} distance={14} color="#c9f24d" />
      <pointLight position={[3, -2, 4]} intensity={6} distance={12} color="#a7c0ff" />

      <group ref={group} rotation={[0, -0.26, 0]} scale={scale}>
        <mesh
          geometry={plateGeometry}
          position={[-0.14, 0.1, -0.22]}
          rotation={[0, 0.06, 0]}
        >
          <meshStandardMaterial
            color={light ? "#e6e9db" : "#0a0f09"}
            metalness={0.2}
            roughness={0.6}
            transparent
            opacity={light ? 0.9 : 0.65}
          />
        </mesh>

        <mesh geometry={panelGeometry}>
          <meshStandardMaterial
            color="#0f150c"
            metalness={0.5}
            roughness={0.32}
            emissive="#0a1007"
            emissiveIntensity={0.8}
          />
        </mesh>

        <DashboardPanel />

        {BAR_HEIGHTS.map((height, index) => (
          <mesh
            key={index}
            ref={(node) => {
              bars.current[index] = node;
            }}
            geometry={barGeometry}
            position={[BAR_START_X + index * BAR_STEP, CHART_BASE, 0.12]}
            scale={[1, height, 1]}
          >
            <meshStandardMaterial
              color={index === BAR_HEIGHTS.length - 1 ? "#ddff74" : "#c9f24d"}
              emissive="#c9f24d"
              emissiveIntensity={0.18 + index * 0.03}
              metalness={0.3}
              roughness={0.35}
            />
          </mesh>
        ))}

        <mesh geometry={trendGeometry}>
          <meshBasicMaterial color="#eef2e7" transparent opacity={0.42} />
        </mesh>
        <mesh ref={trendDot} position={[startPoint.x, startPoint.y, 0.17]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshBasicMaterial color="#ddff74" />
        </mesh>

        <group ref={chipA} position={[-1.0, 1.02, 0.5]} rotation={[0.04, 0.16, -0.03]}>
          <mesh geometry={chipGeometry}>
            <meshStandardMaterial
              color="#161d11"
              metalness={0.4}
              roughness={0.35}
              emissive="#0b1007"
              emissiveIntensity={0.7}
            />
          </mesh>
          <mesh position={[-0.21, 0.06, 0.045]}>
            <sphereGeometry args={[0.034, 12, 12]} />
            <meshBasicMaterial color="#c9f24d" />
          </mesh>
          <mesh position={[0.04, 0.09, 0.045]}>
            <boxGeometry args={[0.26, 0.02, 0.006]} />
            <meshBasicMaterial color="#eef2e7" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0.0, 0.03, 0.045]}>
            <boxGeometry args={[0.18, 0.02, 0.006]} />
            <meshBasicMaterial color="#eef2e7" transparent opacity={0.25} />
          </mesh>
          <mesh position={[0.16, -0.1, 0.045]}>
            <boxGeometry args={[0.16, 0.05, 0.02]} />
            <meshBasicMaterial color="#c9f24d" transparent opacity={0.85} />
          </mesh>
        </group>
      </group>

      <mesh position={[0, -0.5, -1.8]}>
        <torusGeometry args={[2.5, 0.01, 6, 140, Math.PI]} />
        <meshBasicMaterial color={line} transparent opacity={light ? 0.4 : 0.45} />
      </mesh>
      <mesh ref={ringA} position={[0, 0.1, -2.2]} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[3.0, 0.006, 6, 140]} />
        <meshBasicMaterial color={line} transparent opacity={0.18} />
      </mesh>
      <mesh ref={ringB} position={[0, 0.1, -2.5]} rotation={[1.14, 0.2, 0]}>
        <torusGeometry args={[3.25, 0.004, 6, 140]} />
        <meshBasicMaterial
          color={light ? "#333d2b" : "#eef2e7"}
          transparent
          opacity={light ? 0.18 : 0.1}
        />
      </mesh>

      <gridHelper
        ref={grid}
        args={[26, 52, light ? "#b9c1a9" : "#202a1b", light ? "#d8dccc" : "#0d120c"]}
        position={[0, -2.15, 0]}
      />
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
            camera={{ position: [0, 0.2, 8.4], fov: 38 }}
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
