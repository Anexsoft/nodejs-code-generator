const { lngExtensionFileResolver } = require('../../../common/extensions');
const { templateLoader, templateWritter } = require('../../../common/template');

module.exports = (entity, { lang }) => {
  const langExt = lngExtensionFileResolver(lang);
  const tmpl = templateLoader(require.resolve(`./repository.${langExt}.hbs`), {
    entity,
  });

  templateWritter(
    `${entity.toLocaleLowerCase()}/services/repositories/${entity.toLocaleLowerCase()}.repository.${langExt}`,
    tmpl,
  );
};
