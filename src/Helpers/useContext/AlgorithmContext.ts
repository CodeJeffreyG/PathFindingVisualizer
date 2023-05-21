import React from "react";

interface AlgorithmContextProps {
  isAlgorithmRunning: boolean;
  setAlgorithmRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlgorithmContext = React.createContext<AlgorithmContextProps | null>(
  null
);

export default AlgorithmContext;
