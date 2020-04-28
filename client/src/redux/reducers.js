import C from "./constants";
import { combineReducers } from "redux";

export const current_path = (state, action) =>
  action.type === C.SET_CURRENT_PATH
    ? parseInt(action.payload.current_path)
    : state;

export const token = (state, action) => {
  action.type === C.SET_TOKEN ? action.payload.token : state;
};
