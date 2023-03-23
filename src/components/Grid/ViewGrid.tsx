import React, { useState } from "react";

import "./grid.css";

interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  row: number | null;
  col: number | null;
}

interface Props {
  grid: Node[][];
}

const ViewGrid: React.FC<Props> = ({ grid }) => {
  const [viewGrid, setViewGrid] = useState(grid);

  const changeState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let tempGrid = [...viewGrid];
    console.log(currentId);
    tempGrid[parsedId[0]][parsedId[1]].isWall = true;
    setViewGrid(tempGrid);
  };

  console.log(viewGrid);

  return (
    <>
      {viewGrid.map((row: Node[], rowIndex: number) => (
        <div className="rowContainer" key={rowIndex}>
          {row.map((col: Node, colIndex: number) => (
            <div
              onClick={changeState}
              key={colIndex}
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
      ))}
    </>
  );
};

export default ViewGrid;
