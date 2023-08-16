const { lngExtensionFileResolver } = require('../../common/extensions');
const {
  templateLoader,
  templateWritter,
  fileNameResolver,
} = require('../../common/template');

const moduleHandler = (module, domain, { lang, ext, path, refs }) => {
  const langExt = lngExtensionFileResolver(lang);

  const tmpl = templateLoader(
    `${module}/${module}.${langExt}.hbs`,
    {
      domain,
      refs,
    },
    ext,
  );

  templateWritter(fileNameResolver(path, domain, langExt), tmpl);
};

const dbModuleHandler = ({ lang, db, ext, path, refs }) => {
  const langExt = lngExtensionFileResolver(lang);

  const tmpl = templateLoader(
    `database/${db}.${langExt}.hbs`,
    {
      refs,
    },
    ext,
  );

  templateWritter(fileNameResolver(path, '', langExt), tmpl);
};

module.exports = {
  moduleHandler,
  dbModuleHandler,
};
