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

const dfsFastestPathBack = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  upDownLeftRight: Array<[number, number]>
) => {
  // Find the start and finish nodes
  const startNode = grid
    .find((row) => row.find((node) => node.isStart))!
    .find((node) => node.isStart)!;
  const finishNode = grid
    .find((row) => row.find((node) => node.isFinish))!
    .find((node) => node.isFinish)!;

  // Keep track of the fastest path back to the start node
  const fastestPathBack: Array<Node> = [];

  // Define the DFS algorithm to traverse the graph from the finish node back to the start node
  const dfs = (currentNode: Node) => {
    // If we have reached the start node, add it to the fastest path back and return
    if (currentNode.isStart) {
      fastestPathBack.push(currentNode);
      return;
    }

    // Mark the current node as part of the fastest path back
    fastestPathBack.push(currentNode);

    // Mark the node as visited and update the grid state
    currentNode.isVisited = false;
    currentNode.backTracked = true;
    let tempGrid = [...grid];
    tempGrid[currentNode.row][currentNode.col] = currentNode;
    setGrid(tempGrid);

    // Check each neighbor of the current node
    for (const [i, j] of upDownLeftRight) {
      // Get the neighbor node
      const neighborRow = currentNode.row + i;
      const neighborCol = currentNode.col + j;
      const neighborNode = grid[neighborRow]?.[neighborCol];

      // If the neighbor node is valid and has a lower count, call DFS on it
      if (
        neighborNode &&
        neighborNode.count < currentNode.count &&
        !neighborNode.isWall
      ) {
        dfs(neighborNode);
        return;
      }
    }

    // If we have not returned yet, we have no valid neighbor to go to
    // Remove the current node from the fastest path back and backtrack
    fastestPathBack.pop();
    dfs(fastestPathBack[fastestPathBack.length - 1]);
  };

  // Call the DFS algorithm with the finish node
  dfs(finishNode);

  // Mark the nodes in the fastest path back as part of the path
  for (const node of fastestPathBack) {
    node.backTracked = true;
    let tempGrid = [...grid];
    tempGrid[node.row][node.col] = node;
    setGrid(tempGrid);
  }
};

const Dfs = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>
) => {
  // Find the starting node with the 'isStart' property set to true
  const startNode = grid.flatMap((row) =>
    row.filter((node) => node.isStart)
  )[0];

  // If the starting node is not found, log an error message and return
  if (!startNode) {
    console.error("Starting node not found!");
    return;
  }

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

  // Define the dfs function
  const dfs = () => {
    while (stack.length !== 0) {
      // Pop the next node and count off the stack
      let [currentNode, walkedSteps]: any = stack.pop();

      // If the node is undefined, return
      if (!currentNode) return;

      // If the node is the finish node, return
      if (currentNode.isFinish) {
        dfsFastestPathBack(grid, setGrid, upDownLeftRight)
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
    }
  };

  // Call dfs with setTimeout to continue the DFS algorithm every 10ms
  setTimeout(dfs, 10);
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
