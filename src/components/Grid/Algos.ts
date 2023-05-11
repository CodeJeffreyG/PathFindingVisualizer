interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  row: number;
  col: number;
  count: number;
  backTracked: boolean;
}

let dfsRunning = false;

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
  // Check if DFS is already running
  if (dfsRunning) {
    console.log("DFS is already running!");
    return;
  }

  // Find the starting node
  const startNode = grid
    .map((row) => row.find((col) => col.isStart))
    .filter((x) => x)[0];

  // Initialize the count variable and the upDownLeftRight array
  let count = 0;
  const upDownLeftRight: any = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  // Initialize the stack with the starting node and count
  const stack = [[startNode, count]];

  // Define the recursive dfsTimeout function
  const dfsTimeout = () => {
    // Pop the next node and count off the stack
    let [currentNode, walkedSteps]: any = stack.pop();

    // If the node is undefined, return
    if (!currentNode) return;

    // If the node is the finish node, return
    if (currentNode.isFinish) {
      dfsRunning = false;
      return;
    }

    // Mark the node as visited and set its count property
    currentNode.isVisited = true;
    currentNode.count = walkedSteps;

    // Update the grid state to reflect the changes to the node
    let tempGrid = [...grid];
    tempGrid[currentNode.row][currentNode.col] = currentNode;
    setGrid(tempGrid);

    // Check each neighbor of the current node
    for (let arr of upDownLeftRight) {
      // Deconstruct the indexes of the neighbor
      const [i, j] = arr;

      // If the neighbor is a valid node, add it to the stack with an increased count
      if (check(currentNode.row + i, currentNode.col + j, grid)) {
        stack.push([
          grid[currentNode.row + i][currentNode.col + j],
          walkedSteps + 1,
        ]);
      }
    }

    // Call dfsTimeout again after 10ms to continue the DFS algorithm
    setTimeout(dfsTimeout, 10);
  };

  // Set the dfsRunning flag to true before starting the DFS algorithm
  dfsRunning = true;

  // Call dfsTimeout to start the DFS algorithm
  dfsTimeout();
};

//checks if each node is a valid index in the graph, also checks if node is a valid type of node
const check = (
  row: number,
  col: number,
  grid: Array<Array<Node>>
): boolean | void => {
  // Check if the row and column are within the grid bounds
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;

  // Get the current node and check if it meets the criteria to be included in the DFS algorithm
  const currentNode = grid[row][col];
  const correctCriteria =
    !currentNode.isWall && !currentNode.isStart && !currentNode.isVisited;

  // Return true if the current node meets the criteria, false otherwise
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
