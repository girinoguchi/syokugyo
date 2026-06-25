/** エンジン テーマの Tailwind 設定（theme:build / theme:watch で使用） */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.php',
    './template-parts/**/*.php',
    './src/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        // 正式ブランドカラー
        ink: '#2b2620',
        telecareer: {
          yellow: '#fbc02d',
          orange: '#f57c20',
          green: '#8dc63f',
          coral: '#ff7f66',
          ink: '#2b2620',
          dark: '#1f1f1f',
          surface: '#fffaf5',
          hero: '#fff1e9',
          'text-on-dark': '#f3eee6',
        },
        // 明背景上でAAを確保するテキスト用
        'coral-a11y': '#c2452c',
        'green-a11y': '#4e7d1f',
        'orange-a11y': '#b35e12',
      },
      fontFamily: {
        sans: ['"Zen Kaku Gothic New"', '"Hiragino Kaku Gothic ProN"', 'sans-serif'],
        display: ['"Zen Maru Gothic"', '"Hiragino Kaku Gothic ProN"', 'sans-serif'],
      },
      boxShadow: {
        pop: '4px 4px 0 0 rgba(31,31,31,1)',
      },
    },
  },
  plugins: [],
};
