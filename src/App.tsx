import React from "react";
import AlgorithmProvider from "./Helpers/useContext/AlgorithmProvider";
import { Grid } from "./components/Grid/Grid";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <AlgorithmProvider>
      <div>
        <NavBar />
        <Grid />;
      </div>
    </AlgorithmProvider>
  );
}

export default App;
