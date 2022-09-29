import { Repo } from "../types";
import { useState } from "react";
import colorDictionary from "../helpers/colorDictionaryHelper";
import Roof from "./Roof";

export interface BuildingProps {
  repository: Repo;
  position: { x: number; y: number };
}

const Building = ({ repository, position }: BuildingProps): JSX.Element => {
  const [active, setActive] = useState(false);

  return (
    <group>
      <Roof position={[position.x, Math.log10(repository.size), position.y]} />
      <mesh
        castShadow
        receiveShadow
        onClick={(event) => {
          setActive(true);
        }}
        position={[position.x, Math.log10(repository.size) / 2, position.y]}
      >
        <boxGeometry args={[0.3, Math.log10(repository.size), 0.3]} />
        <meshStandardMaterial
          roughness={0}
          emissive={
            active ? colorDictionary[repository.language]?.color || "grey" : 0
          }
          color={colorDictionary[repository.language]?.color || "grey"}
        />
      </mesh>
    </group>
  );
};

export default Building;
