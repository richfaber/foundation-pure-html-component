import glob from 'glob';
import { configs, plugins } from '../configs'
import pkg from "../package.json";

let argv = process.argv.slice( 2 )
let isWatch = !!argv.length

// watch 대상파일
let files = configs.js.component
// argv[4]: 감지파일
let event = [ argv[1] ] // add, unlink

const createOutput = function ( filename, minify ) {
  return configs.formats.map( function ( format ) {
    const output = {
      // file: `${configs.configs.dest }/resource/js/${filename}${format === configs.default ? '' : `.${format}`}${minify ? '.min' : ''}.js`,
      file: `${ configs.js.src.replace( configs.root, configs.dest ) }/${ filename }${ format === configs.default ? '' : `.${ format }` }.js`,
      format: format,
      sourcemap: configs.sourceMap
    };

    if ( format === 'iife' ) {
      output.name = configs.name ? configs.name : pkg.name;
    }

    return output;
  } );
};

function createExport() {

  return files.map( ( file ) => {
    const filename = file.replace( '.js', '' );

    const output = {
      input: `${ configs.js.src }/${ file }`,
      output: createOutput( filename ),
      plugins: plugins.js
    }

    return output;
  } );

}

export default createExport();