import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import consoleMessages from "./middleware";

export default applyMiddleware(thunk, consoleMessages)(createStore)(reducer);
