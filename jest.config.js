module.exports = {
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
    "jest-styled-components/native",
    "./setupTest.tsx",
  ],
  preset: "react-native",
};
