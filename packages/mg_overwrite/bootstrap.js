const config = require('config');

module.exports = () => {
  const themeConfig = {
    "logo": {
      "alt": "MG Store Sri Lanka",
      "src": "./logo/logo_bg_black.png",
      "width": 50,
      "height": 50
    },
    "headTags": {
      "links": [
        {
          "rel": "icon",
          "href": "./logo/favicon.ico"
        }
      ],
      "metas": [],
      "scripts": [],
      "bases": []
    },
    "copyRight": "© 2023 MG Store LK. All Rights Reserved."
  };
  config.util.setModuleDefaults('themeConfig', themeConfig);
};
