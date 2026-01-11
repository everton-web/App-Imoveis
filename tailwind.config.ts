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
                    main: "#1C3F3A",
                    hover: "#16332F",
                    DEFAULT: "#1C3F3A",
                },
                secondary: {
                    main: "#EBE8D8",
                    light: "#F5F3EB",
                    dark: "#DCD8C0",
                    DEFAULT: "#EBE8D8",
                },
                accent: {
                    main: "#FF6B6B",
                    signal: "#22C55E",
                    warning: "#F59E0B",
                    DEFAULT: "#FF6B6B",
                },
                background: {
                    default: "#FFFFFF",
                    subtle: "#F9FAFB",
                    dark: "#1C3F3A",
                },
                text: {
                    primary: "#111827",
                    secondary: "#4B5563",
                    muted: "#9CA3AF",
                    inverted: "#FFFFFF",
                },
                border: {
                    light: "#E5E7EB",
                    focus: "#1C3F3A",
                    DEFAULT: "#E5E7EB",
                },
            },
            fontFamily: {
                heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
                body: ["var(--font-body)", "Inter", "sans-serif"],
            },
            fontSize: {
                "display-1": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "display-2": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
                "heading-3": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
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
                full: "9999px",
            },
            spacing: {
                section: "5rem",
            },
            backdropBlur: {
                glass: "12px",
            },
            boxShadow: {
                soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                medium: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
                glow: "0 0 15px rgba(28, 63, 58, 0.3)",
            },
        },
    },
    plugins: [],
};

export default config;
