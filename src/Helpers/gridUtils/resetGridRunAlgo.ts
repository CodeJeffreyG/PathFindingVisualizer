import { Node } from "../types/types";
import { clearGrid } from "./clearGrid";
import { getStartAndFinishNodes } from "../nodeUtils/findStart&Finish";
import { Bfs } from "./Algos";

export const resetGridAndRunAlgorithm = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  isAlgorithmRunning: boolean | null,
  setAlgorithmRunning: (running: boolean) => void
) => {
  if (isAlgorithmRunning) {
    return; // Skip the execution if algorithm is already running
  }

  const toggleAlgorithmRunning = (running: boolean) => {
    setAlgorithmRunning(running);
    console.log("resetGridAndRunAlgorithm", isAlgorithmRunning);
  };

  toggleAlgorithmRunning(true);

  const { startNode, finishNode } = getStartAndFinishNodes(grid);

  if (startNode && finishNode) {
    const resetGrid = clearGrid(startNode, finishNode);
    setGrid(resetGrid);

    const runBfs = () => {
      Bfs(resetGrid, setGrid);
      toggleAlgorithmRunning(false);
    };

    // Delay the execution of BFS to allow state update
    setTimeout(runBfs, 0);
  } else {
    console.log("Start or finish node not found.");
    toggleAlgorithmRunning(false); // Reset the algorithm running state if start or finish node is not found
  }
};
