// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        // tweak hex to match your design
        emerald: {
          900: "#0F3C32", // dark green used for the pill and big panel
        },
        coral: {
          500: "#ff7f50",
        },
      },
    },
  },
  plugins: [],
};
