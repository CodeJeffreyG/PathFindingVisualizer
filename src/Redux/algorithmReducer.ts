// algorithmReducer.js

const initialState = {
  isAlgorithmRunning: false,
};

const algorithmReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "START_ALGORITHM":
      return {
        ...state,
        isAlgorithmRunning: true,
      };
    case "STOP_ALGORITHM":
      return {
        ...state,
        isAlgorithmRunning: false,
      };
    default:
      return state;
  }
};

export default algorithmReducer;
