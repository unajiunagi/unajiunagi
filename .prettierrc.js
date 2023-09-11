module.exports = {
  endOfLine: 'lf', // 改行文字をLF（Unixスタイル）に設定
  semi: true, // セミコロンを自動挿入
  singleQuote: true, // シングルクォートを使用
  jsxSingleQuote: true, // JSX内でもシングルクォートを使用
  tabWidth: 2, // インデント幅を2に設定
  trailingComma: 'es5', // ES5互換のトレイリングカンマを使用
  singleAttributePerLine: false, // 複数の属性を同じ行に配置
  printWidth: 300, // 行の最大文字数を300に設定
  bracketSameLine: false, // オブジェクトの開始括弧を新しい行に配置
  arrowParens: 'always', // アロー関数のパラメータに常に括弧を付ける
  htmlWhitespaceSensitivity: 'css', // HTMLの空白文字処理をCSSに設定
  useTabs: false, // インデントにスペースを使用
  proseWrap: 'preserve', // テキストの折り返し方法を保持
  embeddedLanguageFormatting: 'auto', // 埋め込まれた言語のフォーマットを自動判定
  quoteProps: 'as-needed', // オブジェクトのプロパティ名に必要な場合のみ引用符を使用
  bracketSpacing: true, // オブジェクトリテラルの括弧の間にスペースを追加
};
