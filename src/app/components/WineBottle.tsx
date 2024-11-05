'use client'

import React, { ReactElement, useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AsciiRenderer, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

function WineBottleModel(): ReactElement {
  const { scene } = useGLTF('/bottle.glb') as GLTFResult
  const viewport = useThree((state) => state.viewport)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshLambertMaterial({ color: 0xffffff })
      }
    })
  }, [scene])

  return <primitive object={scene} scale={viewport.height * 2.6} position={[0, -0.8, 0]} />
}

function MovingLight({ offset = 0 }: { offset?: number }): ReactElement {
  const lightRef = useRef<THREE.PointLight>(null)
  const orbitRadius = 5
  const speed = 2

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed + offset
    const x = orbitRadius * Math.sin(time)
    const z = orbitRadius * Math.cos(time)
    const y = 5

    if (lightRef.current) {
      lightRef.current.position.set(x, y, z)
    }
  })

  return (
    <pointLight
      ref={lightRef}
      intensity={50}
      distance={10}
      color="white"
    />
  )
}

export default function WineBottle(): ReactElement {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <color attach="background" args={['black']} />
        <MovingLight offset={0} />
        <MovingLight offset={Math.PI / 2} />
        <ambientLight intensity={1} />
        <WineBottleModel />
        <AsciiRenderer fgColor="white" bgColor="transparent" characters=" .:-+*=%@#" />
      </Canvas>
    </div>
  )
}