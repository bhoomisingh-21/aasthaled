"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { DEMO_CENTER_IMAGE } from "@/lib/constants";

function createBoothMaterial(texture: THREE.Texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(map, vUv);
        if (length(tex.rgb) < 0.07) discard;
        gl_FragColor = vec4(tex.rgb, 1.0);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });
}

function BoothExhibit() {
  const texture = useTexture(DEMO_CENTER_IMAGE);
  const boothMaterial = useMemo(() => createBoothMaterial(texture), [texture]);

  const wallMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#141414", roughness: 0.92, metalness: 0.03 }),
    []
  );
  const wallInner = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0c0c0c", roughness: 0.95 }),
    []
  );

  const w = 5.6;
  const h = 3.5;
  const d = 2.8;

  return (
    <group position={[0, -0.05, 0]}>
      <mesh position={[0, 0, 0]} material={boothMaterial} castShadow>
        <planeGeometry args={[w, h]} />
      </mesh>

      <mesh position={[0, 0, -d / 2]} material={wallInner} receiveShadow>
        <planeGeometry args={[w * 0.96, h * 0.96]} />
      </mesh>

      <mesh position={[-w / 2, 0, -d / 2]} rotation={[0, Math.PI / 2, 0]} material={wallMat} castShadow>
        <planeGeometry args={[d, h]} />
      </mesh>
      <mesh position={[w / 2, 0, -d / 2]} rotation={[0, -Math.PI / 2, 0]} material={wallMat} castShadow>
        <planeGeometry args={[d, h]} />
      </mesh>

      <mesh position={[0, h / 2, -d / 2]} rotation={[-Math.PI / 2, 0, 0]} material={wallMat}>
        <planeGeometry args={[w, d]} />
      </mesh>
      <mesh position={[0, -h / 2, -d / 2]} rotation={[Math.PI / 2, 0, 0]} material={wallMat} receiveShadow>
        <planeGeometry args={[w * 1.1, d * 1.1]} />
      </mesh>

      <mesh position={[0, -h / 2 - 0.02, 0.4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#050505" roughness={0.35} metalness={0.15} />
      </mesh>
    </group>
  );
}

function Scene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 10, 8]} intensity={1.35} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 4, -4]} intensity={0.55} color="#c9a962" />
      <pointLight position={[0, 2, 4]} intensity={0.45} color="#fff5eb" />
      <BoothExhibit />
      <ContactShadows position={[0, -1.78, 0]} opacity={0.45} scale={12} blur={2.5} far={4} />
      <Environment preset="city" environmentIntensity={0.25} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.15}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        rotateSpeed={0.65}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function DemoCenterCanvas({ autoRotate }: { autoRotate: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 9], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene autoRotate={autoRotate} />
      </Suspense>
    </Canvas>
  );
}
