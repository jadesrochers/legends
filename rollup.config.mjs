import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";
import filesize from 'rollup-plugin-filesize';


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
        nodeResolve(),
        commonjs(),
        terser(),
        filesize(),
    ]
}
