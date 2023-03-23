import React, { useState } from "react";

import "./grid.css";

interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  row: number | null;
  col: number | null;
}

const ViewGrid = ({ grid }: any) => {
  const [viewGrid, setViewGrid] = useState(grid);

  const changeState = (e: any) => {
    const currentId = e.target.id;
    let parsedId = currentId.split(",");
    let tempGrid = [...viewGrid];
    console.log(e.target.id);
    tempGrid[parsedId[0]][parsedId[1]].isWall = true;
    setViewGrid(tempGrid);
  };

  console.log(viewGrid);

  return viewGrid.map((row: any) => (
    <div className="rowContainer">
      {row.map((col: Node) => (
        <div
          onClick={changeState}
          style={
            col.isStart === true
              ? { backgroundColor: "green" }
              : col.isFinish === true
              ? { backgroundColor: "red" }
              : col.isWall === true
              ? { backgroundColor: "black" }
              : { backgroundColor: "rgb(71 85 105)" }
          }
          className="node"
          id={`${col.row},${col.col}`}
        ></div>
      ))}
    </div>
  ));
};

export default ViewGrid;
