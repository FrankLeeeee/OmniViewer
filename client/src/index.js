import React from "react";
import { render } from "react-dom";
import MyRouter from "./router";
import store from "./redux/store";
import { Provider } from "react-redux";

window.store = store;

render(
  <Provider store={store}>
    <MyRouter />
  </Provider>,
  document.getElementById("root")
);
