module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      ["module-resolver", {
        root: ["."],
        alias: { "@": "./" } // so "@/constants/theme" maps to "<project>/constants/theme"
      }],
    ],
  };
};
