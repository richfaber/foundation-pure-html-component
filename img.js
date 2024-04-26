const imagemin = require( 'imagemin-dir' );
const imageminSharp = require( 'imagemin-sharp' );
// const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require( 'imagemin-mozjpeg' );
const imageminPngcrush = require( 'imagemin-pngcrush' );
const imageminPngquant = require( 'imagemin-pngquant' );
const imageminZopfli = require( 'imagemin-zopfli' );

imagemin([ "src/resource/image/**/*.{jpg,jpeg,png,gif}" ], {
  destination: "dist",
  plugins: [
    imageminSharp(),
    // imageminWebp({ quality: 80 }),
    imageminMozjpeg(),
    imageminPngcrush(),
    imageminPngquant(),
    imageminZopfli()
  ]
}).then( ( files ) => {
  // console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
  console.log( '## 이미지 압축 완료' );
})