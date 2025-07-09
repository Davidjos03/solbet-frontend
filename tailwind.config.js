/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      prime: "#2A62C1",
      white: "#FFFFFF",
      main: "#0C122C",
      grey: "#697184",
      "light-grey": "#B9BCC5",
      secondary: "#09A0FC",
      layer: "#162135",
      layer2: "#27354F",
      border: "#1D2538",
    },
    fontFamily: {
      inter: ["Inter"],
      racing: ["Racing Sans One"],
    },
    extend: {
      screens: {
        "4xs": "280px",
        // => @media (min-width: 280px) { ... }
        "3.5xs": "320px",
        // => @media (min-width: 320px) { ... }
        "3xs": "375px",
        // => @media (min-width: 375px) { ... }
        "2xs": "414px",
        // => @media (min-width: 414px) { ... }
        xs: "520px",
        // => @media (min-width: 414px) { ... }
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        sm2: "724px",
        // => @media (min-width: 724px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        md2: "896px",
        // => @media (min-width: 896px) { ... }
        md3: "984px",
        // => @media (min-width: 984px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        lg2: "1158px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        "1.5xl": "1375px",
        // => @media (min-width: 1375px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
        "3xl": "1820px",
        // => @media (min-width: 1820px) { ... }
      },
      dropShadow: {
        small: "0.5px 1px 1px 0px #000000A3",
        medium: "0px 15px 24px 0px #05C68133",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to top, #0C122C00, #0C122C)',
        'gradient-primary-reserve': 'linear-gradient(to top, #0C122C, #0C122C00)',
        'gradient-color': 'linear-gradient(105.65deg, #37445C 3.85%, #1D2B45 40.37%)',
        'gradient-border': 'linear-gradient(122.34deg, #57667F 30.62%, #1E2C46 76.94%)',
        'gradient-border-btn': 'linear-gradient(180deg, #57667F 0%, #37445C 100%)',
        'gradient-border-color-btn': 'linear-gradient(180deg, #5D82D0 0%, #4E70BA 100%)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    objectPosition: false,
  },
};
