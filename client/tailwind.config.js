export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: '#0f1b2d',
                'navy-light': '#1a2d47',
                accent: '#ff6b35',
                'accent-light': '#ff8c5a',
                teal: '#00c9a7',
                'teal-dark': '#00a88a',
                cream: '#faf8f5',
                'warm-gray': '#f5f0eb',
                gold: '#f4c430',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Oswald', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
