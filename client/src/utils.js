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

export default {
  getToken: getToken,
};
