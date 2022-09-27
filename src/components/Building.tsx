import { Repo } from "../types";
import { useState } from "react";
import colorDictionary from "../helpers/colorDictionaryHelper";

export interface BuildingProps {
  repository: Repo;
  position: [number, number];
}

const Building = ({ repository, position }: BuildingProps): JSX.Element => {
  const [active, setActive] = useState(false);
  console.log(position);
  return (
    <mesh
      onClick={(event) => {
        setActive(true);
      }}
      castShadow
      position={[position[0], Math.log10(repository.size) / 2, position[1]]}
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
  );
};

export default Building;
