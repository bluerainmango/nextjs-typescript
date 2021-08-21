const path = require("path");
const merge = require("deepmerge");

// Import the designated framework's config and merge with common config
function withFrameworkConfig(defaultConfig = {}) {
  const framework = "shopify";

  const frameworkNextConfig = require(path.join(
    "../",
    framework,
    "next.config.js"
  ));

  const config = merge(defaultConfig, frameworkNextConfig);

  return config;
}

module.exports = { withFrameworkConfig };
