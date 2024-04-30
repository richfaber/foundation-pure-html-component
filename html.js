const nunjucksToHtml = require('nunjucks-to-html');

nunjucksToHtml( [ '**/*.njk' ], {
  'config': 'nunjucks.config.js',
  'dest': 'dist',
  'ext': '.html',
  'baseDir': 'src/page',
  'cwd': process.cwd(),
  'flatten': false
}).then( ( results ) => {

})
.catch( ( error ) => {

  console.log('error ->\n', error)

});