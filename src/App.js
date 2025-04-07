import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';

// 3D Cube Component
function Cube({ position }) {
  const mesh = useRef();

  // Handle keyboard movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 0.1;
      switch (event.key) {
        case 'ArrowUp':
          mesh.current.position.z -= speed;
          break;
        case 'ArrowDown':
          mesh.current.position.z += speed;
          break;
        case 'ArrowLeft':
          mesh.current.position.x -= speed;
          break;
        case 'ArrowRight':
          mesh.current.position.x += speed;
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Rotate the cube for animation
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6347" />
    </mesh>
  );
}

function App() {
  return (
    <div className="app">
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Cube position={[0, 0, 0]} />
          <Stars />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* Portfolio Section */}
      <div className="portfolio">
        <h1>My Portfolio</h1>
        <p>Welcome to my interactive portfolio! Use the arrow keys to move the cube above.</p>
        <section>
          <h2>About Me</h2>
          <p>I'm [Your Name], a creative developer inspired by interactive web experiences.</p>
        </section>
        <section>
          <h2>Projects</h2>
          <ul>
            <li>Project 1 - A cool thing I built</li>
            <li>Project 2 - Another awesome creation</li>
          </ul>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Email: your.email@example.com</p>
        </section>
      </div>
    </div>
  );
}

export default App;