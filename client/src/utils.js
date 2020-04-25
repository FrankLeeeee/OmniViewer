function getToken() {
  if (sessionStorage.token == undefined) {
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
        });
      }
    });
  }
}

function acsiiToBase64(str_acsii) {
  return new Buffer(str_acsii).toString("base64");
}

function base64ToAscii(str_base64) {
  return new Buffer(str_base64, "base64").toString("ascii");
}

export default {
  getToken: getToken,
  acsiiToBase64: acsiiToBase64,
  base64ToAscii: base64ToAscii,
};
