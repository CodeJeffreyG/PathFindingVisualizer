import React from "react";
import "./grid.css";

interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  row: number | null;
  col: number | null;
}

const Algos = () => {

  const grid: Array<Node> = [];

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
        let rowAndCol = `${row},${col}`;
        elementsArray.push({ ...node, row: row, col: col });
      }
      grid.push(elementsArray);
    }
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

  createGrid();

  const displayGrid = grid.map((row: any) => (
    <div className="rowContainer">
      {row.map((col: {}) => (
        <div className="node" ></div>
      ))}
    </div>
  ));

  return <div className="gridContainer">{displayGrid}</div>;
};

export default Algos;
