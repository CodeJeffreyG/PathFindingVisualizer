import React from "react";

const Algos = () => {
  

  let grid: any = [];
  const node = {};

  const createGrid = () => {
    for (let row = 0; row < 50; row += 1) {
      let elementsArray = [];

      for (let col = 0; col < 50; col += 1) {
        elementsArray.push(node);
      }
      grid.push(elementsArray);
    }
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

  createGrid();

  console.log(grid);

  return <div>Algos</div>;
};

export default Algos;
