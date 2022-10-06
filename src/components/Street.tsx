import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Vector3 } from "three";

type GLTFResult = GLTF & {
  nodes: {
    all: THREE.Mesh;
    allNeighbors: THREE.Mesh;

    end: THREE.Mesh;

    downRight: THREE.Mesh;
    upLeftEnd: THREE.Mesh;
    upLeft: THREE.Mesh;
    downLeft: THREE.Mesh;
    upRight: THREE.Mesh;

    downLeftRight: THREE.Mesh;
    upDownLeft: THREE.Mesh;
    upDownRight: THREE.Mesh;
    upLeftRight: THREE.Mesh;
  };
};

interface StreetProps {
  cellType: string;
  position: Vector3;
  index: number;
}

const colors = {
  all: "0",
  allNeighbors: "50",

  end: "250",

  downRight: "250",
  upLeftEnd: "25",
  upLeft: "250",
  downLeft: "250",
  upRight: "250",

  downLeftRight: "100",
  upDownLeft: "100",
  upDownRight: "100",
  upLeftRight: "100",
};

export function Street({ cellType, position, index }: StreetProps) {
  const { nodes } = useGLTF("/models/street.glb") as GLTFResult;
  console.log(cellType, position, index);
  return (
    <group position={position} dispose={null}>
      <mesh
        receiveShadow
        castShadow
        geometry={
          nodes[cellType as keyof typeof nodes].geometry || nodes.all.geometry
        }
        // colors[cellType as keyof typeof nodes]
        material={
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(
              `rgb(${colors[cellType as keyof typeof nodes]},${Math.min(
                Math.max(index * 0, 0),
                255
              )},${colors[cellType as keyof typeof nodes]})`
            ),
          })
        }
      />
    </group>
  );
}

useGLTF.preload("/models/street.glb");
export default Street;
