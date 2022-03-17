module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  preset: [require("./rubber-preset.js")],
  theme: {
    extend: {},
  },
  plugins: [],
};
