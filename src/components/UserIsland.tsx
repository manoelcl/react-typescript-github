import { Repo } from "../types";
import Building from "./Building";
import Base from "./Base";
import Airvehicle from "./Airvehicle";
import { Vector3 } from "three";
import getNeighborsHelper, {
  getColumn,
  getRow,
} from "../helpers/getNeighborsHelper";

export interface UserIslandProps {
  rep: Repo[];
}

export interface BuildingDistribution {
  neighbors: boolean[];
  cellType: string;
}

export interface BuildingDetails {
  repo: Repo;
  position: Vector3;
  distribution: BuildingDistribution;
  index: number;
}

const UserIsland: React.FC<UserIslandProps> = ({ rep }) => {
  const num = rep.length;
  const side = Math.round(Math.sqrt(num));
  const maxHeight = Math.ceil(num / side);

  const repoCubes: BuildingDetails[] = rep.map((element, index, array) => {
    return {
      repo: element,
      position: new Vector3(
        getColumn(index, side) - (side - 1) / 2,
        0,
        getRow(index, side) - (maxHeight - 1) / 2
      ),
      distribution: getNeighborsHelper(index, num, side),
      index: index,
    };
  });

  console.log(side, maxHeight, repoCubes);

  return (
    <>
      {rep
        ? repoCubes.map((element, index) => (
            <Building key={index} buildingDetails={element}></Building>
          ))
        : null}
      {/* <mesh
        receiveShadow
        rotation={[0.5 * Math.PI, 0, 0]}
        position={[0, -0.01, 0]}
      >
        <circleGeometry args={[Math.sqrt(2 * (maxHeight / 2) ** 2), 25]} />
        <meshStandardMaterial color={"#444444"} side={DoubleSide} />
      </mesh> */}
      <Airvehicle
        distance={Math.sqrt(2 * (maxHeight / 2) ** 2)}
        height={maxHeight / 2}
      />
      <Base scale={Math.sqrt(2 * (maxHeight / 2) ** 2)}></Base>
    </>
  );
};

export default UserIsland;
