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
            fontFamily: {
                sans: ['PP Neue Montreal', 'Satoshi Variable', 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', 'sans'],
                mono: ['PP NeueBit']
            },
            spacing: {
                ...Object.fromEntries(
                    ['sm', 'md', 'lg', 'step'].map(s => [s, `var(--spacing-${s})`])
                )
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

