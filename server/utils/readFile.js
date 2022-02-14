const fs = require("fs");
const path = require("path");
const root = require("../../root");

const readFile = (variant, filename) => {
  const filePath = path.resolve(root, "data", variant, `${filename}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
  return ""
};

module.exports = readFile;
