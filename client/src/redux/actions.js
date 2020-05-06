import C from "./constants";

export const set_token = (token) => {
  return {
    type: C.SET_TOKEN,
    payload: {
      token: token,
    },
  };
};

export const set_query = (current_path, current_page, keyword) => {
  return {
    type: C.SET_QUERY,
    payload: {
      current_path: current_path,
      current_page: current_page,
      keyword: keyword,
    },
  };
};

export const set_server_init_response = (page) => {
  return {
    type: C.SET_SERVER_INIT_RESPONSE,
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

export const set_page_items = (item_list) => {
  return {
    type: C.SET_PAGE_ITEMS,
    payload: {
      page_items: item_list,
    },
  };
};

export const set_keyword = (keyword) => {
  return {
    type: C.SET_KEYWORD,
    payload: {
      keyword: keyword,
    },
  };
};

export const filter_by_keyword = (total_page) => {
  return {
    type: C.FILTER_BY_KEYWORD,
    payload: {
      total_page: total_page,
    },
  };
};

export const show_image_modal = (show) => {
  return {
    type: C.SHOW_IMAGE_MODAL,
    payload: {
      show_image: show,
    },
  };
};

export const set_image_path_in_modal = (img_path) => {
  return {
    type: C.SET_IMAGE_PATH_IN_MODAL,
    payload: {
      img_path: img_path,
    },
  };
};

export const set_image_content_in_modal = (
  img_encoded,
  img_width,
  img_height,
  img_idx
) => {
  return {
    type: C.SET_IMAGE_CONTENT_IN_MODAL,
    payload: {
      img_encoded: img_encoded,
      img_width: img_width,
      img_height: img_height,
      img_idx: img_idx,
    },
  };
};

export const show_video_modal = (show) => {
  return {
    type: C.SHOW_VIDEO_MODAL,
    payload: {
      show_video: show,
    },
  };
};

export const set_video_url_in_modal = (video_url) => {
  return {
    type: C.SET_VIDEO_URL,
    payload: {
      video_url: video_url,
    },
  };
};

export const set_stats = (img_count, img_format_data, img_cls_data) => {
  return {
    type: C.SET_STATS,
    payload: {
      img_count: img_count,
      img_format: img_format_data,
      img_cls: img_cls_data,
    },
  };
};

export const set_error = (error_code) => {
  return {
    type: C.SET_ERROR,
    payload: {
      error_code: error_code,
    },
  };
};

export const set_page_status = (loaded) => {
  return {
    type: C.SET_PAGE_STATUS,
    payload: {
      loaded: loaded,
    },
  };
};
// export const set_current_path = (path) => {
//   return {
//     type: C.SET_CURRENT_PATH,
//     payload: {
//       current_path: path,
//     },
//   };
// };

// export const set_page_items = (item_list) => {
//   return {
//     type: C.SET_PAGE_ITEMS,
//     payload: {
//       page_items: item_list,
//     },
//   };
// };

// export const view_image_model = (show) => {
//   return {
//     type: C.VIEW_IMAGE_MODEL,
//     payload: {
//       show: show,
//     },
//   };
// };

// export const view_video_modal = (show) => {
//   return {
//     type: C.VIEW_VIDEO_MODEL,
//     payload: {
//       show: show,
//     },
//   };
// };
