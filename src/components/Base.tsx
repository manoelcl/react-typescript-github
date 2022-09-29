import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Circle: THREE.Mesh;
  };
  materials: {};
  position: [number, number, number];
  scale: number;
};

function Base(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/base.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={nodes.Circle.material}
      />
    </group>
  );
}

useGLTF.preload("/models/base.glb");

export default Base;
