const { lngExtensionFileResolver } = require('../../../common/extensions');
const {
  templateLoader,
  templateWritter,
  fileNameResolver,
} = require('../../../common/template');

module.exports = (domain, { lang, ext, path, refs }) => {
  const langExt = lngExtensionFileResolver(lang);

  const tmpl = templateLoader(
    require.resolve(`./repository.${langExt}.hbs`),
    {
      domain,
      refs,
    },
    ext,
  );

  templateWritter(fileNameResolver(path, domain, langExt), tmpl);
};
