/** @type {import('tailwindcss').Config} **/
export const content = [
  './app/**/*.{js,jsx,ts,tsx}',
  './components/**/*.{js,jsx,ts,tsx}',
];
export const theme = {
  extend: {
    fontFamily: {
      'playfair': ['var(--font-playfair)', 'Playfair Display', 'serif'],
      'dm-sans': ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
    },
    colors: {
      imperial: {
        terracotta: '#c05a2a',
        dark: '#a64d24',
        cream: '#faf7f2',
        linen: '#ede2d0',
        gold: '#d4af37',
        charcoal: '#2b2b2b',
        warm: '#f1ece4',
      },
    },
  },
};
export const plugins = [];