const tailwindcss = require( "tailwindcss" );
module.exports = {
    plugins: {
        "postcss-import": {},
        tailwindcss: {},
        autoprefixer: {},
        // eslint-disable-next-line no-dupe-keys
        tailwindcss
    },
};
