import React from "react";
import AlgorithmContext from "./AlgorithmContext";

interface AlgorithmProviderProps {
  children: React.ReactNode;
}

const AlgorithmProvider: React.FC<AlgorithmProviderProps> = ({ children }) => {
  const [isAlgorithmRunning, setAlgorithmRunning] = React.useState(false);

  return (
    <AlgorithmContext.Provider
      value={{ isAlgorithmRunning, setAlgorithmRunning }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export default AlgorithmProvider;
