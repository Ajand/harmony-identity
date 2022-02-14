const fs = require("fs");
const path = require("path");
const root = require("../../root");

const writeFile = (variant, filename, data) => {
  const fileName = path.resolve(root, "data", variant, `${filename}.json`);
  const variantDirectory = path.resolve(root, "data", variant);
  const dataDirectory = path.resolve(root, "data");
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
  }
  if (!fs.existsSync(variantDirectory)) {
    fs.mkdirSync(variantDirectory);
  }
  try {
    fs.writeFileSync(fileName, data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = writeFile;
