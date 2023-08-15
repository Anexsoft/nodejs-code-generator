const { lngExtensionFileResolver } = require('../../../common/extensions');
const {
  templateLoader,
  templateWritter,
  fileNameResolver,
} = require('../../../common/template');

module.exports = (domain, { lang, path }) => {
  const langExt = lngExtensionFileResolver(lang);
  const tmpl = templateLoader(require.resolve(`./domain.${langExt}.hbs`), {
    domain,
  });

  templateWritter(fileNameResolver(path, domain, langExt), tmpl);
};
