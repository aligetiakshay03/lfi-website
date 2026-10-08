/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        customFont: ['HelveticaNeue']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "checkIcon": "checkIcon 0.5s ease-in-out",
        "checkDraw": "checkDraw 0.4s ease-out 0.1s both",
        "badgeIn": "badgeIn 0.6s ease-out both",
        "badgeGlow": "badgeGlow 3s ease-in-out infinite",
        "badgeSheen": "badgeSheen 1.8s ease-in-out infinite",
      },
      keyframes: {
        "badgeIn": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "badgeGlow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(230, 236, 237, 0)" },
          "50%": { boxShadow: "0 0 18px 2px rgba(230, 236, 237, 0.22)" },
        },
        "badgeSheen": {
          "0%": { transform: "translateX(-120%)" },
          "65%": { transform: "translateX(220%)" },
          "100%": { transform: "translateX(220%)" },
        },
        "checkIcon": {
          "0%": {
            height: '0',
            width: '0',
            opacity: '1',
          },
          "20%": {
            height: '0',
            width: "28px",
            opacity: 1,
          },
          "40%": {
            height: "56px",
            width: "28px",
            opacity: '1',
          },
          "100%": {
            height: "56px",
            width: "28px",
            opacity: '1',
          }
        },
        "checkDraw": {
          "0%": { strokeDashoffset: "30" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
