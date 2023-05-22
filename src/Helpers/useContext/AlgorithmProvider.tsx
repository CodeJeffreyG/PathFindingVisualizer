import React, { createContext, useState } from "react";

interface AlgorithmContextProps {
  isAlgorithmRunning: boolean;
  setAlgorithmRunning: (running: boolean) => void;
}

const AlgorithmContext = createContext<AlgorithmContextProps | null>(null);

interface AlgorithmContextProviderProps {
  children: React.ReactNode;
}

const AlgorithmContextProvider: React.FC<AlgorithmContextProviderProps> = ({
  children,
}) => {
  const [isAlgorithmRunning, setAlgorithmRunning] = useState<boolean>(false);

  return (
    <AlgorithmContext.Provider
      value={{ isAlgorithmRunning, setAlgorithmRunning }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export { AlgorithmContext, AlgorithmContextProvider };
