import React from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export function DeconflictionZone({ position, radius, height }) {
  return (
    <Cylinder args={[radius, radius, height, 32]} position={position}>
      <meshStandardMaterial
        color='#ff4444'
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
      />
    </Cylinder>
  );
}
