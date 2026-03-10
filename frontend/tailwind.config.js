/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                netflix: {
                    red: '#E50914',
                    black: '#141414',
                    dark: '#181818',
                }
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out',
                'fade-out': 'fadeOut 1s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'grid-move': 'gridMove 30s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                gridMove: {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '100px 100px' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.1)' },
                }
            }
        },
    },
    plugins: [],
}
