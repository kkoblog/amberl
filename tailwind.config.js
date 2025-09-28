/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-[#b6aa98]',
    'bg-[#9cc812]',
    'text-[#4a4a4a]',
    // 他の動的に生成されるクラスもここに追加
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-out forwards',
      },
      textShadow: {
        'strong': '2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 3px rgba(0, 0, 0, 0.8)',
      }
    }
  },
  plugins: []
}
