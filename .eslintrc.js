module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'no-undef': 0,
        'no-unused-vars': 0,
        'import/no-named-as-default': 0,
      },
    },
  ],
};
