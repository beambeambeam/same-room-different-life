export default {
  rules: {
    "body-empty": [2, "always"],
    "footer-empty": [2, "always"],
    "header-max-length": [2, "always", 72],
    "scope-empty": [2, "always"],
    "subject-empty": [2, "never"],
    "subject-exclamation-mark": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"],
    ],
  },
};
