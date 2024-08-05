/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main", "next"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    ["@semantic-release/github", {
      assets: [
        { path: "dist", label: "Module" },
      ],
    }],
  ],
};
