/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#044890",
        secondary: "#669aca",
        light: "#eef2f7",
        borderColor: "#dbe4f0",
      },

      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lora", "serif"],
      },

      boxShadow: {
        soft: "0 18px 45px rgba(4, 72, 144, 0.12)",
      },

      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(4,72,144,0.96), rgba(102,154,202,0.78))",
      },
    },
  },

  plugins: [],
};
