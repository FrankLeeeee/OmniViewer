import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const consoleMessages = (store) => (next) => (action) => {
  let result;

  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log("State before:", store.getState());
  result = next(action);

  console.log("Current state", store.getState());

  console.groupEnd();

  return result;
};

export default applyMiddleware(thunk, consoleMessages)(createStore)(reducer);
