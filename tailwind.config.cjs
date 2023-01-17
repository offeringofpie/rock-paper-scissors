/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  daisyui: {
    themes: [
      {
        "8bit": {
          primary: "#65a30d",
          secondary: "#ef4444",
          accent: "#fbbf24",
          neutral: "#374559",
          "base-100": "#1c1917",
          info: "#3EAEEA",
          success: "#3ADFAD",
          warning: "#9D600C",
          error: "#EF1A48",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--rounded-box": "0",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
