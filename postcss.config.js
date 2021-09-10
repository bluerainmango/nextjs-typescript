//! just for testing with postcss-cli script to build compiled css file. (npm run build:css)
// module.exports = {
//   plugins: [require("tailwindcss"), require("autoprefixer")],
// };

// 각 플러그인에 option 넣을 필요없다면 아래 [] 형식도 가능. 위가 아닌 아래처럼 해야 build 가능
module.exports = {
  plugins: ["tailwindcss", "autoprefixer"],
};

// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
