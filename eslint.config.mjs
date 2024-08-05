// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      "./playground",
    ],
  },
}).append({
  rules: {
    "@stylistic/semi": ["error", "always"],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/member-delimiter-style": ["error", {
      singleline: {
        delimiter: "semi",
        requireLast: true,
      },
    }],
  },
});
