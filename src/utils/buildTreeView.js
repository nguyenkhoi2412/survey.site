import gVariabies from "@stores/shared/variables";
const locale = gVariabies.locale;

export const buildTreeSelect = (directories, parent = "") => {
  let node = [];
  directories
    .filter(function (d) {
      return d["parent"] === parent;
    })
    .forEach(function (d) {
      var cd = {
        key: d._id,
        title: d.title[locale.lang],
        value: d._id,
      };

      const getChild = buildTreeSelect(directories, d["_id"]);
      if (getChild.length > 0) {
        cd["children"] = getChild;
      }

      return node.push(cd);
    });

  return node;
};
