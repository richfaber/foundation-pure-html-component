import imagemin from 'imagemin';
import globby from 'globby';
import path from 'path';

import imageminSharp from 'imagemin-sharp'
// const imageminWebp from 'imagemin-webp'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngcrush from 'imagemin-pngcrush'
import imageminPngquant from 'imagemin-pngquant'
import imageminZopfli from 'imagemin-zopfli'

const fileInfo = {
  type: "/**/*.{jpg,jpeg,png,gif}",
  src: "src/resource/image",
  dest: 'dist/resource/image'
}

globby( fileInfo.src + fileInfo.type, { nodir: true } ).then( filePaths => {
  filePaths.forEach( filePath => {
    const fileDir = path.dirname( filePath );
    doCompress( filePath, fileDir.replace( fileInfo.src, fileInfo.dest ) );
  } )
} );

function doCompress( srcFile, outDir ) {

  imagemin( [ srcFile ], {
    destination: outDir,
    plugins: [
      imageminSharp(),
      // imageminWebp({ quality: 80 }),
      imageminMozjpeg(),
      imageminPngcrush(),
      imageminPngquant(),
      imageminZopfli()
    ]
  } ).then( ( files ) => {
    console.log( `[이미지압축] ${ srcFile } -> ${ files[0].destinationPath }` )
  } );

}