/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        "primary": "#f2df0d",
        "primary-hover": "#d4c30b",
        "primary-light": "rgba(242, 223, 13, 0.1)",
        
        // Background colors
        "background-light": "#f8f8f5",
        "background-dark": "#0a0a05",
        "surface-dark": "#1e1d0f",
        "card-dark": "#1a1a1a",
        "sidebar-dark": "#181818",
        
        // Accent colors
        "rich-brown": "#3d2b1f",
        "accent-brown": "#494622",
        "muted-gold": "#cbc690",
        "border-gold": "#494622",
        
        // Text colors
        "text-cream": "#f5f5f0",
        "text-muted": "#cbc690",
        
        // Status colors
        "success": "#22c55e",
        "warning": "#f59e0b",
        "error": "#ef4444",
        "info": "#3b82f6"
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "serif": ["Playfair Display", "Newsreader", "Georgia", "serif"],
        "sans": ["Inter", "Noto Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      boxShadow: {
        "glow": "0 0 20px rgba(242, 223, 13, 0.3)",
        "glow-lg": "0 0 30px rgba(242, 223, 13, 0.5)",
        "luxury": "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, rgba(10, 10, 5, 0.3) 0%, rgba(10, 10, 5, 0.9) 100%)",
        "luxury-gradient": "radial-gradient(circle at center, #3d2b1f 0%, #0a0a05 100%)",
        "section-divider": "linear-gradient(to bottom, #0a0a05, #3d2b1f, #0a0a05)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
