import C from "./constants";

export const set_token = (token) => {
  return {
    type: C.SET_TOKEN,
    payload: {
      token: token,
    },
  };
};

export const set_current_path = (path) => {
  return {
    type: C.SET_CURRENT_PATH,
    payload: {
      current_path: path,
    },
  };
};

export const set_page_items = (item_list) => {
  return {
    type: C.SET_PAGE_ITEMS,
    payload: {
      page_items: item_list,
    },
  };
};

export const set_keyword = (token, keyword) => {
  return {
    type: C.SET_KEYWORD,
    payload: {
      token: token,
      keyword: keyword,
    },
  };
};

export const set_total_page = (page) => {
  return {
    type: C.SET_TOTAL_PAGE,
    payload: {
      total_page: page,
    },
  };
};

export const set_current_page = (page) => {
  return {
    type: C.SET_CURRENT_PAGE,
    payload: {
      current_page: page,
    },
  };
};

export const view_image_model = (show) => {
  return {
    type: C.VIEW_IMAGE_MODEL,
    payload: {
      show: show,
    },
  };
};

export const view_video_modal = (show) => {
  return {
    type: C.VIEW_VIDEO_MODEL,
    payload: {
      show: show,
    },
  };
};
