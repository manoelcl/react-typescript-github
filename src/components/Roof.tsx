import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Vector3 } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

interface RoofProps {
  color: string;
  position: Vector3;
}

function Roof({ color, position }: RoofProps): JSX.Element {
  const { nodes, materials } = useGLTF("/models/roof.glb") as GLTFResult;

  return (
    <group position={position} dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial roughness={0} color={color} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/roof.glb");

export default Roof;
