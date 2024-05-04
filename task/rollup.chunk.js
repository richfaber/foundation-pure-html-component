import pkg from '../package.json'
import { configs, plugins } from '../configs'

configs.files = [ 'ui-vendor.js', 'ui-polyfill.js' ]

const createOutput = function ( filename, minify ) {
  return configs.formats.map( function ( format ) {
    const output = {
      // file: `${configs.configs.dest }/resource/js/${filename}${format === configs.default ? '' : `.${format}`}${minify ? '.min' : ''}.js`,
      file: `${ configs.dest }/resource/js/${ filename }${ format === configs.default ? '' : `.${ format }` }.js`,
      format: format,
      sourcemap: configs.sourceMap
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
      input: `${ configs.root }/resource/js/${ file }`,
      output: createOutput( filename ),
      plugins
    };
  } );

  return files
};

export default createExport();
