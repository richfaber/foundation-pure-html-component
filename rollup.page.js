import glob from 'glob';
import { configs, plugins } from './configs'

configs.files = 'src/resource/js/page/**/*.js'

// watch 대상파일
let files = [ process.argv[4] ]

function createExport() {

  if ( !files[0] ) {
    files = glob.sync( configs.files )
  }

  return files.map( ( file ) => {

    const output = {
      input: file,
      output: [
        {
          file: file.replace(/\\/g, '/').replace( configs.root + '/resource/js/', configs.dest + '/resource/js/' ),
          format: configs.default,
          sourcemap: configs.sourceMap
        }
      ],
      plugins
    }

    return output;
  } );
}

export default createExport();