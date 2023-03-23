import React from "react";
import "./navbar.css";
import { Algos, Speed } from "../SelectBox/SelectBox";

const NavBar = () => {
  return (
    <nav>
      <div>Path-Finding Visualizer</div>
      <ul>
        <li>
          <Algos />
        </li>
        <li>
          <Speed />
        </li>
        <li>placeholder</li>
        <li>placeholder</li>
      </ul>
    </nav>
  );
};

export default NavBar;
