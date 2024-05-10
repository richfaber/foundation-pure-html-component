import nunjucksToHtml from 'nunjucks-to-html'
import globby from 'globby'
import fs from 'fs'
import path from 'path'

import { html as beautify } from 'js-beautify';
import { configs } from '../configs'

let argv = process.argv.slice( 2 )
let isWatch = !!argv.length

// watch 대상파일
let files = [ argv[0] ]
let event = [ argv[1] ] // add, unlink
let prefix = `${ configs.root }/page/`

function compatiblePath( str ) {
  return str.replace( /\\/g, '/' )
}

function convertSrcToRelativePath(htmlContent, currentFilePath) {

  htmlContent = htmlContent.replace(/(?:src|href)="(.*?)"|'(.*?)'/g, (match, p1, p2) => {
    const srcPath = p1 || p2; // p1, p2 중 하나는 undefined 일 것입니다.
    if (!srcPath) return match; // src 경로가 없으면 변경하지 않습니다.

    let relativeSrcPath = path.relative(path.dirname(currentFilePath), configs.dest).replace(/\\/g, '/')
    let resourcePath = (relativeSrcPath) ? srcPath : srcPath.replace(/^\//g, '')
    let type = 'src'

    switch(true) {
      case /\/css\//g.test(srcPath):
        type = 'href'
        break;
    }

    return `${type}="${relativeSrcPath}${resourcePath}"`;
  });

  return htmlContent;
}

function compileHtml() {

  nunjucksToHtml( files, configs.html.nunjucks ).then( async ( results ) => {

    for ( const file of files ) {
      const filePath = `${ configs.dest }/${ file }`.replace( '.njk', '.html' );

      try {

        let htmlContent = await fs.readFileSync( filePath, 'utf8' );
        htmlContent = await beautify( htmlContent, configs.html.format );

        if(configs.html.relativePath) htmlContent = convertSrcToRelativePath(htmlContent, filePath);

        // @TODO: body 내용 중, 태그 안에 있는 HTML 특수문자 처리 필요

        // @TODO: lint html
        await fs.writeFileSync( filePath, htmlContent, 'utf8' );
        console.log( '[html 컴파일]', filePath )

      } catch ( error ) {

        console.error( `파일 처리 중 오류가 발생했습니다: ${ error }` );

      }
    }

  } ).catch( ( error ) => {

    console.log( 'error ->\n', error )

  } );
}

// 감지상태 이고, 레이아웃 파일의 변경이 아닌 경우
if ( isWatch && !/^src\/layout/.test( files[0] ) ) {
  console.log(`[html 감지]`, files, event)

  if ( event == 'unlink' ) {
    process.exit( 1 )
  }

  files[0] = compatiblePath( files[0] ).replace( 'src/', '' )
  compileHtml()

} else {

  globby( [`${ configs.root }/**/*.njk`, `!${ configs.root }/layout/**`] ).then( filePaths => {
    files = filePaths.map( filePath => filePath.replace( 'src/', '' ) )
  } ).then( compileHtml )

}