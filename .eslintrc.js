module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
    'max-len': ['error', { code: 120, ignoreComments: true, ignoreStrings: true }],
    'no-unused-vars': 'off',
    'react/prop-types': 0,
    'react/no-unstable-nested-components': ['off'],
  },
};
