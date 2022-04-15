import path from 'path';

/**
 * @type {import('vite').UserConfig}
 */
const config = {
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/index.js'),
            name: 'testing-library-selectors',
            fileName: (format) => `testing-library-selectors.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['@testing-library/dom'],
        },
    },
    test: {
        environment: "happy-dom"
    }
};

export default config;
