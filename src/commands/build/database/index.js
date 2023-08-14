const { lngExtensionFileResolver } = require('../../../common/extensions');
const { templateLoader, templateWritter } = require('../../../common/template');

module.exports = ({ lang, db }) => {
  const langExt = lngExtensionFileResolver(lang);
  const tmpl = templateLoader(require.resolve(`./${db}.${langExt}.hbs`));

  templateWritter(`shared/database.${langExt}`, tmpl);
};
