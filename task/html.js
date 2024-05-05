import nunjucksToHtml from 'nunjucks-to-html'
import globby from 'globby'
import fs from 'fs'

import { html as beautify } from 'js-beautify';

import { configs } from '../configs'

const htmlFormat = {
  indent_size: 2, // 들여쓰기 크기 [4]
  indent_char: " ", // 들여쓰기 문자 [" "]
  end_with_newline: false, // 마지막에 새로운 줄 시작
  preserve_newlines: false, // 기존 줄바꿈 유지
  indent_inner_html: false, // <head> 및 <body> 섹션을 들여씀
  indent_empty_lines: false, // 빈라인을 유지할지 여부
}

let argv = process.argv.slice( 2 )
let isWatch = !!argv.length

// watch 대상파일
let files = [ argv[0] ]
let event = [ argv[1] ] // add, unlink
let prefix = `${ configs.root }/page/`

function compatiblePath( str ) {
  return str.replace( /\\/g, '/' )
}

function compileHtml() {

  nunjucksToHtml( files, configs.nunjucks ).then( async ( results ) => {

    for ( const file of files ) {
      const filePath = `${ configs.dest }/${ file }`.replace( '.njk', '.html' );

      try {

        let htmlContent = await fs.readFileSync( filePath, 'utf8' );
        const beautifulHtml = await beautify( htmlContent, htmlFormat );

        // @TODO: body 내용 중, 태그 안에 있는 HTML 특수문자 처리
        await fs.writeFileSync( filePath, beautifulHtml, 'utf8' );
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

  files[0] = compatiblePath( files[0] ).replace( prefix, '' )
  compileHtml()

} else {

  globby( prefix + '**/*.njk', { nodir: true } ).then( filePaths => {
    files = filePaths.map( filePath => filePath.replace( prefix, '' ) )
  } ).then( compileHtml )

}