const sass = require( 'sass' );
const fs = require( 'fs' );
const pkg = require( './package.json' );

// Configs
const configs = {
  name: pkg.name,
  files: [ 'app.scss' ],
  pathIn: 'src/resource/scss',
  pathOut: 'dist/resource/css',
  indentType: 'space',
  indentWidth: 2,
  minify: true,
  sourceMap: ( process.env.NODE_ENV !== 'production' )
};

const getOptions = function ( file, filename, minify ) {
  return {
    file: `${ configs.pathIn }/${ file }`,
    outFile: `${ configs.pathOut }/${ filename }`,
    sourceMap: configs.sourceMap,
    sourceMapContents: configs.sourceMap,
    indentType: configs.indentType,
    indentWidth: configs.indentWidth,
    outputStyle: minify ? 'compressed' : 'expanded'
  };
};

const writeFile = function ( pathOut, fileName, fileData = true ) {
  // Create the directory path
  fs.mkdir( pathOut, { recursive: true }, function ( err ) {
    // If there's an error, throw it
    if ( err ) throw err;

    // Write the file to the path
    fs.writeFile( `${ pathOut }/${ fileName }`, fileData, function ( err ) {
      if ( err ) throw err;

      const data = fs.readFileSync( `${ pathOut }/${ fileName }` );
      const fd = fs.openSync( `${ pathOut }/${ fileName }`, 'w+' );
      fs.writeSync( fd, data, 0, data.length, 0 );
      fs.close( fd, function ( err ) {
        if ( err ) throw err;
        console.log( `Compiled ${ pathOut }/${ fileName }` );
      } )
    } )
  } )
}

const parseSass = function ( file, minify ) {
  const filename = `${ file.slice( 0, file.length - 5 ) }.css`;
  sass.render( getOptions( file, filename, minify ), function ( err, result ) {

    // If there's an error, throw it
    if ( err ) throw err;

    // Write the file
    writeFile( configs.pathOut, filename, result.css );

    if ( configs.sourceMap && !configs.sourceMapEmbed ) {
      // Write external sourcemap
      writeFile( configs.pathOut, filename + '.map', result.map, false );
    }
  } );
};

configs.files.forEach( function ( file ) {

  if ( configs.minify ) {
    parseSass( file, true );
  } else {
    parseSass( file );
  }
} );
