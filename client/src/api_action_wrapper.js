import * as actions from "@src/redux/actions";
import store from "@src/redux/store";
import toast from "@src/toast/toast";
import apis from "./api";
import loader from "@public/assets/loader.svg";

const getToken = async () => {
  if (sessionStorage.token != undefined) {
    store.dispatch(actions.set_token(sessionStorage.token));
  } else {
    var state = store.getState();

    if (state.query.token == undefined) {
      var response = await fetch(apis.get_toke, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status !== 200) {
        toast.error("Token获取失败");
      } else {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        store.dispatch(actions.set_token(data.token));
      }
    }
  }
};

const initServer = async () => {
  // set up path content on server side
  const state = store.getState();

  var response = await fetch(apis.initServer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current_search: state.query.current_path,
      token: state.token,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  var response = await response.json();
  if (response.code != 200) {
    toast.error("服务器端初始化失败");
    store.dispatch(actions.set_error(response.code));
    // this.props.history.push(`/error?status=${res.code}`);
  } else {
    store.dispatch(actions.set_server_init_response(response.data.total_page));
  }
};

const getPageItems = async () => {
  store.dispatch(actions.set_page_status(false));
  var state = store.getState();

  var response = await fetch(apis.getPageItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      page_number: state.query.current_page,
      current_search: state.query.current_path,
      filtered: state.filtered,
      token: state.token,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (response.ok) {
    var response = await response.json();
    store.dispatch(actions.set_page_items(response.data));
  } else {
    toast.error("获取页面内容失败");
  }
};

const filterByKeyword = async () => {
  var state = store.getState();

  if (
    state.query.keyword != "" &&
    state.query.keyword != undefined &&
    state.query.keyword != "undefined"
  ) {
    var response = await fetch(apis.filterByKeyword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        current_search: state.query.current_path,
        keyword: state.query.keyword,
        token: state.token,
      }),
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });

    if (response.ok) {
      var res = await response.json();
      console.log("hey");
      store.dispatch(actions.filter_by_keyword(res.data.total_page));
    } else {
      toast.error("获取页面内容失败");
    }
  }
};

const loadOriginalImage = async (img_path, img_idx) => {
  store.dispatch(actions.show_image_modal(true));
  store.dispatch(actions.set_image_path_in_modal(img_path));

  var response = await fetch(apis.loadOriginalImage, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      path: img_path,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (response.ok) {
    var res = await response.json();
    var extension = img_path.split(".").pop().toLowerCase();
    var img_encoded = `data:img/${extension};base64, ${res.data.encodedImage}`;
    var img_width = res.data.size[0];
    var img_height = res.data.size[1];
    store.dispatch(
      actions.set_image_content_in_modal(
        img_encoded,
        img_width,
        img_height,
        img_idx
      )
    );
  } else {
    toast.error(`获取图片失败: ${img_path}`);
  }
};

const loadPrevOrNextOriginalImage = (img_idx, prev = false) => {
  var page_items = store.getState().page_items;
  var target_idx = null;

  if (prev) {
    for (let i = img_idx - 1; i > -1; i--) {
      if (page_items[i].type == "image") {
        target_idx = i;
        break;
      }
    }
  } else {
    for (let i = img_idx + 1; i < page_items.length; i++) {
      if (page_items[i].type == "image") {
        target_idx = i;
        console.log(target_idx);
        break;
      }
    }
  }

  if (target_idx == null) {
    if (prev) {
      toast.info("已经到第一张图片了");
    } else {
      toast.info("已经到最后一张图片了");
    }
  } else {
    store.dispatch(actions.set_image_content_in_modal(loader, "", "", img_idx));
    loadOriginalImage(page_items[target_idx].path, target_idx);
  }
};

const downloadFile = async (img_path) => {
  var response = await fetch(apis.get_download_id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      file_path: img_path,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (response.ok) {
    response = await response.json();
    var download_id = response.data;
    location.href = apis.downloadFile + download_id;
  } else {
    toast.error(`获取下载链接失败: ${img_path}`);
  }
};

const loadVideo = async (video_path) => {
  store.dispatch(actions.show_video_modal(true));
  var response = await fetch(apis.get_video_id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      video_path: video_path,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (response.ok) {
    response = await response.json();
    var video_id = response.data;
    store.dispatch(actions.set_video_url_in_modal(apis.loadVideo + video_id));
  } else {
    toast.error(`获取视频资源失败: ${video_path}`);
  }
};

const loadStats = async () => {
  var state = store.getState();

  var response = await fetch(apis.loadStats, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      token: state.token,
      filtered: state.filtered,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  });

  if (response.ok) {
    response = await response.json();
    var stats = response.data;
    store.dispatch(
      actions.set_stats(stats["count"], stats["formats"], stats["labels"])
    );
  } else {
    toast.error("获取统计数据失败");
  }
};

export default {
  getToken: getToken,
  initServer: initServer,
  getPageItems: getPageItems,
  filterByKeyword: filterByKeyword,
  loadOriginalImage: loadOriginalImage,
  loadPrevOrNextOriginalImage: loadPrevOrNextOriginalImage,
  downloadFile: downloadFile,
  loadVideo: loadVideo,
  loadStats: loadStats,
};
