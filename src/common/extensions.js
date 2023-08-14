const lngExtensionFileResolver = (language) => {
  if (language === 'typescript') {
    return 'ts';
  }

  if (language === 'javascript') {
    return 'js';
  }

  if (language === 'csharp') {
    return 'cs';
  }

  throw new Error('Invalid language supplied');
};

module.exports = {
  lngExtensionFileResolver,
};
