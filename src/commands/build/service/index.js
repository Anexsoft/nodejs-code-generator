const { lngExtensionFileResolver } = require('../../../common/extensions');
const { templateLoader, templateWritter } = require('../../../common/template');

module.exports = (entity, { lang }) => {
  const langExt = lngExtensionFileResolver(lang);
  const tmpl = templateLoader(require.resolve(`./service.${langExt}.hbs`), {
    entity,
  });

  templateWritter(
    `${entity.toLocaleLowerCase()}/services/${entity.toLocaleLowerCase()}.service.${langExt}`,
    tmpl,
  );
};
