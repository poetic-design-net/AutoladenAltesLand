/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          'blue': '#003366',
          'lightblue': '#3366CC', 
          'green': '#009966',
        }
      }
    },
  },
  plugins: [],
}