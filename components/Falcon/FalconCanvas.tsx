"use client"
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { FalconModel } from "./FalconModel";

export function FalconCanvas() {
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
        factor={18}   
        saturation={0}
        fade
      />
      <Environment preset="sunset" />
      <FalconModel scale={1.3} position={[2, -2, 0]} />
      <OrbitControls autoRotate enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
