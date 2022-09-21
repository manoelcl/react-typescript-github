import { DoubleSide } from "three";
import { Repo } from "../types";
import colors from "../github-language-colors.json";

export interface UserIslandProps {
  rep: Repo[];
}
interface colorObject {
  color: string | null;
  url: string;
}
interface dictionary {
  [key: string]: colorObject;
}

const UserIsland: React.FC<UserIslandProps> = ({ rep }) => {
  const num = rep.length;
  const side = Math.round(Math.sqrt(num));
  const maxHeight = Math.ceil(num / side);

  const colorDictionary: dictionary = colors;
  console.log(colorDictionary);

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
            <mesh
              castShadow
              key={index}
              position={[
                element[0],
                Math.log10(rep[index].size) / 2,
                element[2],
              ]}
            >
              <boxGeometry args={[0.3, Math.log10(rep[index].size), 0.3]} />
              <meshStandardMaterial
                color={colorDictionary[rep[index].language]?.color || "grey"}
              />
            </mesh>
          ))
        : null}
      <mesh
        receiveShadow
        rotation={[0.5 * Math.PI, 0, 0]}
        position={[0, -0.01, 0]}
      >
        <circleGeometry
          args={[
            Math.sqrt(
              (maxHeight / 2) * (maxHeight / 2) +
                (maxHeight / 2) * (maxHeight / 2)
            ),
            25,
          ]}
        />
        <meshStandardMaterial color={"#444444"} side={DoubleSide} />
      </mesh>
    </>
  );
};

export default UserIsland;
