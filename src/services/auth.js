import axios from "@utils/axio.instance";
import encryptHelper from "@utils/encrypt.helper";

export default {
  validateUser(params) {
    return new Promise((resolve, reject) => {
      params.password = encryptHelper.cryptoJs.encryption_AES(params.password);

      axios
        .post(`auth/validate/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  refreshToken(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`auth/refreshtoken/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
