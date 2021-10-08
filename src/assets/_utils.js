const path = require("path");
const resources = [
  "_global.less"
];

module.exports = resources.map((file) => path.resolve(__dirname, file));
