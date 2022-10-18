import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshStandardMaterial, TextureLoader } from "three";

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
  const material = new MeshStandardMaterial();

  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("/textures/baseIsland.png");
  material.map = texture;
  return (
    <group {...props} dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={material}
      ></mesh>
    </group>
  );
}

useGLTF.preload("/models/base.glb");

export default Base;
