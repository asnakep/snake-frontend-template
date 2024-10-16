/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '30': '7.5rem',  // Adds spacing equivalent to 120px
        '40': '10rem',   // Adds spacing equivalent to 160px
        '50': '12.5rem', // Adds spacing equivalent to 200px
        // You can add more spacing values if needed
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["black"],
  },
};
