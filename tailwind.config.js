module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#15803d", dark: "#14532d", soft: "#ecf5ee" } },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["light"] },
};
