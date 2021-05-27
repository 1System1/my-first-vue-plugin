import request from "../utils/http"

export function getThemeTables() {
  return request({
    url:  "/design/subject/find",
    method: "get",
    params: {
      findType: 5,
      datasource: "4028826c72f8ce850172fd879a1e9995"
    }
  });
}
export function getThemeFactSubject(subject) {
  return request({
    url:  "/design/datasource/factor/find",
    method: "post",
    data: {
      datasource: "4028826c72f8ce850172fd879a1e9995",
      subject: subject
    }
  });
}
