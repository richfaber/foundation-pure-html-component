const imagemin = require( 'imagemin' );
const globby = require( 'globby' );
const path = require( 'path' );

const imageminSharp = require( 'imagemin-sharp' );
// const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require( 'imagemin-mozjpeg' );
const imageminPngcrush = require( 'imagemin-pngcrush' );
const imageminPngquant = require( 'imagemin-pngquant' );
const imageminZopfli = require( 'imagemin-zopfli' );

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