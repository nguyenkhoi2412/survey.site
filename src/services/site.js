import axios from "@utils/axio.instance";

export default {
  getByName(name) {
    return new Promise((resolve, reject) => {
      const params = {
        name: name || process.env.SITE_NAME,
      };

      axios
        .get(`site/getbyname/` + params.name)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
