"use client"
import { useGLTF } from '@react-three/drei'

export function FalconModel(props: any) {
  const { scene } = useGLTF('/falcon.glb')
  

  return <primitive object={scene} {...props} />
}
