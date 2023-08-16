const { lngExtensionFileResolver } = require('../../../common/extensions');
const {
  templateLoader,
  templateWritter,
  fileNameResolver,
} = require('../../../common/template');

module.exports = ({ lang, db, path }) => {
  const langExt = lngExtensionFileResolver(lang);
  const tmpl = templateLoader(require.resolve(`./${db}.${langExt}.hbs`));

  templateWritter(fileNameResolver(path, '', langExt), tmpl);
};
