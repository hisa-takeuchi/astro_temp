const plugin = require('tailwindcss/plugin')

const addVariant = plugin(({ addVariant, e }) => {
  addVariant('where', ':where(&)')
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
    },
    fontFamily: {
      sans: ['Noto Sans JP', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [addVariant],
}
