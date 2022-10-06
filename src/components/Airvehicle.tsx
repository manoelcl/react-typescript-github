import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Zeppelin: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
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
      <mesh
        castShadow
        receiveShadow
        position={[distance, 0, 0]}
        scale={0.333}
        geometry={nodes.Zeppelin.geometry}
        material={materials.base}
      />
    </group>
  );
}

useGLTF.preload("/models/airvehicle.glb");

export default Airvehicle;
