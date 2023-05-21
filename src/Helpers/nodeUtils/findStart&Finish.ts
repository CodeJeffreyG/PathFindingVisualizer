import { Node } from "../types/types";

export const getStartAndFinishNodes = (
  grid: Array<Array<Node>>
): { startNode: Node | null; finishNode: Node | null } => {
  let startNode: Node | null = null;
  let finishNode: Node | null = null;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const currentNode = grid[row][col];

      if (currentNode.isStart) {
        startNode = currentNode;
      } else if (currentNode.isFinish) {
        finishNode = currentNode;
      }

      if (startNode && finishNode) {
        // Found both start and finish nodes, no need to continue iterating
        return { startNode, finishNode };
      }
    }
  }

  return { startNode, finishNode };
};
