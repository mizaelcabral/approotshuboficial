/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#30e86e",
                "primary-dark": "#28c45d",
                "background-light": "#f6f8f6",
                "background-dark": "#112116",
                "dark-surface": "#1a2e20",
                "text-main": "#0e1b12",
                "text-muted": "#4e9767",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
