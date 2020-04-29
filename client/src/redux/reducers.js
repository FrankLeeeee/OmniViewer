import C from "./constants";
import { combineReducers } from "redux";

export const current_path = (state = "", action) => {
  switch (action.type) {
    case C.SET_QUERY:
      return action.payload.current_path;

    default:
      return state;
  }
};
// action.type === C.SET_CURRENT_PATH ? action.payload.current_path : state;

export const token = (state = "", action) =>
  action.type === C.SET_TOKEN ? action.payload.token : state;

export const current_page = (state = 1, action) => {
  switch (action.type) {
    case C.SET_CURRENT_PAGE:
      return action.payload.current_page;

    case C.SET_QUERY:
      return action.payload.current_page;

    default:
      return state;
  }
};

export const keyword = (state = "", action) => {
  switch (action.type) {
    case C.SET_QUERY:
      return action.payload.keyword;

    default:
      return state;
  }
};

export const total_page = (state = 1, action) => {
  switch (action.type) {
    case C.SET_TOTAL_PAGE:
      return action.payload.total_page;

    default:
      return state;
  }
};

export const page_items = (state = [], action) =>
  action.type == C.SET_PAGE_ITEMS ? action.payload.page_items : state;

export const show_image = (state = false, action) =>
  action.type == C.VIEW_IMAGE_MODEL ? action.payload.show_image : state;

export const show_video = (state = false, action) =>
  action.type == C.VIEW_VIDEO_MODEL ? action.payload.show_video : state;

export default combineReducers({
  query: combineReducers({
    current_path,
    current_page,
    keyword,
  }),
  total_page,
  page_items,
  show_image,
  show_video,
  token,
});
