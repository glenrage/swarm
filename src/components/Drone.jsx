import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { DroneModel } from './DroneModel'; // Your gltfjsx generated component

const DRONE_SPEED = 2; // Units per second

export function Drone({
  droneData,
  isSelected,
  onSelect,
  onPositionUpdate,
  onStatusChange,
  onTargetReached,
}) {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(droneData.position);
    }
  }, [droneData.position]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const currentPos = groupRef.current.position;

    if (droneData.targetPosition) {
      const direction = new THREE.Vector3().subVectors(
        droneData.targetPosition,
        currentPos
      );

      if (direction.lengthSq() > 0.01) {
        direction.normalize();
        const moveDistance = DRONE_SPEED * delta;

        if (direction.length() * moveDistance >= direction.length()) {
          currentPos.copy(droneData.targetPosition);
        } else {
          currentPos.addScaledVector(direction, moveDistance);
        }

        const lookAtTarget = droneData.targetPosition.clone();
        lookAtTarget.y = currentPos.y;
        groupRef.current.lookAt(lookAtTarget);

        if (droneData.status !== 'moving') {
          onStatusChange(droneData.id, 'moving');
        }
      } else {
        currentPos.copy(droneData.targetPosition);
        onPositionUpdate(droneData.id, currentPos.clone());
        onTargetReached(droneData.id);
        if (droneData.status !== 'idle') {
          onStatusChange(droneData.id, 'idle');
        }
      }
    } else {
      if (!currentPos.equals(droneData.position)) {
        currentPos.lerp(droneData.position, 0.1);
        if (currentPos.distanceToSquared(droneData.position) < 0.001) {
          currentPos.copy(droneData.position);
        }
      }
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    onSelect(droneData.id);
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => setIsHovered(false)}>
      <DroneModel
        scale={isSelected ? 0.6 : 0.5}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      />
      {isSelected && (
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial
            color='yellow'
            emissive='yellow'
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
      {(isSelected || isHovered) && (
        <Html distanceFactor={10} position={[0, 1.2, 0]}>
          <div
            style={{
              padding: '3px 6px',
              background: 'rgba(0,0,0,0.75)',
              color: 'white',
              borderRadius: '4px',
              fontSize: '11px',
              whiteSpace: 'nowrap',
              transform: 'translate(-50%, -50%)',
            }}>
            ID: {droneData.id}
            <br />
            Status: {droneData.status}
          </div>
        </Html>
      )}
    </group>
  );
}
