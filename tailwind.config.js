/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
    	fontFamily: {
    		jedi: ['star-jedi', 'sans-serif'],
    		jedihollow: ['star-jedi-hollow', 'sans-serif'],
    		starjout: ['star-j-out', 'sans-serif'],
    		stjedise: ['st-jedi-se', 'sans-serif'],
    	},
    },
  },
  plugins: [],
}

