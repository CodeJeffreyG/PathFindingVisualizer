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
  const startNode = grid
    .map((row) => row.find((col) => col.isStart))
    .filter((x) => x)[0];

  const finishNode = grid
    .map((row) => row.find((col) => col.isFinish))
    .filter((x) => x)[0];

  // Initialize the stack with the finish node and count
  const stack = [[finishNode, 0]];

  // Define the dfs function that will be called with setTimeout
  const dfs = () => {
    // If the stack is empty, return
    if (stack.length === 0) return;

    // Pop the next node and count off the stack
    let [currentNode, walkedSteps]: any = stack.pop();

    // If the node is undefined, call dfs again with setTimeout
    if (!currentNode) {
      setTimeout(dfs, 10);
      return;
    }

    // If the node is the start node, color the fastest path back and return
    if (currentNode.isStart) {
      let tempGrid = [...grid];
      let currentNode = startNode;
      while (currentNode && !currentNode.isFinish) {
        currentNode.backTracked = true;
        let row = currentNode.row;
        let col = currentNode.col;
        currentNode = grid[row][col].count
          .map((n) => upDownLeftRight[n])
          .map(([i, j]) => grid[row + i][col + j])
          .find((n) => n.count.includes(n.count.indexOf(walkedSteps) - 1));
      }
      setGrid(tempGrid);
      return;
    }

    // Mark the node as visited
    currentNode.isVisited = true;

    // Update the grid state to reflect the changes to the node
    let tempGrid = [...grid];
    tempGrid[currentNode.row][currentNode.col] = currentNode;
    setGrid(tempGrid);

    // Check each neighbor of the current node
    for (let arr of upDownLeftRight) {
      // Deconstruct the indexes of the neighbor
      const [i, j] = arr;

      // If the neighbor is a valid node, add it to the stack with an increased count
      if (checkBackTrack(currentNode.row + i, currentNode.col + j, grid)) {
        stack.push([
          grid[currentNode.row + i][currentNode.col + j],
          walkedSteps + 1,
        ]);
      }
    }

    // Call dfs again with setTimeout after 1000ms to continue the DFS algorithm
    setTimeout(dfs, 10);
  };

  // Call dfs to start the DFS algorithm
  dfs();
};

const Dfs = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>
) => {
  // Find the starting node
  const startNode = grid
    .map((row) => row.find((col) => col.isStart))
    .filter((x) => x)[0];

  // Initialize the count variable and the upDownLeftRight array
  let count = 0;
  const upDownLeftRight: Array<[number, number]> = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  // Initialize the stack with the starting node and count
  const stack = [[startNode, count]];

  // Define the dfs function that will be called with setTimeout
  const dfs = () => {
    // If the stack is empty, return
    if (stack.length === 0) return;

    // Pop the next node and count off the stack
    let [currentNode, walkedSteps]: any = stack.pop();

    // If the node is undefined, call dfs again with setTimeout
    if (!currentNode) {
      setTimeout(dfs, 10);
      return;
    }

    // If the node is the finish node, return
    if (currentNode.isFinish) {
      dfsFastestPathBack(grid, setGrid, upDownLeftRight);
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

    // Call dfs again with setTimeout after 1000ms to continue the DFS algorithm
    setTimeout(dfs, 10);
  };

  // Call dfs to start the DFS algorithm
  dfs();
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
