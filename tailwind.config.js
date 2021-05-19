module.exports = {
    purge: {
        enabled: true,
        layers: ['components', 'utilities'],
        content: [
            './src/index.html',
            './src/js/*.js',
        ],
        preserveHtmlElements: false,
        css: ['./src/css/*.css']
    },
    darkMode: false, // or 'media' or 'class'
    important: true,
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
}
