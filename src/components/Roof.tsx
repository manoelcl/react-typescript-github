import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshStandardMaterial } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

function Roof(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/roof.glb") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial roughness={0} emissive={"cyan"} color={"cyan"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/roof.glb");

export default Roof;
