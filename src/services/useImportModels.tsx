import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

interface NodeMesh {
  [key: string]: THREE.Mesh;
}
interface NodeMaterial {
  [key: string]: THREE.Material;
}

type GLTFResult = GLTF & {
  nodes: NodeMesh;
  materials: NodeMaterial;
  position?: [number, number, number];
  scale?: number;
};

const useImportModels = (): { [name: string]: GLTFResult } => {
  const base = useGLTF("/models/base.glb") as GLTFResult;
  useGLTF.preload("/models/base.glb");
  const street = useGLTF("/models/street.glb") as GLTFResult;
  useGLTF.preload("/models/street.glb");
  const roof = useGLTF("/models/roof.glb") as GLTFResult;
  useGLTF.preload("/models/roof.glb");
  const airvehicle = useGLTF("/models/airvehicle.glb") as GLTFResult;
  useGLTF.preload("/models/airvehicle.glb");
  const models = { base, street, roof, airvehicle };

  return models;
};

export default useImportModels;
