import React from 'react';

export function Ground() {
  return (
    <mesh
      name='groundPlane'
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color='#555555' />
    </mesh>
  );
}
