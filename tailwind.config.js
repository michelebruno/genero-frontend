/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./pages/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}", "./app.vue",],


    theme: {
        extend: {
            fontFamily: {
                sans: ['PP Neue Montreal', 'Satoshi Variable', 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', 'sans'],
                mono: ['PP NeueBit']
            }, spacing: {
                ...Object.fromEntries(['sm', 'md', 'lg', 'xl', 'step', 'outsides', 'navbar'].map(s => [s, `var(--spacing-${s})`]))
            }, fontSize: {
                "fix-mono": ['1.5em',1],
                ...Object.fromEntries(['lead', 'display-1', 'display-2', 'h2', 'h3', 'sm'].map(s => [s, [`var(--font-size-${s})`, `var(--leading-${s}, 1.15)`,]]))
            }, colors: {
                "primary": {
                    DEFAULT: "var(--colors-primary)", light: "var(--colors-primary-light)",
                },
                green: '#43D200'
            }, dropShadow: {
                "block-xs": "var(--drop-shadow-block-xs)",
                "block-sm": "var(--drop-shadow-block-sm)",
                "block": "var(--drop-shadow-block-sm)",
                "block-md": "var(--drop-shadow-block-md)",
                "block-lg": "var(--drop-shadow-block-lg)",

            }
        },
    },

    plugins: [require('@tailwindcss/typography'),],
}

