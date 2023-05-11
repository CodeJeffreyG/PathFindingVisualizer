import React, { useEffect, useState } from "react";
import ViewGrid from "./ViewGrid";
import "./grid.css";

//file simply meant to initalize grid and export it.

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

const Grid: React.FC = () => {
  let grid: Array<Array<Node>> = [];

  const node: Node = {
    isWall: false,
    isStart: false,
    isFinish: false,
    isVisited: false,
    row: 0,
    col: 0,
    count: 0,
    backTracked: false,
  };

  const createGrid = () => {
    for (let row = 0; row < 9; row += 1) {
      let elementsArray: Array<Node> = [];

      for (let col = 0; col < 25; col += 1) {
        if (row === 4 && col === 4)
          elementsArray.push({ ...node, row: row, col: col, isStart: true });
        else if (row === 4 && col === 20)
          elementsArray.push({ ...node, row: row, col: col, isFinish: true });
        else elementsArray.push({ ...node, row: row, col: col });
      }

      grid.push(elementsArray);
    }
  };

  createGrid();

  const displayGrid: React.ReactElement = <ViewGrid grid={grid} />;

  return <div className="gridContainer">{displayGrid}</div>;
};

export default Grid;
