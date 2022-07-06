import Axios from "axios";
import {
  DOMAIN,
  TOKEN_CYBERSOFT,
  KEY_TOKEN_CYBER,
  TOKEN,
} from "../util/settings/config";
export class baseService {
  //put json về phía backend
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        [KEY_TOKEN_CYBER]: TOKEN_CYBERSOFT,
      }, //JWT
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        [KEY_TOKEN_CYBER]: TOKEN_CYBERSOFT,
      }, //JWT
    });
  };

  get = (url) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        [KEY_TOKEN_CYBER]: TOKEN_CYBERSOFT,
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  delete = (url) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        [KEY_TOKEN_CYBER]: TOKEN_CYBERSOFT,
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };
}
