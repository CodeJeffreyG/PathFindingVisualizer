import { Node } from "./types/types";
import { createGrid } from "../components/Grid/Grid";

export const clearGrid = (
  startNode: Node = createGrid()[4][4],
  finishNode: Node = createGrid()[4][20]
) => {
  const grid: Array<Array<Node>> = [];

  for (let row = 0; row < 9; row += 1) {
    const elementsArray: Array<Node> = [];

    for (let col = 0; col < 25; col += 1) {
      const node: Node = {
        isWall: false,
        isStart: false,
        isFinish: false,
        isVisited: false,
        previousNode: null,
        row,
        col,
        count: 0,
        backTracked: false,
      };

      if (row === startNode.row && col === startNode.col) {
        elementsArray.push({ ...node, isStart: true });
      } else if (row === finishNode.row && col === finishNode.col) {
        elementsArray.push({ ...node, isFinish: true });
      } else {
        elementsArray.push(node);
      }
    }

    grid.push(elementsArray);
  }

  return grid;
};