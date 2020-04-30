import * as actions from "./redux/actions";
import store from "./redux/store";
import toast from "./toast/toast";

const getToken = () => {
  if (sessionStorage.token != undefined) {
    store.dispatch(actions.set_token(sessionStorage.token));
  } else {
    var state = store.getState();

    if (state.query.token == undefined) {
      fetch("http://localhost:8000/api/getToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.status !== 200) {
          toast.error("Token获取失败");
        } else {
          res.json().then((res) => {
            sessionStorage.setItem("token", res.token);
            store.dispatch(actions.set_token(res.token));
          });
        }
      });
    }
  }
};

const init_server = () => {
  // set up path content on server side
  var state = store.getState();

  fetch("http://localhost:8000/api/init/", {
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
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code != 200) {
        toast.error("服务器端初始化失败");
        // this.props.history.push(`/error?status=${res.code}`);
      } else {
        store.dispatch(actions.set_server_init_response(res.data.total_page));
      }
    });
};

const get_page_items = () => {
  var state = store.getState();
  fetch("http://localhost:8000/api/getPage/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      page_number: state.query.current_page,
      current_search: state.query.current_path,
      filtered: false,
      token: state.token,
    }),
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((res) => {
      store.dispatch(actions.set_page_items(res.data));
    })
    .catch((err) => {
      toast.error("获取页面内容失败");
    });
};

export default {
  getToken: getToken,
  init_server: init_server,
  get_page_items: get_page_items,
};
