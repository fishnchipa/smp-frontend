import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'royal': '#051F30',
  			'light-royal': '#163447',
  			'light-murky': '#2D4351',
  			'murky': '#A3A3A3',
  			'smokey': '#C0C0C0',
        "light-smokey": "#F1F1F1",
  			'aqua': '#4FBFA9',
        "soft-aqua": "#7FDECB",
  			'light-aqua': '#D9FFF7',
  			'violet': '#954AFD',
        "soft-violet": "#AE74FF",
  			'light-violet': '#EFE3FF',
  			'ocean': '#263EFF',
        "soft-ocean": "#8895FF",
  			'light-ocean': '#CED4FF',
  			'gold': '#FFAE00',
  			'light-gold': '#FFF4DD',
  			'lonely': '#F6F6F6',
        "easy": "#5FD077",
        "medium": "#FFAE00",
        "hard": "#FF3300"
  		},
  		width: {
  			'slide': '1374px'
  		},
  		maxWidth: {
  			'slide': '1374px',
        "page": "1000px"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [animate, forms],
} satisfies Config;
