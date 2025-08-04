import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import vueeslint from 'eslint-plugin-vue'
import vueparser from 'vue-eslint-parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from '@vue/eslint-config-prettier'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '.git/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'warn',
    },
  },
  prettierConfig,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueparser,
      parserOptions: {
        parser: tsparser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue: vueeslint,
      prettier: prettierPlugin,
    },
    rules: {
      // Vue-specific rules
      'vue/html-indent': ['error', 2],
      'vue/html-closing-bracket-newline': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'off',
      semi: ['warn', 'never'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/semi': ['off'],
      'no-extra-semi': 'warn',
      quotes: [2, 'single', { avoidEscape: true }],
      'jsx-quotes': ['error', 'prefer-double'],
      // You can customize rules here
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'prettier/prettier': 'warn',
    },
  },
]
