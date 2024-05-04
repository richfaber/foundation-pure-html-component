import path from 'path';

import pkg from './package.json'
import { configs, plugins } from './configs'

configs.files = [ 'ui-vendor.js', 'ui-polyfill.js' ]

const pathIn = configs.root + configs.pathIn
const pathOut = configs.dest + configs.pathOut

const createOutput = function ( filename, minify ) {
  return configs.formats.map( function ( format ) {
    const output = {
      // file: `${configs.pathOut}/${filename}${format === configs.default ? '' : `.${format}`}${minify ? '.min' : ''}.js`,
      file: `${ pathOut }/${ filename }${ format === configs.default ? '' : `.${ format }` }.js`,
      format: format,
      sourcemap: ( process.env.NODE_ENV !== 'production' ),
    };

    if ( format === 'iife' ) {
      output.name = configs.name ? configs.name : pkg.name;
    }

    return output;
  } );
};

/**
 * Create export object
 * @return {Array} The export object
 */
const createExport = function ( file ) {

  // Core 번들파일
  const files = configs.files.map( function ( file ) {
    const filename = file.replace( '.js', '' );
    return {
      input: `${ pathIn }/${ file }`,
      output: createOutput( filename ),
      plugins
    };
  } );

  return files
};

export default createExport();
