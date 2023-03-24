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
  const [currentNode, setCurrentNode] = useState<any>({
    isWall: false,
    isStart: false,
    isFinish: false,
    row: 4,
    col: 4,
  });

  const [mouseClick, setMouseClick] = useState<boolean>(false);

  const changeState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let tempGrid = [...viewGrid];
    console.log(currentId);
    tempGrid[parsedId[0]][parsedId[1]].isWall = true;
    setViewGrid(tempGrid);
  };

  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let node = viewGrid[parsedId[0]][parsedId[1]];

    if ((node.isStart || node.isFinish) && !node.isWall) {
      setCurrentNode(node);
      setMouseClick((prevMouseClick) => (prevMouseClick = true));
    }
  };

  const mouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let node = viewGrid[parsedId[0]][parsedId[1]];

    if ((node.isStart || node.isFinish) && !node.isWall) {
      setMouseClick((prevMouseClick) => (prevMouseClick = false));
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseClick) {
      const currentId = e.currentTarget.id;
      let parsedId = currentId.split(",").map((x) => Number(x));
      let node = viewGrid[parsedId[0]][parsedId[1]];

      let tempGrid = [...viewGrid];
      tempGrid[currentNode.row][currentNode.col] = { ...node };
      tempGrid[parsedId[0]][parsedId[1]] = { ...currentNode };

      setViewGrid(tempGrid);
    }
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseClick) {
      const currentId = e.currentTarget.id;
      let parsedId = currentId.split(",").map((x) => Number(x));
      let node = viewGrid[parsedId[0]][parsedId[1]];
      setCurrentNode({ ...node, isStart: true });
    }
  };

  return (
    <>
      {viewGrid.map((row: Node[], rowIndex: number) => (
        <div className="rowContainer" key={rowIndex}>
          {row.map((col: Node, colIndex: number) => (
            <div
              onClick={changeState}
              key={colIndex}
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
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
