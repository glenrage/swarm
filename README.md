# 3D Drone Control UI - Demo

This project is a React-based web application demonstrating a simplified 3D user interface for visualizing and interacting with drones. It showcases the use of 3D graphics within a web environment, focusing on drone representation, selection, and basic movement commands.

**Live Demo URL:** [https://glenrage.github.io/swarm/](https://glenrage.github.io/swarm/)

## Features

- **3D Drone Visualization:** Renders multiple drone instances in a 3D environment using a GLB model.
- **Interactive Scene:**
  - **Camera Controls:** Orbit, pan, and zoom the 3D scene.
  - **Drone Selection:** Click on a drone in the 3D scene or its ID in the UI panel to select it. Selected drones are highlighted.
  - **Information Tooltips:** Hovering over or selecting a drone displays its ID and status.
- **Drone Control UI Panel:**
  - Lists all active drones and their current status.
  - Displays detailed information for the currently selected drone (ID, position, status).
  - **Movement Commands:**
    - **Move to Point:** Click on the ground plane in the 3D scene to set a target destination for the selected drone.
    - **Move to Random:** Command the selected drone to move to a random point in the environment.
    - **Patrol (Simple):** A basic command to initiate a patrol step for the selected drone.

## Technologies Used

- **React Three Fiber (R3F):** Declaritive 3D scenes
- **Drei:** A collection of useful helpers and abstractions for React Three Fiber (e.g., `OrbitControls`, `Html`, `Environment`, shapes).

## Running Locally (Optional)

While the live demo is recommended, if you wish to run the project locally:

1.  **Prerequisites:**
    - Node.js (v16 or later recommended)
    - npm or yarn
2.  **Clone the repository:**
    ```bash
    git clone [URL_OF_YOUR_REPO]
    cd [repository-name]
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will typically open the application in your default web browser at `http://localhost:3000`.
