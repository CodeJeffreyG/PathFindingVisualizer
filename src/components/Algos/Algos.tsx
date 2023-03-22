import React from "react";
import "./algos.css";

const Algos = () => {
  let grid: any = [];
  const node = {
    isWall: false,
    isStart: false,
    isFinish: false,
  };

  const createGrid = () => {
    for (let row = 0; row < 9; row += 1) {
      let elementsArray = [];

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
      {row.map((col: any) => (
        <div className="node"></div>
      ))}
    </div>
  ));

  return <div className="gridContainer">{displayGrid}</div>;
};

export default Algos;
