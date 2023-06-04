module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // 'bg-primary':"black",
        'bg-primary':"rgb(31,28,28)",
        'bg-secondary':"black",
        "bg-dull":'silver',
        "bg-main":'rgb(31, 28, 28)',
        'text-primary':'white',
        'text-secondary':'grey',
        "movie-button":'red',
        "music-button":'darkgreen'
      },
      padding:{
        'movie-left':'9rem'
      },
      screens:{
        'xs':'426px'
      }
    },
  },
  plugins: [],
}