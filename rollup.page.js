import glob from 'glob'; // rollup은 파일 패턴 매칭을 지원하지 않으므로 glob 패키지 사용
import { configs, plugins } from './rollup.configs'

configs.files = 'src/resource/js/page/**/*.js'

function createExport() {
  let files = []

  if (process.argv[4]) {
    files = [process.argv[4]]
  } else {
    files = glob.sync(configs.files)
  }

  return files.map((file) => {

    const output = {
      input: file,
      output: [
        {
          file: file.replace(configs.pathIn + '/', configs.pathOut + '/'),
          format: configs.default,
          sourcemap: ( process.env.NODE_ENV !== 'production' )
        }
      ],
      plugins
    }

    return output;
  });
}

export default createExport();