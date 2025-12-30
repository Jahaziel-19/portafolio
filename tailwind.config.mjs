/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6', // Blue for Python/Tech vibe
        secondary: '#10b981', // Emerald for Django/Success
        dark: '#0f172a',
      }
    },
	},
	plugins: [],
}
