import axios from "@utils/axio.instance";

export default {
  /*
   * GET: category/getbytype/:id
   */
  getByType(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url + params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
