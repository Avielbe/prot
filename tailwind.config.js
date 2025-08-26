/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  // theme: { extend: {} },
  theme: {
  extend: {
    animation: {
      'hue-rotate': 'hue 6s linear infinite'
    },
    keyframes: {
      hue: { '0%': { filter: 'hue-rotate(0deg)' }, '100%': { filter: 'hue-rotate(360deg)' } }
    }
  }
}

  plugins: [animate],
}

