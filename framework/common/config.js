const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

// frameworks to choose
const ALLOWED_FW = ["shopify", "bigcommerce", "shopify_local"]; // shopify_local: our fake shopify server
const FALLBACK_FW = "shopify";

// Import the designated framework's config and merge with common config & set tsconfig.json
exports.withFrameworkConfig = function (defaultConfig = {}) {
  let framework = defaultConfig?.framework?.name; // shopify, bigcommerce ... or undefined

  if (!framework) {
    throw new Error(
      "The api framework is missing, please add a valid provider."
    );
  }

  if (!ALLOWED_FW.includes(framework)) {
    throw new Error(
      `The api framework: ${framework} cannot be found, please use one of ${ALLOWED_FW.join(
        ", "
      )}`
    );
  }

  if (framework === "shopify_local") {
    framework = FALLBACK_FW; // shopify
  }

  const frameworkNextConfig = require(path.join(
    "../",
    framework,
    "next.config.js"
  ));

  const newMergedNextConfig = merge(defaultConfig, frameworkNextConfig);

  //! 1. tsconfig.json 설정
  //"@framework":["framework/shopify"]를 "@framework":[`framework/${framework 이름 아무거나}`]로 바꾸고 tsconfig.json 파일 새로 덮어쓰기
  const tsPath = path.join(process.cwd(), "tsconfig.json");
  const tsConfig = require(tsPath);
  tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`];
  tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`];

  // tsconfig.json 파일 덮어쓰기. 포맷이 이상하면 json 에러떠서 prettier.format()으로 정렬. 안해도 상관은 없음.
  fs.writeFileSync(
    tsPath,
    prettier.format(JSON.stringify(tsConfig), { parser: "json" })
  );
  // fs.writeFileSync(tsPath, JSON.stringify(tsConfig, null, 2));

  //! 2. next.config.js 설정하기 위한 new merged config 반환
  return newMergedNextConfig;
};

// module.exports = {withFrameworkConfig};
