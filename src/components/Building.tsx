import { useState } from "react";
import colorDictionary from "../helpers/colorDictionaryHelper";
import Roof from "./Roof";
import { Vector3 } from "three";
import { BuildingDetails } from "./UserIsland";
import Street from "./Street";

export interface BuildingProps {
  buildingDetails: BuildingDetails;
}

const Building = ({
  buildingDetails: { repo, position, distribution, index },
}: BuildingProps): JSX.Element => {
  const [active, setActive] = useState(false);
  const color = colorDictionary[repo.language]?.color || "grey";

  return (
    <group>
      <Roof
        color={color}
        position={new Vector3(position.x, Math.log10(repo.size), position.z)}
      />
      <Street
        cellType={distribution.cellType}
        position={new Vector3(position.x, 0, position.z)}
        index={index}
      />
      <mesh
        castShadow
        receiveShadow
        onClick={(event) => {
          setActive(true);
        }}
        position={[position.x, Math.log10(repo.size) / 2, position.z]}
      >
        <boxGeometry args={[0.3, Math.log10(repo.size), 0.3]} />
        <meshStandardMaterial
          roughness={0}
          emissive={active ? color : 0}
          color={color}
        />
      </mesh>
    </group>
  );
};

export default Building;
