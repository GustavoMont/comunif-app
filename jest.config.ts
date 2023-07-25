import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
    "jest-styled-components/native",
    "./setupTest.tsx",
  ],
  preset: "react-native",
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  verbose: true,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|react-native-confirmation-code-field|@react-native(-community)?)/)",
  ],
};
export default config;
