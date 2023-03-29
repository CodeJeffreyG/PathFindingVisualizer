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
    if (!currentNode) return;
    if (currentNode.isFinish) return;
    currentNode.isVisited = true;

    let tempGrid = [...grid];
    setGrid(tempGrid);

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        if (check(currentNode.row + i, currentNode.col + j, grid)) {
          stack.push(grid[currentNode.row + i][currentNode.col + j]);
        }
      }
    }

    // console.log(currentNode);
  }
};

const check = (
  row: number,
  col: number,
  grid: Array<Array<Node>>
): boolean | void => {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;

  const currentNode = grid[row][col];
  const correctCriteria =
    !currentNode.isWall && !currentNode.isStart && !currentNode.isVisited;

  return correctCriteria;
};

export default Dfs;
