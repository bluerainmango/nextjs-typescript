const { withFrameworkConfig } = require("./framework/common/config");

module.exports = withFrameworkConfig({
  reactStrictMode: true,
  framework: {
    name: "shopify", // 여기서 framework를 결정해 주자.
  },
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US",
  },
});

// console.log("next.config.js: ", JSON.stringify(module.exports, null, 2));
