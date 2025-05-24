import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Ground() {
  const texturePath = {
    map: `${process.env.PUBLIC_URL || ''}/sand_texture.jpeg`,
  };

  const groundTextures = useTexture(texturePath);

  const texturePropsToConfigure = ['map', 'normalMap', 'roughnessMap'];
  texturePropsToConfigure.forEach((propName) => {
    if (groundTextures[propName]) {
      groundTextures[propName].wrapS = THREE.RepeatWrapping;
      groundTextures[propName].wrapT = THREE.RepeatWrapping;
      groundTextures[propName].repeat.set(30, 30);
      groundTextures[propName].anisotropy = 16;
    }
  });

  return (
    <mesh
      name='groundPlane'
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial {...groundTextures} />
    </mesh>
  );
}
