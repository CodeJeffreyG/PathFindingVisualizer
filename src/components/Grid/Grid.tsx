import React, { useEffect, useState } from "react";
import ViewGrid from "./ViewGrid";
import "./grid.css";

// start 1 finish 1 wall *

interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  row: number | null;
  col: number | null;
}

const Algos = () => {
  const [start, setStart] = useState("");

  let grid: Array<Node> = [];

  const node: Node = {
    isWall: false,
    isStart: false,
    isFinish: false,
    row: null,
    col: null,
  };

  const createGrid = () => {
    for (let row = 0; row < 9; row += 1) {
      let elementsArray: Array<Node> | any = [];

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

  const displayGrid = <ViewGrid grid={grid} />;

  return <div className="gridContainer">{displayGrid}</div>;
};

export default Algos;
