import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

interface AirvehicleProps {
  distance: number;
  height: number;
}

function Airvehicle({ height, distance }: AirvehicleProps) {
  const { nodes, materials } = useGLTF("/models/airvehicle.glb") as GLTFResult;

  const centerRotation = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (centerRotation.current) {
      centerRotation.current.rotation.y -= 0.1 * delta;
      centerRotation.current.position.y =
        height + 0.1 * Math.sin(2 * state.clock.elapsedTime);
    }
  });

  return (
    <group position={[0, height, 0]} ref={centerRotation}>
      <group position={[distance, 0, 0]} scale={0.333} dispose={null}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.Cube.geometry}
          material={materials.Material}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.Cube_1.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.Cube_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/airvehicle.glb");

export default Airvehicle;
