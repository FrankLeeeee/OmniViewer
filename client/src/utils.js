import queryString from "query-string";
import qs from "query-string";

function getToken(callback = null) {
  if (
    sessionStorage.token != "undefined" &&
    sessionStorage.token != undefined
  ) {
    callback(sessionStorage.token);
  } else {
    var state = window.store.getState();
    if (state.query.token == "" || state.query.token == undefined) {
      fetch("http://127.0.0.1:8000/api/getToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status !== 200) {
          console.log("token获取失败");
        } else {
          res.json().then((res) => {
            sessionStorage.setItem("token", res.token);
            callback(res.token);
          });
        }
      });
    }
  }
}

function acsiiToBase64(str_acsii) {
  return new Buffer(str_acsii).toString("base64");
}

function base64ToAscii(str_base64) {
  return new Buffer(str_base64, "base64").toString("ascii");
}

function parseQueryString(urlSearch) {
  return queryString.parse(urlSearch);
}

function stringifyUrlQuery(query_json) {
  return qs.stringify(query_json);
}

function parseURL(urlSearch) {
  // get state from url

  const query = parseQueryString(urlSearch);
  var res = {};

  if (query.dir == undefined) {
    res.dir = "";
  } else {
    res.dir = base64ToAscii(query.dir);
  }

  if (query.keyword == undefined || query.keyword == "undefined") {
    res.keyword = "";
  } else {
    res.keyword = base64ToAscii(query.keyword);
  }

  if (query.page == undefined) {
    res.page = 1;
  } else {
    res.page = parseInt(query.page);
  }
  return res;
}

export default {
  getToken: getToken,
  acsiiToBase64: acsiiToBase64,
  base64ToAscii: base64ToAscii,
  parseQueryString: parseQueryString,
  stringifyUrlQuery: stringifyUrlQuery,
  parseURL: parseURL,
};
