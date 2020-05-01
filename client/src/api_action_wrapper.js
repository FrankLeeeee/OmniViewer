import * as actions from "@src/redux/actions";
import store from "@src/redux/store";
import toast from "@src/toast/toast";

const getToken = async () => {
  if (sessionStorage.token != undefined) {
    store.dispatch(actions.set_token(sessionStorage.token));
  } else {
    var state = store.getState();

    if (state.query.token == undefined) {
      var response = await fetch("http://localhost:8000/api/getToken", {
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

const init_server = async () => {
  // set up path content on server side
  const state = store.getState();

  var response = await fetch("http://localhost:8000/api/init/", {
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
    // this.props.history.push(`/error?status=${res.code}`);
  } else {
    store.dispatch(actions.set_server_init_response(response.data.total_page));
  }
};

const get_page_items = async () => {
  var state = store.getState();

  var response = await fetch("http://localhost:8000/api/getPage/", {
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

const filter_by_keyword = async () => {
  var state = store.getState();

  var response = await fetch("http://localhost:8000/api/filterByKeyword/", {
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
    store.dispatch(actions.filter_by_keyword(res.data.total_page));
  } else {
    toast.error("获取页面内容失败");
  }
};

const load_original_image = async (img_path, img_type) => {
  store.dispatch(actions.show_image_modal(true));
  store.dispatch(actions.set_image_path_in_modal(img_path));

  var response = await fetch("http://localhost:8000/api/getOriginalImage/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      path: img_path,
      type: img_type,
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
      actions.set_image_content_in_modal(img_encoded, img_width, img_height)
    );
  } else {
    toast.error(`获取图片失败: ${img_path}`);
  }
};

const download_file = async (img_path) => {
  var response = await fetch("http://localhost:8000/api/getDownloadId/", {
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
    location.href = `http://localhost:8000/api/download/${download_id}`;
  } else {
    toast.error(`获取下载链接失败: ${img_path}`);
  }
};

const load_video = async (video_path) => {
  store.dispatch(actions.show_video_modal(true));
  var response = await fetch("http://localhost:8000/api/getVideoId/", {
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
    store.dispatch(
      actions.set_video_url_in_modal(
        `http://localhost:8000/api/video/${video_id}`
      )
    );
  } else {
    toast.error(`获取视频资源失败: ${video_path}`);
  }
};

export default {
  getToken: getToken,
  init_server: init_server,
  get_page_items: get_page_items,
  filter_by_keyword: filter_by_keyword,
  load_original_image: load_original_image,
  download_file: download_file,
  load_video: load_video,
};
