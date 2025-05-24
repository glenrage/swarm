import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { UIPanel } from './components/UIPanel';
import * as THREE from 'three';
import './App.css';
import { Environment } from '@react-three/drei';

const initialDronesSetup = [
  {
    id: 'Alpha-01',
    position: new THREE.Vector3(-6, 1, 2),
    targetPosition: null,
    status: 'idle',
  },
  {
    id: 'Bravo-07',
    position: new THREE.Vector3(0, 1, -6),
    targetPosition: null,
    status: 'idle',
  },
  {
    id: 'Charlie-03',
    position: new THREE.Vector3(6, 1, 2),
    targetPosition: null,
    status: 'idle',
  },
  {
    id: 'Delta-05',
    position: new THREE.Vector3(3, 1, 5),
    targetPosition: null,
    status: 'idle',
  },
];

function App() {
  const [drones, setDrones] = useState(initialDronesSetup);
  const [selectedDroneId, setSelectedDroneId] = useState(null);

  const handleSelectDrone = useCallback((id) => {
    setSelectedDroneId(id);
  }, []);

  const handleDronePositionUpdate = useCallback((id, newPosition) => {
    setDrones((prevDrones) =>
      prevDrones.map((d) =>
        d.id === id ? { ...d, position: newPosition.clone() } : d
      )
    );
  }, []);

  const handleDroneStatusChange = useCallback((id, newStatus) => {
    setDrones((prevDrones) =>
      prevDrones.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  }, []);

  const handleDroneTargetReached = useCallback((id) => {
    setDrones((prevDrones) =>
      prevDrones.map((d) =>
        d.id === id ? { ...d, targetPosition: null, status: 'idle' } : d
      )
    );
  }, []);

  const handleSetDroneTargetPosition = useCallback((id, targetPosition) => {
    setDrones((prevDrones) =>
      prevDrones.map((d) =>
        d.id === id
          ? { ...d, targetPosition: targetPosition.clone(), status: 'moving' }
          : d
      )
    );
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#282c34' }}>
      <UIPanel
        drones={drones}
        selectedDroneId={selectedDroneId}
        onSelectDrone={handleSelectDrone}
        onSetDroneTargetPosition={handleSetDroneTargetPosition}
        onSetDroneStatus={handleDroneStatusChange}
      />
      <Canvas shadows camera={{ position: [0, 8, 18], fov: 55 }}>
        <Suspense fallback={null}>
          <Environment preset='city' />
          <Scene
            drones={drones}
            selectedDroneId={selectedDroneId}
            onSelectDrone={handleSelectDrone}
            onDronePositionUpdate={handleDronePositionUpdate}
            onDroneStatusChange={handleDroneStatusChange}
            onDroneTargetReached={handleDroneTargetReached}
            onSetDroneTargetPosition={handleSetDroneTargetPosition}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
