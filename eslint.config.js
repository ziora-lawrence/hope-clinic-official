import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReactConfig,
    rules: {
      ...pluginReactConfig.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  { ignores: ["dist/*", "eslint.config.js", "tailwind.config.cjs", "postcss.config.js"] },
];
