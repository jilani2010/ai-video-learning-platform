module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(96,165,250,0.35), 0 30px 80px rgba(14,165,233,0.2)'
      },
      colors: {
        brand: {
          50: '#eefbff',
          100: '#d9f6ff',
          500: '#22c1f1',
          600: '#0ea5e9',
          700: '#0369a1'
        }
      }
    }
  },
  plugins: []
};
