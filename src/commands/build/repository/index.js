const { lngExtensionFileResolver } = require('../../../common/extensions');
const {
  templateLoader,
  templateWritter,
  fileNameResolver,
} = require('../../../common/template');

module.exports = (domain, { lang, path, refs }) => {
  const langExt = lngExtensionFileResolver(lang);
  const tmpl = templateLoader(require.resolve(`./repository.${langExt}.hbs`), {
    domain,
    refs,
  });

  templateWritter(fileNameResolver(path, domain, langExt), tmpl);
};
