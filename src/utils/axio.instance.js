import axios from "axios";
import authServices from "@services/auth";
import { CURRENT_MODULES, MODULES } from "@app/routes";
// const baseAPI_URL = "http://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 300000,
  withCredentials: false,
  headers: {
    // Accept: "application/json",
    "content-type": "application/json",
  },
  responseType: "json",
  // transformRequest: [
  //   (data, headers) => {
  //     // do something with data
  //     return data;
  //   },
  // ],
});

export default axiosInstance;

//#region interceptors
axiosInstance.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    const accessToken = getLocalAccessToken();

    if (accessToken !== null) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }

    return request;
  },
  (requestError) => {
    return Promise.reject(requestError);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Return a successful response back to the calling service
    if (response && response.data) return response.data;

    return response;
  },
  (responseError) => {
    // 405: Method Not Allowed
    if (responseError.response.status !== 405) {
      removeLocalToken();

      // Return any error which is not due to authentication back to the calling service
      if (responseError.response.status !== 401) {
        return Promise.reject(responseError);
      }
      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(axiosInstance);
      const params = {
        refresh_token: getLocalRefreshToken(),
      };

      authServices.refreshToken(params).then((rs) => {
        let module = localStorage.getItem(CURRENT_MODULES());
        if (module !== null) {
          module = JSON.parse(module);
          module = {
            ...module,
            accessToken: rs.data.access_token,
          };
        }

        referedEvent(responseError.response);
      });
    }
  }
);
//#endregion

//#region functions support for axios callback
const getLocalRefreshToken = () => {
  let refreshToken = localStorage.getItem(CURRENT_MODULES());
  if (refreshToken !== null) {
    refreshToken = JSON.parse(refreshToken).refreshToken;
  }

  return refreshToken;
};

const getLocalAccessToken = () => {
  let accessToken = localStorage.getItem(CURRENT_MODULES());
  if (accessToken !== null) {
    accessToken = JSON.parse(accessToken).accessToken;
  }

  return accessToken;
};

const removeLocalToken = () => {
  const module = CURRENT_MODULES();
  localStorage.removeItem(module);
  window.location.href = "/" + module + "/login";
};

// const referedEvent = (res) => {
//   console.log(res);
//   const url = res.url;
//   const data = res.data;

//   switch (res.method) {
//     case "get":
//       axios.get(url, data);
//       break;

//     case "post":
//       break;
//   }
// };
//#endregion
