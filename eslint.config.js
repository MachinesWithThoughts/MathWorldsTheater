const js = require("@eslint/js");
const html = require("eslint-plugin-html");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules/**", "package-lock.json"],
    languageOptions: {
      sourceType: "script",
      ecmaVersion: 2021,
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        navigator: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        ResizeObserver: "readonly",
        HTMLCanvasElement: "readonly",
        self: "readonly",
      },
    },
    rules: {},
  },
  {
    files: ["**/*.html"],
    plugins: {
      html,
    },
    processor: "html/html",
  },
];
