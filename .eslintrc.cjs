module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist',
    '*.js',
    'node_modules',
    'alias.ts',
    '*.config.ts',
    '*.d.ts',
    'codegen.ts',
    '*.cjs',
    '*.schemas.tsx',
    'tsconfig.json',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:@vitest/legacy-recommended',
    'plugin:jsonc/recommended-with-jsonc',
  ],
  plugins: [
    'perfectionist',
    'prettier',
    'react-refresh',
    'unused-imports',
    'sort-destructure-keys',
    'simple-import-sort',
  ],
  overrides: [
    // TypeScript files
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        /* React Rules*/
        'react/react-in-jsx-scope': 'off',
        'react/destructuring-assignment': 'error',
        'react/function-component-definition': [
          'warn',
          {
            namedComponents: 'function-declaration',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/hook-use-state': 'error',
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-handler-names': ['off', { checkInlineFunction: true }],
        'react/jsx-no-leaked-render': 'error',
        'react/button-has-type': 'error',
        'react/no-array-index-key': 'off',
        'react/no-unused-prop-types': 'error',
        'react/self-closing-comp': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react/jsx-no-script-url': [
          'error',
          [
            {
              name: 'Link',
              props: ['to'],
            },
          ],
        ],
        'react/prop-types': 'off',

        /* Typescript Rules*/
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports' },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
            selector: 'variable',
          },
          {
            format: ['camelCase', 'PascalCase'],
            selector: 'function',
          },
          {
            format: ['camelCase'],
            selector: ['objectLiteralProperty', 'typeProperty'],
          },
          {
            format: ['PascalCase'],
            selector: ['enum', 'enumMember', 'class', 'interface', 'typeAlias'],
          },
          {
            format: ['camelCase'],
            leadingUnderscore: 'require',
            modifiers: ['unused'],
            selector: 'parameter',
          },
        ],
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            next: ['interface', 'type', 'block-like'],
            prev: '*',
          },
          {
            blankLine: 'always',
            next: ['*'],
            prev: ['interface', 'type', 'block-like'],
          },
          {
            blankLine: 'any',
            prev: ['case', 'default'],
            next: ['case', 'default'],
          },
        ],
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/restrict-template-expressions': 'warn',
      },
    },

    // JSON and JSONC files
    {
      files: ['*.json', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-jsonc'],
      rules: {
        // 👉 only JSON-specific rules go here
        'jsonc/sort-keys': [
          'error',
          'asc',
          {
            caseSensitive: true,
            natural: false,
            minKeys: 2,
            allowLineSeparatedGroups: false,
          },
        ],
      },
    },
  ],
  rules: {
    /* Coding Convention Rules */
    'array-callback-return': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    complexity: ['warn', 30],
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-notation': 'error',
    'generator-star-spacing': 'error',
    'import/newline-after-import': 'error',
    'import/no-mutable-exports': 'error',
    'max-lines': ['error', 500],
    'max-params': ['error', 3],
    'multiline-comment-style': ['error', 'separate-lines'],
    'no-console': 'warn',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-lonely-if': ['error'],
    'no-loop-func': 'error',
    'no-nested-ternary': ['error'],
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-param-reassign': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['lodash'],
            message: "Please use import from 'lodash-es' instead.",
          },
          {
            group: ['moment'],
            message: "Please use import from 'dayjs' instead.",
          },
          {
            group: ['../../*'],
            message: 'Please use alias import instead of deep parent import',
          },
        ],
      },
    ],
    'no-unneeded-ternary': ['error'],
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-destructuring': ['error'],
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    'comma-dangle': [0, 'always-multiline'],
    'no-shadow': 'off',
    camelcase: 1,
    'no-empty-function': 1,
    'no-use-before-define': 0,
    'no-unsafe-optional-chaining': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'func-names': ['error', 'never'],

    /* Sort Rules */
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-exports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-interfaces': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-enums': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      },
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      2,
      { caseSensitive: false },
    ],
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/features/global-settings',
            from: './src/features',
            except: ['./global-settings'],
          },
          {
            target: './src/features',
            from: './src/app',
          },
          {
            target: ['./src/shared', './src/lib'],
            from: ['./src/features', './src/app'],
          },
        ],
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
