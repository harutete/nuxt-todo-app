module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript'
  ],
  // add your custom rules here
  rules: {
  }
}
