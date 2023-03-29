import React, { useState, useEffect } from "react";
import Dfs from "./Algos";
import "./grid.css";

interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  row: number;
  col: number;
}

interface Props {
  grid: Node[][];
}

const ViewGrid: React.FC<Props> = ({ grid }) => {
  const [viewGrid, setViewGrid] = useState<Node[][]>(grid);
  const [currentNode, setCurrentNode] = useState<Node>({
    isWall: false,
    isStart: true,
    isFinish: false,
    isVisited: false,
    row: 4,
    col: 4,
  });

  const fixStartNode = () => {
    let tempGrid = [...viewGrid];
    let startNode = {
      isWall: false,
      isStart: true,
      isFinish: false,
      isVisited: false,
      row: 4,
      col: 4,
    };

    for (let row = 0; row < tempGrid.length; row += 1) {
      for (let col = 0; col < tempGrid[0].length; col += 1) {
        if (grid[row][col].isStart) startNode = grid[row][col];
      }
    }

    setCurrentNode(startNode);
  };

  const [mouseClick, setMouseClick] = useState<boolean>(false);

  const changeState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let tempGrid = [...viewGrid];
    let node = tempGrid[parsedId[0]][parsedId[1]];
    if (node.isStart || node.isFinish) return;

    node.isWall = !node.isWall;
    setViewGrid(tempGrid);
  };

  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let node = viewGrid[parsedId[0]][parsedId[1]];

    if (node.isStart || node.isFinish) {
      setCurrentNode(node);
      setMouseClick(true);
    }
    // console.log(node);
  };

  const mouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMouseClick(false);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseClick) {
      const currentId = e.currentTarget.id;
      let parsedId = currentId.split(",").map((x) => Number(x));

      let tempGrid = [...viewGrid];

      let node = viewGrid[parsedId[0]][parsedId[1]]; //Node to switch
      let startNode = tempGrid[currentNode.row][currentNode.col]; //node with start

      tempGrid[currentNode.row][currentNode.col] = {
        ...startNode,
        isWall: node.isWall,
        isStart: node.isStart,
        isFinish: node.isFinish,
      };
      tempGrid[parsedId[0]][parsedId[1]] = {
        ...node,
        isWall: startNode.isWall,
        isStart: startNode.isStart,
        isFinish: startNode.isFinish,
      };

      setViewGrid(tempGrid);

      setCurrentNode(node);
      if (node.isFinish) fixStartNode();
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
              onMouseEnter={(e) => onMouseEnter(e)}
              style={
                col.isStart
                  ? { backgroundColor: "green" }
                  : col.isFinish
                  ? { backgroundColor: "red" }
                  : col.isWall
                  ? { backgroundColor: "black" }
                  : col.isVisited
                  ? { backgroundColor: "blue" }
                  : { backgroundColor: "rgb(71 85 105)" }
              }
              className="node"
              id={`${col.row},${col.col}`}
            ></div>
          ))}
        </div>
      ))}
      <button onClick={() => Dfs(viewGrid, setViewGrid, currentNode)}>
        start
      </button>
    </>
  );
};

export default ViewGrid;
