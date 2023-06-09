module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandsPrimary: "#54c4d5",
        brandsPrimaryDark: "#2facbf",
        brandsPrimaryLight: "#b9e7ee",
        brandsLightOrange: "#f7a919",
        brandsDarkOrange: "#EF7823",
      },
    },
  },
  plugins: [],
};
