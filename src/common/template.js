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

    // include extension directory for current path
    const pathParts = fileParts[0].split('/');
    pathParts.splice(-1, 0, 'extensions');
    fileParts[0] = pathParts.join('/');

    const tmplFile = fileParts.join('.');

    if (fs.existsSync(tmplFile)) {
      content = fs.readFileSync(tmplFile, 'utf8');
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
