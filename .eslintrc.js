module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "vue/script-indent": ["error", 4],
    "vue/html-indent": ["error", 4],
    "indent": ["error", 4],
    "vue/singleline-html-element-content-newline": 0
  }
}
