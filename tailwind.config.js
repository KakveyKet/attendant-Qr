/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#1C1678',
        primary2: '#0E46A3',
        primary3: '#DDDDDD',
        primary4: '#EEEEEE'
      },
      backgroundColor: {
        primary1: '#1C1678',
        primary2: '#0E46A3',
        primary3: '#DDDDDD',
        primary4: '#EEEEEE'
      },
      borderColor: {
        primary1: '#1C1678',
        primary2: '#0E46A3',
        primary3: '#DDDDDD',
        primary4: '#EEEEEE'
      },
      fontSize: {
        'heading1': '32px',
        'heading2': '27px',
        'heading3': '22px',
        'heading4': '17px',
        'body': '16px',
        'link': '16px'
      }
      , fontFamily: {

        Kantumruy: 'Kantumruy Pro'
      },


    },
  },
  plugins: [],
}