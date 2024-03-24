/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#627254',
        primary2: '#76885B',
        primary3: '#DDDDDD',
        primary4: '#EEEEEE'
      },
      backgroundColor: {
        primary1: '#627254',
        primary2: '#76885B',
        primary3: '#DDDDDD',
        primary4: '#EEEEEE'
      },
      borderColor: {
        primary1: '#627254',
        primary2: '#76885B',
        primary3: '#DDDDDD',
        primary4: '#EEEEEE'
      },
      fontSize: {
        'heading1': '35px',
        'heading2': '30px',
        'heading3': '25px',
        'heading4': '20px',
        'body': '18px',
        'link': '18px'
      }
      , fontFamily: {

        Kantumruy: 'Kantumruy Pro'
      },


    },
  },
  plugins: [],
}