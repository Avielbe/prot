/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: { extend: {} },
  plugins: [animate],
}

