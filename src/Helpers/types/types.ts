export interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  previousNode: Node | null;
  row: number;
  col: number;
  count: number;
  backTracked: boolean;
}

export interface AlgorithmContextProps {
  isAlgorithmRunning?: boolean | null;
  setAlgorithmRunning: (running: boolean) => void;
}
