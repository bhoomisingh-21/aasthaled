"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PRODUCTS, type Product } from "@/lib/constants";

function Sculpture({
  product,
  index,
  active,
  onSelect,
  mouse,
}: {
  product: Product;
  index: number;
  active: boolean;
  onSelect: () => void;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const tex = useTexture(product.image);
  tex.colorSpace = THREE.SRGBColorSpace;
  const group = useRef<THREE.Group>(null);
  const [x, y, z] = product.position;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.x = x + mouse.current.x * (0.3 + index * 0.1);
    group.current.position.y = y + mouse.current.y * (0.2 + index * 0.05) + Math.sin(t * 0.5 + index) * 0.05;
    group.current.rotation.y = Math.sin(t * 0.3 + index) * 0.15;
    const targetScale = active ? 1.35 : 1;
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <group ref={group} position={[x, y, z]} onClick={onSelect}>
        <mesh>
          <planeGeometry args={[1.6, 1.6]} />
          <meshBasicMaterial
            map={tex}
            transparent
            opacity={active ? 1 : 0.85}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({
  activeId,
  onSelect,
  mouse,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(0, 0, 6), 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 4, 6]} intensity={0.6} color="#ffe8c8" />
      {PRODUCTS.map((p, i) => (
        <Sculpture
          key={p.id}
          product={p}
          index={i}
          active={activeId === p.id}
          onSelect={() => onSelect(p.id)}
          mouse={mouse}
        />
      ))}
    </>
  );
}

export function GalleryCanvas({
  activeId,
  onSelect,
  mouse,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <Scene activeId={activeId} onSelect={onSelect} mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
