import C from "./constants";
import { combineReducers } from "redux";
import loader from "@public/assets/loader.svg";

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

    case C.FILTER_BY_KEYWORD:
      return 1;

    default:
      return state;
  }
};

export const keyword = (state = "", action) => {
  switch (action.type) {
    case C.SET_QUERY:
      return action.payload.keyword;

    case C.SET_KEYWORD:
      return action.payload.keyword;

    default:
      return state;
  }
};

export const total_page = (state = 1, action) => {
  switch (action.type) {
    case C.SET_SERVER_INIT_RESPONSE:
      return action.payload.total_page;

    case C.FILTER_BY_KEYWORD:
      return action.payload.total_page;

    default:
      return state;
  }
};

export const item_initialized_on_server = (state = false, action) => {
  switch (action.type) {
    case C.SET_SERVER_INIT_RESPONSE:
      return true;

    case C.SET_PAGE_STATUS:
      return action.payload.loaded;

    case C.SET_PAGE_ITEMS:
      return true;

    default:
      return state;
  }
};

export const page_items = (state = [], action) =>
  action.type == C.SET_PAGE_ITEMS ? action.payload.page_items : state;

export const filtered = (state = false, action) => {
  switch (action.type) {
    case C.SET_QUERY:
      var keyword = action.payload.keyword;
      if (keyword != undefined && keyword != "" && keyword != "undefined") {
        return true;
      } else {
        return false;
      }

    case C.SET_KEYWORD:
      var keyword = action.payload.keyword;
      if (keyword != undefined && keyword != "" && keyword != "undefined") {
        return true;
      } else {
        return false;
      }

    case C.FILTER_BY_KEYWORD:
      return true;

    default:
      return state;
  }
};

// image modal
export const show_image = (state = false, action) =>
  action.type == C.SHOW_IMAGE_MODAL ? action.payload.show_image : state;

export const img_path = (state = "", action) => {
  switch (action.type) {
    case C.SET_IMAGE_PATH_IN_MODAL:
      return action.payload.img_path;

    default:
      return state;
  }
};

export const img_encoded = (state = loader, action) => {
  switch (action.type) {
    case C.SET_IMAGE_CONTENT_IN_MODAL:
      return action.payload.img_encoded;

    default:
      return state;
  }
};

export const img_width = (state = "", action) => {
  switch (action.type) {
    case C.SET_IMAGE_CONTENT_IN_MODAL:
      return action.payload.img_width;

    default:
      return state;
  }
};

export const img_height = (state = "", action) => {
  switch (action.type) {
    case C.SET_IMAGE_CONTENT_IN_MODAL:
      return action.payload.img_height;

    default:
      return state;
  }
};

export const img_idx = (state = -1, action) => {
  switch (action.type) {
    case C.SET_IMAGE_CONTENT_IN_MODAL:
      return action.payload.img_idx;

    default:
      return state;
  }
};

// video modal
export const show_video = (state = false, action) =>
  action.type == C.SHOW_VIDEO_MODAL ? action.payload.show_video : state;

export const video_url = (state = "", action) =>
  action.type == C.SET_VIDEO_URL ? action.payload.video_url : state;

export const img_count = (state = "", action) =>
  action.type == C.SET_STATS ? action.payload.img_count : state;

export const img_format = (state = [], action) =>
  action.type == C.SET_STATS ? action.payload.img_format : state;

export const img_cls = (state = [], action) =>
  action.type == C.SET_STATS ? action.payload.img_cls : state;

export const error_code = (state = -1, action) => {
  switch (action.type) {
    case C.SET_ERROR:
      return action.payload.error_code;

    case C.SET_SERVER_INIT_RESPONSE:
      return -1;

    default:
      return state;
  }
};

export default combineReducers({
  query: combineReducers({
    current_path,
    current_page,
    keyword,
  }),
  item_initialized_on_server,
  filtered,
  total_page,
  page_items,
  image_modal: combineReducers({
    show_image,
    img_encoded,
    img_path,
    img_width,
    img_height,
    img_idx,
  }),
  video_modal: combineReducers({
    video_url,
    show_video,
  }),
  stats: combineReducers({
    img_count,
    img_format,
    img_cls,
  }),
  token,
  error_code,
});
