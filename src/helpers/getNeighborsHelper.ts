export const getColumn = (index: number, side: number) => {
  return index % side;
};

export const getRow = (index: number, side: number) => {
  return Math.floor(index / side);
};

const assignCellType = (neighbors: boolean[], index: number, side: number) => {
  if (neighbors[0] && neighbors[1] && neighbors[2] && neighbors[3])
    return "allNeighbors";
  if (neighbors[0] && !neighbors[2] && !neighbors[3] && !neighbors[1])
    return "end";

  if (!neighbors[0] && !neighbors[3]) return "downRight";
  if (!neighbors[1] && !neighbors[2]) {
    if (getColumn(index, side) === side - 1) return "upLeft";
    return "upLeftEnd";
  }
  if (!neighbors[0] && !neighbors[1]) return "downLeft";
  if (!neighbors[2] && !neighbors[3]) return "upRight";

  if (!neighbors[0] && neighbors[2]) return "downLeftRight";
  if (!neighbors[1] && neighbors[3]) return "upDownLeft";
  if (!neighbors[3] && neighbors[1]) return "upDownRight";
  if (!neighbors[2] && neighbors[0]) return "upLeftRight";

  return "all";
};

const getNeighborsHelper = (index: number, num: number, side: number) => {
  //Assign neighbors to array
  const down = index + side < num;
  const right =
    index + 1 < num && getRow(index, side) === getRow(index + 1, side);
  const up = index - side >= 0;
  const left = getRow(index, side) === getRow(index - 1, side);

  return {
    neighbors: [up, right, down, left],
    cellType: assignCellType([up, right, down, left], index, side),
  };
};

export default getNeighborsHelper;
