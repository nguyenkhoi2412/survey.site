import axios from "@utils/axio.instance";
import { Helpers } from "@utils/helpers";

export default {
  /*
   * GET: type/getbysite/:type_id
   */
  getBySite(site_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`type/getbysite/` + site_id)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
