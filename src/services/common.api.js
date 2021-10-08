import axios from "@utils/axio.instance";
import { objectExtension } from "@utils/helpers";

export default {
  /*
   * GET: {dynamic}/getbyno/:pageno&:pagesize&:query
   */
  getByPageNo(url, params) {
    params = params || {};

    if (!params.hasOwnProperty("pageno")) {
      params.pageno = 1;
    }

    if (!params.hasOwnProperty("pagesize")) {
      params.pagesize = 1000;
    }

    if (!params.hasOwnProperty("query")) {
      params.query = {};
    }

    return new Promise((resolve, reject) => {
      axios
        .get(objectExtension.parseObjectsToQueryString(url, params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },

  /*
   * GET: {dynamic}/getbyfilter/:query
   */
  getbyfilter(url, params) {
    params = params || {};

    if (!params.hasOwnProperty("query")) {
      params.query = {};
    }

    return new Promise((resolve, reject) => {
      axios
        .get(objectExtension.parseObjectsToQueryString(url, params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },

  /*
   * GET: {dynamic}/getbyid/:id
   */
  getbyid(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url + params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },

  /*
   * POST: {dynamic}/insertnew
   */
  insertnew(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },

  /*
   * PUT: {dynamic}/update
   */
  update(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },

  /*
   * DELETE: {dynamic}/delete
   */
  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url + params.ids.join(","))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
