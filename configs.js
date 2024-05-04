import path from 'path';

import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json'

const exclude = [ 'node_modules/**' ]

const configs = {
  name: pkg.name,
  root: 'src',
  dest: 'dist',
  // formats: ['iife', 'es', 'amd', 'cjs'],
  formats: [ 'iife' ],
  default: 'iife',
  minify: true,
  sourceMap: false
}

const plugins = [
  alias( {
    entries: [
      { find: '@', replacement: path.resolve( __dirname, configs.root ) }
    ]
  } ),
  nodeResolve( {
    // use 'jsnext:main' if possible
    // see https://github.com/rollup/rollup/wiki/jsnext:main
    jsnext: true,
    browser: true
  } ),
  commonjs(),
  eslint( {
    exclude
  } ),
  babel( {
    exclude
  } ),
  json()
]

if ( process.env.NODE_ENV === 'production' ) {

  if ( configs.minify ) {
    plugins.push( terser() )
  }

}

export { configs, plugins, exclude };