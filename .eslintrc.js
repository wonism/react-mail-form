const off = 0;
const warn = 1;
const error = 2;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  globals: {
    '$Diff': true,
    __PATH_PREFIX__: true,
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    jsx: true,
    useJSXTextNode: true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'import',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    }
  },
  rules: {
    '@typescript-eslint/array-type': [error, 'array-simple'],
    '@typescript-eslint/camelcase': [error, { properties: 'never', ignoreDestructuring: true }],
    '@typescript-eslint/indent': off,
    '@typescript-eslint/member-ordering': [
      error,
      {
        default: [
          'public-static-field',
          'private-static-field',
          'public-instance-field',
          'private-instance-field',
          'public-constructor',
          'private-constructor',
          'public-instance-method',
          'private-instance-method',
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [error, { ignoreRestSiblings: true }],
    'comma-dangle': [
      error,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'function-paren-newline': [error, 'consistent'],
    indent: off,
    'jsx-a11y/anchor-is-valid': error,
    'jsx-a11y/click-events-have-key-events': error,
    'max-len': [error, { code: 150, ignoreRegExpLiterals: true }],
    'no-console': isProduction ? error : off,
    'no-multiple-empty-lines': [error, { max: error, maxEOF: error }],
    'no-implicit-coercion': error,
    'no-shadow': off,
    'no-undef': off,
    'no-underscore-dangle': off,
    'no-unused-vars': [
      error, {
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'no-warning-comments': [
      warn,
      {
        terms: ['TODO', 'FIXME', 'XXX', 'BUG', 'NOTE'],
        location: 'anywhere',
      },
    ],
    'object-curly-newline': [error, { consistent: true }],
    'prefer-spread': off,
    'prefer-const': error,
    'quotes': off,
    'react/jsx-filename-extension': [error, { extensions: ['.tsx'] }],
    'react/jsx-no-target-blank': error,
    'react/jsx-one-expression-per-line': error,
    'react/no-typos': error,
    'react/no-unescaped-entities': off,
    'react/react-in-jsx-scope': off,
    'react/sort-comp': off,
    'react/style-prop-object': off,
    semi: off,
  },
  overrides: [{
    files: [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    rules: {
      '@typescript-eslint/explicit-function-return-type': off,
      'max-len': off,
    }
  }],
};
