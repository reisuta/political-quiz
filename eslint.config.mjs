// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // TypeScriptの設定: interfaceではなくtypeを使用
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // セミコロンを使用しない
      'semi': ['error', 'never'],

      // シングルクォートを使用
      'quotes': ['error', 'single'],

      // 行末の空白文字を削除
      'no-trailing-spaces': 'error',

      // その他の推奨設定
      'comma-dangle': ['error', 'never'],
      'indent': ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'eol-last': 'error'
    }
  }
)
