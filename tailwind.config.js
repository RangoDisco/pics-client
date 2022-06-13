module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      // Dark theme
      richBlack: "#111418",
      raisinBlack: "#1c2128",
      honeyYellow: "#F7B32B",
      ghostWhite: "#F7F7FF",
      munsellBlue: "#188FA7",
      steelTeal: "#738e93",
      darkSeaGreen: "#7FB685",
      davysGrey: "#5C5C5C",
      red: "#FF1F1F",

      // Light theme
      silk: "#FCF9EE",
      creme: "#F9F4DE",
      rose: "#D5869C",
      orange: "#ffd6a5",
      pastelRed: "#ffadad",
    },
    extend: {},
  },
  plugins: [],
};
