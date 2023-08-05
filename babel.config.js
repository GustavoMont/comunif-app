process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["src"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@src": "./src",
            "@components": "./src/components",
            "@configs": "./src/configs",
            "@screens": "./src/screens",
            "@styles": "./src/styles",
            "@mocks": "./src/__mocks__",
            "@hooks": "./src/hooks",
            "@types": "./src/types",
            "@services": "./src/services",
          },
        },
      ],
      [
        "transform-inline-environment-variables",
        // NOTE: include is optional, you can leave this part out
        {
          include: ["TAMAGUI_TARGET"],
        },
      ],
      // NOTE: this is optional, you don't *need* the compiler
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts",
          logTimings: true,
        },
      ],
      // NOTE: this is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
    ],
  };
};
