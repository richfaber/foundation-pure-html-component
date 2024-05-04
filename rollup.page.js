import glob from 'glob'; // rollup은 파일 패턴 매칭을 지원하지 않으므로 glob 패키지 사용
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
          sourcemap: (process.env.NODE_ENV !== 'production')
        }
      ],
      plugins
    }

    return output;
  } );
}

export default createExport();