/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            spacing: {
                "sm": "var(--spacing-sm)"
            },
            colors: {
                "primary": "var(--colors-primary)"
            },
            dropShadow: {
                "block-xs": "var(--drop-shadow-block-xs)",
                "block-sm": "var(--drop-shadow-block-sm)",
                "block": "var(--drop-shadow-block-sm)",
                "block-md": "var(--drop-shadow-block-md)",
                "block-lg": "var(--drop-shadow-block-lg)",

            }
        },
    },
    plugins: [],
}
