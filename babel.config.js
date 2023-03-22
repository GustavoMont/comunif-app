module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@src": "./src",
            "@components": "./src/components",
            "@configs": "./src/configs",
            "@screens": "./src/screens",
            "@styles": "./src/styles",
            "@mocks": "./src/__mocks__",
            "@hooks": "./src/hooks",
          },
        },
      ],
    ],
  };
};
