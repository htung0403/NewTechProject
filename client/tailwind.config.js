const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0 0 128px 0 rgba(0,0,0,0.1), 0 32px 64px -48px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        'bot': '13px 13px 13px 3px',
        'user': '13px 13px 3px 13px',
      },
      outline: {
        custom: '1px solid #CCCCE5',
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
