/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
      },
    },
    colors: {
      Primary: "#11175D",

      Secondary: "#5F35F5",
      ThirdColor: "#000000",
      lal: "#FF0000",
      FourColor:"#4D4D4D"
    },
  },
  plugins: [],
};
