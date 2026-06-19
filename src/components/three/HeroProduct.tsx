"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PRODUCTS } from "@/lib/constants";

function ProductPlane({ url, lit }: { url: string; lit: number }) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={ref}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial map={tex} transparent opacity={0.35 + lit * 0.63} toneMapped={false} />
      </mesh>
    </Float>
  );
}

export function HeroProduct({ lit }: { lit: number }) {
  const product = PRODUCTS[3];
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.15} />
      <pointLight position={[2, 3, 4]} intensity={0.4 + lit * 1.2} color="#ffe8c8" />
      <pointLight position={[-3, -1, 2]} intensity={0.1 + lit * 0.3} color="#d6b36a" />
      <Suspense fallback={null}>
        <ProductPlane url={product.image} lit={lit} />
      </Suspense>
    </Canvas>
  );
}
