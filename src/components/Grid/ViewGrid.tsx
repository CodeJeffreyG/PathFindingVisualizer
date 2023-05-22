import React, { useState, useContext, useEffect } from "react";
import { resetGridAndRunAlgorithm } from "../../Helpers/gridUtils/resetGridRunAlgo";
import { Node, AlgorithmContextProps } from "../../Helpers/types/types";
import { AlgorithmContext } from "../../Helpers/useContext/AlgorithmProvider";
import { AlgorithmContextProvider } from "../../Helpers/useContext/AlgorithmProvider";
interface Props {
  grid: Node[][];
}

const ViewGrid: React.FC<Props> = ({ grid }) => {
  const [viewGrid, setViewGrid] = useState<Node[][]>(grid);
  const algorithmContext = useContext(AlgorithmContext);

  const { isAlgorithmRunning, setAlgorithmRunning } =
    algorithmContext || ({} as AlgorithmContextProps);

  useEffect(() => {
    console.log(isAlgorithmRunning, "super swag");
  }, [isAlgorithmRunning]);

  const [mouseClick, setMouseClick] = useState<boolean>(false);
  const [currentNode, setCurrentNode] = useState<Node>({
    isWall: false,
    isStart: false,
    isFinish: false,
    isVisited: false,
    previousNode: null,
    row: 4,
    col: 4,
    count: 0,
    backTracked: false,
  });

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
      let newNode = { ...tempGrid[parsedId[0]][parsedId[1]] };

      let startNode = tempGrid[currentNode.row][currentNode.col];
      newNode.isWall = startNode.isWall;
      newNode.isStart = startNode.isStart;
      newNode.isFinish = startNode.isFinish;

      tempGrid[parsedId[0]][parsedId[1]] = newNode;

      setViewGrid(tempGrid);
      setCurrentNode(newNode);
    }
  };

  return (
    <>
      <AlgorithmContextProvider>
        {viewGrid.map((row: Node[], rowIndex: number) => (
          <div className="rowContainer" key={rowIndex}>
            {row.map((col: Node, colIndex: number) => (
              <div
                onClick={changeState}
                key={colIndex}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseEnter={(e) => onMouseEnter(e)}
                style={{
                  backgroundColor: col.isStart
                    ? "green"
                    : col.isFinish
                    ? "red"
                    : col.isWall
                    ? "black"
                    : col.isVisited
                    ? "blue"
                    : col.backTracked
                    ? "gold"
                    : "rgb(71 85 105)",
                }}
                className="node"
                id={`${col.row},${col.col}`}
              />
            ))}
          </div>
        ))}
        <button
         onClick={() => {
          if (algorithmContext && !algorithmContext.isAlgorithmRunning) {
            resetGridAndRunAlgorithm(
              grid,
              setViewGrid,
              algorithmContext.isAlgorithmRunning,
              algorithmContext.setAlgorithmRunning
            );
          }
        }}
        disabled ={algorithmContext?.isAlgorithmRunning}
        >
          start
        </button>
      </AlgorithmContextProvider>
    </>
  );
};

export default ViewGrid;
