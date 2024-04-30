import path from 'path';

import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import eslint from '@rollup/plugin-eslint';
import inject from '@rollup/plugin-inject';

import pkg from './package.json';

// Configs
const configs = {
  name: 'foundationPureHtml',
  root: 'src',
  files: [ 'ui-vendor.js', 'ui-polyfill.js' ],
  // formats: ['iife', 'es', 'amd', 'cjs'],
  formats: [ 'iife' ],
  default: 'iife',
  pathIn: 'src/resource/js',
  pathOut: 'dist/resource/js',
  minify: true,
  sourceMap: false
};

// Banner
const banner = `/*! ${ configs.name } v${ pkg.version } | (c) ${ new Date().getFullYear() } ${ pkg.author.name } */`;

const createOutput = function ( filename, minify ) {
  return configs.formats.map( function ( format ) {
    const output = {
      // file: `${configs.pathOut}/${filename}${format === configs.default ? '' : `.${format}`}${minify ? '.min' : ''}.js`,
      file: `${ configs.pathOut }/${ filename }${ format === configs.default ? '' : `.${ format }` }.js`,
      format: format,
      banner: banner,
      sourcemap: true,
    };

    if ( format === 'iife' ) {
      output.name = configs.name ? configs.name : pkg.name;
    }

    if ( process.env.NODE_ENV === 'production' ) {
      output.sourcemap = configs.sourceMap
    }

    return output;
  } );
};

/**
 * Create export object
 * @return {Array} The export object
 */
const createExport = function ( file ) {

  const plugins = [
    alias( {
      entries: [
        { find: '@', replacement: path.resolve( __dirname, configs.root ) }
      ]
    } ),
    nodeResolve( {
      // use "jsnext:main" if possible
      // see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,
      browser: true
    } ),
    commonjs(),
    eslint( {
      exclude: [],
    } ),
    babel( {
      exclude: 'node_modules/**',
    } ),
    json()
  ]

  if ( process.env.NODE_ENV === 'production' ) {

    if ( configs.minify ) {
      plugins.push( terser() )
    }

  }

  return configs.files.map( function ( file ) {
    const filename = file.replace( '.js', '' );
    return {
      input: `${ configs.pathIn }/${ file }`,
      output: createOutput( filename ),
      plugins
    };
  } );
};

export default createExport();
