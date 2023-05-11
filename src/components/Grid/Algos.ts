interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  row: number;
  col: number;
  count: number;
}

const dfsTraverseBackToStart = async (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  upDownLeftRight: Array<number>
) => {
  const startNode = grid
    .map((row) => row.find((col) => col.isStart))
    .filter((x) => x)[0];

  const finishNode = grid
    .map((row) => row.find((col) => col.isFinish))
    .filter((x) => x)[0];

  const stack = [finishNode];

  while (stack.length !== 0) {
    let currentNode: any = stack.pop();
    if (!currentNode.row) return;
    return;
  }

  console.log(startNode, finishNode);
};

const Dfs = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>
) => {
  const startNode = grid
    .map((row) => row.find((col) => col.isStart))
    .filter((x) => x)[0];
  let count = 0;

  //updown left and right all the correct indexes.
  const upDownLeftRight: any = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const stack = [[startNode, count]];

  const dfsTimeout = () => {
    let [currentNode, walkedSteps]: any = stack.pop();
    if (!currentNode) return;
    if (currentNode.isFinish) return;

    currentNode.isVisited = true;

    currentNode.count = walkedSteps;

    let tempGrid = [...grid];
    tempGrid[currentNode.row][currentNode.col] = currentNode;
    setGrid(tempGrid);

    for (let arr of upDownLeftRight) {
      //deconstructing the indexes
      const [i, j] = arr;
      if (check(currentNode.row + i, currentNode.col + j, grid)) {
        stack.push([
          grid[currentNode.row + i][currentNode.col + j],
          walkedSteps + 1,
        ]);
      }
    }

    // Call dfsTimeout after 1 second
    setTimeout(dfsTimeout, 10);
  };

  // Start the DFS loop
  dfsTimeout();
};

//checks if each node is a valid index in the graph, also checks if node is a valid type of node
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

const checkBackTrack = (
  row: number,
  col: number,
  grid: Array<Array<Node>>
): boolean | void => {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;

  const currentNode = grid[row][col];
  const correctCriteria =
    !currentNode.isWall && !currentNode.isStart && currentNode.isVisited;

  return correctCriteria;
};

export default Dfs;

// let arr = [9, 5, 9, 5, 1, 1, 1];

// const fuckingGayFunction = (arr: any) => {
//     let bigArray = [];
//     let i = 0;

//     while(i !== arr.length) {
//         let subArray = [];

//         for(let j = i; j < i + 3; j += 1) {
//             if(arr[j] === undefined) break;
//             subArray.push(arr[j]);
//         }

//         if(subArray.length === 3) bigArray.push(subArray)
//         i += 1
//     }

//     return bigArray
// }

// console.log(fuckingGayFunction(arr));
