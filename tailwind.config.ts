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
                    main: "#000000",
                    hover: "#1a1a1a",
                    DEFAULT: "#000000",
                },
                secondary: {
                    main: "#ffffff",
                    light: "#f9fafb",
                    dark: "#f3f4f6",
                    DEFAULT: "#ffffff",
                },
                accent: {
                    main: "#111827",
                    hover: "#374151",
                    light: "#4b5563",
                    DEFAULT: "#111827",
                },
                background: {
                    default: "#ffffff",
                    subtle: "#fafafa",
                    dark: "#111827",
                },
                text: {
                    primary: "#000000",
                    secondary: "#6b7280",
                    muted: "#9ca3af",
                    inverted: "#ffffff",
                },
                border: {
                    light: "rgba(0,0,0,0.05)",
                    focus: "rgba(0,0,0,0.2)",
                    DEFAULT: "rgba(0,0,0,0.1)",
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
                sm: "0.5rem",
                DEFAULT: "1rem",
                md: "1rem",
                lg: "1.5rem",
                xl: "1.5rem",
                "2xl": "2rem",
                full: "9999px",
            },
            spacing: {
                section: "5rem",
            },
            backdropBlur: {
                glass: "16px",
            },
            boxShadow: {
                soft: "0 4px 40px -2px rgba(0, 0, 0, 0.05)",
                medium: "0 10px 50px -3px rgba(0, 0, 0, 0.08)",
                glow: "0 0 20px rgba(0, 0, 0, 0.05)",
                "glow-hover": "0 0 30px rgba(0, 0, 0, 0.1)",
            },
        },
    },
    plugins: [],
};

export default config;
