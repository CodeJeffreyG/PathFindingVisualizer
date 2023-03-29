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

    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        if (check(currentNode.row + i, currentNode.col + j, grid)) {
          stack.push(grid[currentNode.row + i][currentNode.col + j]);
        }
      }
    }

    console.log(currentNode);
  }
};

const check = (row: number, col: number, grid: Array<Array<Node>>): boolean => {
  if (grid[row][col] === undefined) return false;
  const inbounds = row >= 0 && row <= 7 && col >= 0 && col <= 25;
  const correctCriteria =
    !grid[row][col].isWall &&
    !grid[row][col].isStart &&
    !grid[row][col].isVisited;

  if (inbounds && correctCriteria) return true;

  return false;
};

export default Dfs;
