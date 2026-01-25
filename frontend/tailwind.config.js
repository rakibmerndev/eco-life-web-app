/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      openSans: "Open Sans",
      dancingScript: "Dancing Script",
      playFairDisplay: "Playfair Display",
    },
    screens: {
      xs: "320px",
      // => @media (min-width: 320px) { ... },
      base: '425px',
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'primary-color': '#2BAE7A',
        'secondary-color': '#8F9779',
        
      },
    },
  },
  plugins: [],
};
