import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', 'sans-serif'],
            },
            keyframes: {
                moveLeft: {
                  '0%': { transform: 'translateX(100vw)' }, 
                  '100%': { transform: 'translateX(0%)' },
                },
                moveRight: {
                  '0%': { transform: 'translateX(0%)' },
                  '100%': { transform: 'translateX(100vw)' },
                },
              },
              animation: {
                moveLeft: 'moveLeft 1s ease-in-out',
                moveRight: 'moveRight 1s ease-in-out',
            },            
        },
    },

    plugins: [forms],
};
