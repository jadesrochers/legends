import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";

export default {
    input: './src/index.js',
    external: ['react', '@emotion/react', '@jadesrochers/histograminteract', 'd3-format', 'ramda' ],
    output: [
        {
            format: 'umd',
            file: './dist/legends-umd.js',
            name: 'legends',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        resolve(),
        commonjs(),
        terser(),
        filesize(),
    ]
}
