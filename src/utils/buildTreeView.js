import gVariabies from "@stores/shared/variables";
const glang = gVariabies.locale.lang;

export const buildTreeSelect = (directories, lang = glang, parent = "") => {
  let node = [];
  directories
    .filter(function (d) {
      return d["parent"] === parent;
    })
    .forEach(function (d) {
      var cd = {
        key: d._id,
        title: d.title[lang],
        value: d._id,
      };

      const getChild = buildTreeSelect(directories, lang, d["_id"]);
      if (getChild.length > 0) {
        cd["children"] = getChild;
      }

      return node.push(cd);
    });

  return node;
};
