module.exports = {
  extends: 'airbnb-base',
  env: {
    mocha: true,
    node: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.spec.js',
        '**/*.builder.js',
        './src/tests/**',
      ],
    }],
    'import/extensions': [0, { extensions: ['.js'] }],
  },
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'src',
          'node_modules',
        ],
      },
    },
  },
};
