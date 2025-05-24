import * as THREE from 'three';

export function UIPanel({
  drones,
  selectedDroneId,
  onSelectDrone,
  onSetDroneTargetPosition,
  onSetDroneStatus,
}) {
  const selectedDrone = drones.find((d) => d.id === selectedDroneId);

  const handleMoveToRandom = () => {
    if (selectedDrone) {
      const randomX = Math.random() * 20 - 10;
      const randomZ = Math.random() * 20 - 10;
      onSetDroneTargetPosition(
        selectedDrone.id,
        new THREE.Vector3(randomX, 1, randomZ)
      );
    }
  };

  const handlePatrol = () => {
    if (selectedDrone) {
      onSetDroneStatus(selectedDrone.id, 'patrolling');
      const p1 = new THREE.Vector3(
        selectedDrone.position.x + 5,
        1,
        selectedDrone.position.z
      );
      onSetDroneTargetPosition(selectedDrone.id, p1);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(40, 40, 40, 0.85)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'sans-serif',
        width: '280px',
        zIndex: 100,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
      <h3>Drone Control Panel</h3>
      <div style={{ marginBottom: '10px' }}>
        <strong>Drones:</strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {drones.map((drone) => (
            <li
              key={drone.id}
              onClick={() => onSelectDrone(drone.id)}
              style={{
                padding: '6px 8px',
                cursor: 'pointer',
                background: drone.id === selectedDroneId ? '#007bff' : '#444',
                color: drone.id === selectedDroneId ? 'white' : '#ddd',
                borderRadius: '4px',
                marginBottom: '4px',
                fontSize: '0.9em',
              }}>
              {drone.id} <br />
              <span style={{ fontSize: '0.8em' }}>Status: {drone.status}</span>
            </li>
          ))}
        </ul>
      </div>
      {selectedDrone && (
        <div style={{ borderTop: '1px solid #555', paddingTop: '10px' }}>
          <h4>Selected: {selectedDrone.id}</h4>
          <p style={{ fontSize: '0.85em', margin: '5px 0' }}>
            Pos: X: {selectedDrone.position.x.toFixed(1)}, Y:{' '}
            {selectedDrone.position.y.toFixed(1)}, Z:{' '}
            {selectedDrone.position.z.toFixed(1)}
          </p>
          <p style={{ fontSize: '0.85em', margin: '5px 0' }}>
            Status: {selectedDrone.status}
          </p>
          {selectedDrone.targetPosition && (
            <p
              style={{ fontSize: '0.85em', margin: '5px 0', color: '#90ee90' }}>
              Target: X: {selectedDrone.targetPosition.x.toFixed(1)}, Y:{' '}
              {selectedDrone.targetPosition.y.toFixed(1)}, Z:{' '}
              {selectedDrone.targetPosition.z.toFixed(1)}
            </p>
          )}
          <button
            onClick={handleMoveToRandom}
            style={{
              marginRight: '5px',
              padding: '6px 10px',
              fontSize: '0.9em',
            }}>
            Move Random
          </button>
          <button
            onClick={handlePatrol}
            style={{ padding: '6px 10px', fontSize: '0.9em' }}>
            Patrol (Step)
          </button>
        </div>
      )}
      {!selectedDrone && <p>Click a drone to select.</p>}
      <p style={{ fontSize: '0.8em', marginTop: '15px', color: '#ccc' }}>
        Click ground to set target for selected drone.
      </p>
    </div>
  );
}
