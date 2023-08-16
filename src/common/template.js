const fs = require('fs');
const getDirName = require('path').dirname;

const handlebars = require('handlebars');

const fileNameResolver = (path, name, extension) => {
  return path.replace('[name]', name.toLowerCase()).replace('[ext]', extension);
};

const templateLoader = (file, args) => {
  const content = fs.readFileSync(file, 'utf8');
  return handlebars.compile(content)(args);
};

const templateWritter = (file, content) => {
  file = `./build/${file}`;

  fs.mkdirSync(getDirName(file), { recursive: true });
  fs.writeFileSync(file, content);
};

module.exports = {
  templateLoader,
  templateWritter,
  fileNameResolver,
};
