import { Drone } from './Drone';
import { Ground } from './Ground';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function Scene({
  drones,
  selectedDroneId,
  onSelectDrone,
  onDronePositionUpdate,
  onDroneStatusChange,
  onDroneTargetReached,
  onSetDroneTargetPosition,
}) {
  const handleGroundClick = (event) => {
    if (selectedDroneId) {
      if (event.object.name === 'groundPlane') {
        const targetPoint = event.point.clone();
        targetPoint.y = 1; // Drone altitude
        onSetDroneTargetPosition(selectedDroneId, targetPoint);
      }
    }
  };

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ambientLight intensity={1.5} />
      <hemisphereLight
        skyColor={0x87ceeb}
        groundColor={0x402810}
        intensity={1}
      />

      <directionalLight
        position={[10, 15, 10]} // Try different positions, e.g., [0, 10, 10], [-10, 10, 0]
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Pass the click handler to the group containing the ground */}
      <group onClick={handleGroundClick}>
        <Ground />
      </group>

      {drones.map((droneData) => (
        <Drone
          key={droneData.id}
          droneData={droneData}
          isSelected={droneData.id === selectedDroneId}
          onSelect={onSelectDrone}
          onPositionUpdate={onDronePositionUpdate}
          onStatusChange={onDroneStatusChange}
          onTargetReached={onDroneTargetReached}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
    </>
  );
}
