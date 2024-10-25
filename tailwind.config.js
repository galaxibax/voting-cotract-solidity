/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(132.98deg, rgba(255, 255, 255, 0.09) 0%, rgba(153, 153, 153, 0.09) 100%)',
        'hover-gradient': `linear-gradient(132.98deg, rgba(255, 255, 255, 0.09) 0%, rgba(153, 153, 153, 0.09) 100%), radial-gradient(50% 83.14% at 50% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)`,
        'voiting-gradient': 'linear-gradient(90deg, #E53D2B 0%, #F98738 20%, #F9D549 40%, #FFFFFF 60%, #2BCCF2 80%, #2847D6 100%)',
      },
      colors: {
        'red-custom': '#E53D2B',
        'orange-custom': '#F98738',
        'yellow-custom': '#F9D549',
        'white-custom': '#FFFFFF',
        'blue-light-custom': '#2BCCF2',
        'blue-dark-custom': '#2847D6',
        'default-start': 'rgba(255, 255, 255, 0.09)',
        'default-end': 'rgba(153, 153, 153, 0.09)'
      },
    },
  },
  plugins: [],
}


