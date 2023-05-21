import { Node } from "../types/types";
import { clearGrid } from "./clearGrid";
import { getStartAndFinishNodes } from "../nodeUtils/findStart&Finish";
import { Bfs } from "../gridUtils/Algos";

export const resetGridAndRunAlgorithm = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>
) => {
  const { startNode, finishNode } = getStartAndFinishNodes(grid);
  if (startNode && finishNode) {
    const resetGrid = clearGrid(startNode, finishNode);
    setGrid(resetGrid);
    Bfs(resetGrid, setGrid);
  } else {
    console.log("Start or finish node not found.");
  }
};
