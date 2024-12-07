import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Box3, Vector3 } from 'three';
import * as THREE from 'three';

const TruckModel = () => {
  const group = useRef<Group>(null);
  
  // Note: Replace this path with the actual path to your .glb file
  const { scene } = useGLTF('/models/truck.glb');

  useEffect(() => {
    // Calculate the bounding box of the model
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    // Calculate scale to fit model within a reasonable size
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5 / maxDim;

    // Apply transformations
    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [scene]);

  // Apply shadows and materials to all meshes in the model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      
      // Enhance material properties for better visual quality
      if (child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.roughness = 0.3;
        material.metalness = 0.7;
        
        // Add stronger emissive glow
        material.emissive = new THREE.Color('#61c8ff');
        material.emissiveIntensity = 0.1;
        
        // Create a clone of the material for each mesh to avoid sharing
        child.material = material.clone();
      }
    }
  });

  useFrame((state) => {
    if (group.current) {
      // Rotate the model around its Y axis
      group.current.rotation.y += 0.005;

      // Pulse the emissive intensity for a dynamic glow effect
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      <primitive 
        object={scene}
      />
    </group>
  );
};

export default TruckModel;
