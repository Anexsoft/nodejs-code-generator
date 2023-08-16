const { lngExtensionFileResolver } = require('../../../common/extensions');
const {
  templateLoader,
  templateWritter,
  fileNameResolver,
} = require('../../../common/template');

module.exports = ({ lang, db, ext, path }) => {
  const langExt = lngExtensionFileResolver(lang);

  const tmpl = templateLoader(
    require.resolve(`./${db}.${langExt}.hbs`),
    null,
    ext,
  );

  templateWritter(fileNameResolver(path, '', langExt), tmpl);
};
