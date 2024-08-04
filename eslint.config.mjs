// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import StylisticPlugin from "@stylistic/eslint-plugin";

export default [
  eslint.configs.recommended,
  StylisticPlugin.configs["recommended-flat"],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
    },
  },
];
