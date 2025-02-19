import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve"
import terser from '@rollup/plugin-terser';
import json from "@rollup/plugin-json"

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/sval.js',
      globals: {
        acorn: 'acorn'
      }
    },
    external: ['acorn'],
    plugins: [
      json(),
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/sval.es6.js',
      globals: {
        acorn: 'acorn'
      }
    },
    external: ['acorn'],
    plugins: [
      json(),
      typescript({
        compilerOptions: {
          target: 'es6'
        }
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/sval.min.js'
    },
    plugins: [
      json(),
      resolve(),
      typescript(),
      terser()
    ]
  }
]