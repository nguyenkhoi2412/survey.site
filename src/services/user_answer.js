import axios from "@utils/axio.instance";

export default {
  validateUser(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`user/answer/validate/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  refreshToken(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`user/answer/refreshtoken/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  registerUser(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`user/answer/register/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
