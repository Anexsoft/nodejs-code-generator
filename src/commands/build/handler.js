const { lngExtensionFileResolver } = require('../../common/extensions');
const {
  templateLoader,
  templateWritter,
  fileNameResolver,
} = require('../../common/template');

const moduleHandler = (module, domain, { lang, db, tmpl, path, refs }) => {
  const langExt = lngExtensionFileResolver(lang);

  const content = templateLoader(
    `${module}/${db}/${module}.default.${langExt}.hbs`,
    {
      domain,
      refs,
    },
    tmpl,
  );

  templateWritter(fileNameResolver(path, domain, langExt), content);
};

const dbModuleHandler = ({ lang, db, tmpl, path, refs }) => {
  const langExt = lngExtensionFileResolver(lang);

  const content = templateLoader(
    `database/${db}.default.${langExt}.hbs`,
    {
      refs,
    },
    tmpl,
  );

  templateWritter(fileNameResolver(path, '', langExt), content);
};

module.exports = {
  moduleHandler,
  dbModuleHandler,
};
