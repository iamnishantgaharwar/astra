"use client"
import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";

export function FalconCanvasDashboard() {
  return (
    <Canvas
      className="!absolute !inset-0 !z-0"
      camera={{ position: [0, 2, 30], fov: 50 }}
    >
      <ambientLight intensity={1.5} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={5}
        saturation={0}
        fade
      />
      <Environment preset="sunset" />
    </Canvas>
  );
}
