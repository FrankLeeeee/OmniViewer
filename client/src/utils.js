import queryString from "query-string";
import qs from "query-string";

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
  acsiiToBase64: acsiiToBase64,
  base64ToAscii: base64ToAscii,
  parseQueryString: parseQueryString,
  stringifyUrlQuery: stringifyUrlQuery,
  parseURL: parseURL,
};
