import React from "react";
import { render } from "react-dom";
import MyRouter from "./router";
import reducer from "./redux/reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const consoleMessages = (store) => (next) => (action) => {
  let result;

  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log("State before:", store.getState());
  result = next(action);

  console.log("Current state", store.getState());

  console.groupEnd();

  return result;
};

const store = applyMiddleware(thunk, consoleMessages)(createStore)(reducer);
window.store = store;

render(
  <Provider store={store}>
    <MyRouter />
  </Provider>,
  document.getElementById("root")
);
