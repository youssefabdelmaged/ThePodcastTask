/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors (Purple Theme)
        primary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },

        // Secondary Colors (Green/Accent)
        secondary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },

        // Success/Play Button Color
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#04d361", // Podcastr's green
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },

        // Warning Colors
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },

        // Error Colors
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },

        // Neutral Colors (Enhanced)
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },

        // Gray Scale (Podcastr Theme)
        gray: {
          50: "#f7f8fa", // Background
          100: "#f1f3f4",
          200: "#e6e8eb", // Navbar background
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        // Podcast Specific Colors
        podcast: {
          purple: "#8257e5", // Main brand purple
          green: "#04d361", // Play button green
          dark: "#171717", // Text color
          light: "#f7f8fa", // Background
          sidebar: "#8257e5", // Sidebar background
          navbar: "#e6e8eb", // Navbar background
        },

        // Audio Player Colors
        player: {
          background: "#faf5ff", // Purple-50
          border: "#e5e7eb",
          progress: "#04d361",
          control: "#6b7280",
          controlHover: "#374151",
          playButton: "#04d361",
          playButtonHover: "#16a34a",
        },

        // Episode Card Colors
        episode: {
          background: "#ffffff",
          border: "#e5e7eb",
          hover: "#f9fafb",
          title: "#111827",
          subtitle: "#6b7280",
          meta: "#9ca3af",
        },

        // Category Colors
        category: {
          technology: "#3b82f6",
          business: "#10b981",
          science: "#8b5cf6",
          health: "#ef4444",
          education: "#f59e0b",
          entertainment: "#ec4899",
          news: "#6b7280",
          sports: "#059669",
          music: "#7c3aed",
          comedy: "#dc2626",
        },
      },

      // Background Colors
      backgroundColor: {
        "podcast-light": "#f7f8fa",
        "podcast-sidebar": "#8257e5",
        "podcast-navbar": "#e6e8eb",
        "player-background": "#faf5ff",
      },

      // Text Colors
      textColor: {
        "podcast-dark": "#171717",
        "podcast-light": "#f7f8fa",
        "podcast-muted": "#6b7280",
      },

      // Border Colors
      borderColor: {
        "podcast-light": "#e5e7eb",
        "podcast-medium": "#d1d5db",
        "player-border": "#e5e7eb",
      },

      // Spacing (Custom)
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      // Typography
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      // Border Radius
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      // Box Shadow
      boxShadow: {
        podcast:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "podcast-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        player:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },

      // Animation
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      // Keyframes
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
