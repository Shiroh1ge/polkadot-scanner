module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports', 'react'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        printWidth: 120,
        bracketSpacing: true,
        arrowParens: 'always',
        trailingComma: 'all'
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.tsx'],
      extends: [
        'ts-react-important-stuff',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
      ],
      "rules": {
        "no-undef": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
        "react-hooks/exhaustive-deps": "off",
        'no-console': 'off',
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint']
    }
  ]
};
