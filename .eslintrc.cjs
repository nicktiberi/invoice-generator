/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc'
        }
      }
    ],
    'import/prefer-default-export': 'off',
    'vue/no-v-html': 'off'
  }
};
