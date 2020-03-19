import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';

export default {
    input: 'src/index.ts',
    output: {
        name: "ng1-shift",
        dir: 'dist',
        format: 'umd',
        sourcemap: true,
    },
    watch: {
        include: 'src/**',
    },
    external: [
        "angular",
        "reflect-metadata",
    ],
    plugins: [
        typescript({ useTsconfigDeclarationDir: true }),
        commonjs(),
        resolve(),
        sourceMaps(),
    ]
};
