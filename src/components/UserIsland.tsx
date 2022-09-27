import { DoubleSide, Mesh } from "three";
import { Repo } from "../types";
import { useState } from "react";
import Building from "./Building";

export interface UserIslandProps {
  rep: Repo[];
}

const UserIsland: React.FC<UserIslandProps> = ({ rep }) => {
  const num = rep.length;
  const side = Math.round(Math.sqrt(num));
  const maxHeight = Math.ceil(num / side);
  const [active, setActive] = useState<number | null>(null);

  const repoCubes: number[][] = rep.map((element, index, array) => {
    console.log(rep[index].language);
    return [
      (index % side) - (side - 1) / 2,
      0,
      Math.floor(index / side) - (maxHeight - 1) / 2,
    ];
  });
  console.log(side, maxHeight, repoCubes);

  return (
    <>
      {rep
        ? repoCubes.map((element, index) => (
            <Building
              position={[element[0], element[2]]}
              repository={rep[index]}
            ></Building>
          ))
        : null}
      <mesh
        receiveShadow
        rotation={[0.5 * Math.PI, 0, 0]}
        position={[0, -0.01, 0]}
      >
        <circleGeometry args={[Math.sqrt(2 * (maxHeight / 2) ** 2), 25]} />
        <meshStandardMaterial color={"#444444"} side={DoubleSide} />
      </mesh>
    </>
  );
};

export default UserIsland;
