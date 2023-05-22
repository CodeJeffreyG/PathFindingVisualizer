import React from "react";
import { AlgorithmContextProvider } from "./Helpers/useContext/AlgorithmProvider";
import { Grid } from "./components/Grid/Grid";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <AlgorithmContextProvider>
      <div>
        <NavBar />
        <Grid />;
      </div>
    </AlgorithmContextProvider>
  );
}

export default App;
