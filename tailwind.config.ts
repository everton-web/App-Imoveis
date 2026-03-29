import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    main: "#f97316", // Aetheos Orange
                    hover: "#ea580c",
                    DEFAULT: "#f97316",
                },
                secondary: {
                    main: "#000000",
                    light: "#0a0a0a", // Surface color for cards
                    dark: "#050505",
                    DEFAULT: "#000000",
                },
                accent: {
                    main: "#06b6d4", // Cyan for secondary glows
                    hover: "#0891b2",
                    light: "#22d3ee",
                    DEFAULT: "#06b6d4",
                },
                background: {
                    default: "#000000",
                    subtle: "#0a0a0a",
                    dark: "#000000",
                },
                text: {
                    primary: "#ffffff",
                    secondary: "#a3a3a3", // Neutral 400
                    muted: "#525252",
                    inverted: "#000000",
                },
                border: {
                    light: "rgba(255,255,255,0.05)",
                    focus: "rgba(249,115,22,0.5)",
                    DEFAULT: "rgba(255,255,255,0.05)",
                },
            },
            fontFamily: {
                heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
                body: ["var(--font-body)", "Inter", "sans-serif"],
            },
            fontSize: {
                "display-1": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "800" }],
                "display-2": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
                "heading-3": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
                "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
                body: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
                caption: ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
            },
            borderRadius: {
                sm: "0.375rem",
                DEFAULT: "0.75rem",
                md: "0.75rem",
                lg: "1rem",
                xl: "1.5rem",
                "2xl": "2rem",
                full: "9999px",
            },
            spacing: {
                section: "5rem",
            },
            backdropBlur: {
                glass: "12px",
            },
            boxShadow: {
                soft: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
                medium: "0 10px 30px -3px rgba(0, 0, 0, 0.6)",
                glow: "0 0 20px rgba(249, 115, 22, 0.15)",
                "glow-hover": "0 0 30px rgba(249, 115, 22, 0.3)",
            },
        },
    },
    plugins: [],
};

export default config;
