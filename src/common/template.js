const fs = require('fs');
const getDirName = require('path').dirname;

const handlebars = require('handlebars');

const fileNameResolver = (path, name, extension) => {
  return path.replace('[name]', name.toLowerCase()).replace('[ext]', extension);
};

const templateLoader = (file, args, ext = null) => {
  let content;

  if (ext) {
    // include extension name in filename
    const fileParts = file.split('.');
    fileParts.splice(2, 0, ext);

    // set extensions directory
    const pathParts = fileParts[0].split('/');
    fileParts[0] = `/../extensions/${pathParts[pathParts.length - 2]}/${
      pathParts[pathParts.length - 1]
    }`;

    const extFile = __dirname + fileParts.join('.');

    if (fs.existsSync(extFile)) {
      content = fs.readFileSync(extFile, 'utf8');
    }
  }

  if (!content) {
    content = fs.readFileSync(file, 'utf8');
  }

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
