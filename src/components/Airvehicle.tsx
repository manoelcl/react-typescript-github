import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import useImportModels from "../services/useImportModels";
import { Material } from "three";

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
  const { airvehicle } = useImportModels();

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
        geometry={airvehicle.nodes.Zeppelin.geometry}
        material={airvehicle.materials.base || null}
      />
    </group>
  );
}

useGLTF.preload("/models/airvehicle.glb");

export default Airvehicle;
