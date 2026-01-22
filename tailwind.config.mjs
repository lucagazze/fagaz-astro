import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"primary": "#433ba0",
				"primary-light": "#7076ca",
				"background-light": "#f9f9fb",
				"background-dark": "#15141e",
			},
			fontFamily: {
				"display": ["Inter", "sans-serif"]
			},
			borderRadius: {
				"DEFAULT": "0.375rem",
				"lg": "0.5rem",
				"xl": "0.75rem", 
				"full": "9999px"
			},
		},
	},
	plugins: [
		forms,
		containerQueries,
	],
}
