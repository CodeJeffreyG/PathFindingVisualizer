import React, { createContext } from "react";

interface AlgorithmContextProps {
  isAlgorithmRunning: boolean;
  setAlgorithmRunning: (running: boolean) => void;
}

const AlgorithmContext = createContext<AlgorithmContextProps | null>(null);

export default AlgorithmContext;
