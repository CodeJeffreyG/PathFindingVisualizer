import ViewGrid from "./ViewGrid";

const Dfs = (grid: any, setGrid: any, startNode: any) => {
  const stack = [startNode];

  while (stack.length !== 0) {
    let currentNode = stack.pop();
    if (currentNode.isFinish) return;
    currentNode.isVisited = true;

    let tempGrid = [...grid];
    setGrid(tempGrid);

    for (let i = 0; i <= 1; i += 1)
      for (let j = 0; j <= 1; j += 1)
        if (check(currentNode.row + i, currentNode.col + j, grid) || grid[currentNode.row + i][currentNode.col + j].isFinish) {
          //   console.log(grid[currentNode.row + i][currentNode.col + j]);
          stack.push(grid[currentNode.row + i][currentNode.col + j]);
        }
    console.log(currentNode);
  }
};

const check = (row: number, col: number, grid: any) => {
  let inbounds = row >= 0 && row <= 8 && col >= 0 && col < 25;

  if (inbounds)
    if (
      !grid[row][col].isWall &&
      !grid[row][col].isStart &&
      !grid[row][col].isVisited
    )
      return true;

  return false;
};

export default Dfs;
