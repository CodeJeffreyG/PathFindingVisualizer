interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  row: number;
  col: number;
}

const Dfs = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  startNode: Node
) => {
  const stack = [startNode];

  while (stack.length !== 0) {
    let currentNode = stack.pop();
    if (!currentNode) continue;
    if (currentNode.isFinish) return;
    currentNode.isVisited = true;

    let tempGrid = [...grid];
    setGrid(tempGrid);

    for (let i = 0; i <= 1; i += 1)
      for (let j = 0; j <= 1; j += 1)
        if (check(currentNode.row + i, currentNode.col + j, grid)) {
          stack.push(grid[currentNode.row + i][currentNode.col + j]);
        }
    console.log(currentNode);
  }
};

const check = (row: number, col: number, grid: Array<Array<Node>>): boolean => {
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
