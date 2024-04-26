const nunjucksToHtml = require('nunjucks-to-html');

nunjucksToHtml( [ '**/*.njk' ], {
  'config': 'nunjucks.config.js',
  'dest': 'dist',
  'ext': '.html',
  'baseDir': 'src/page',
  'cwd': process.cwd(),
  'flatten': false
}).then( ( results ) => {

  console.log('## Nunjucks 컴파일 완료')

})
.catch( ( error ) => {

  console.log('error ->\n', error)

});

// Produces the same result as calling:
// nunjucksToHtml().then((results) => {}).catch((error) => {});