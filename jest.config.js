module.exports = {
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
    "jest-styled-components/native",
    "./setupTest.ts",
  ],
  preset: "react-native",
};
