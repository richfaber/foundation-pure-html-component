import nunjucksToHtml from 'nunjucks-to-html'
import * as glob from 'glob'
import fs from 'fs'

import { html as beautify } from 'js-beautify';

import { configs } from './configs'

// watch 대상파일
let files = [ process.argv[2] ]
let prefix = `${ configs.root }/page/`

const htmlFormat = {
  indent_size: 2, // 들여쓰기 크기 [4]
  indent_char: " ", // 들여쓰기 문자 [" "]
  end_with_newline: false, // 마지막에 새로운 줄 시작
  preserve_newlines: false, // 기존 줄바꿈 유지
  indent_inner_html: false, // <head> 및 <body> 섹션을 들여씀
  indent_empty_lines: false, // 빈라인을 유지할지 여부
}

if ( !files[0] || files[0].match( 'src/layout' ) ) {
  files = glob.sync( prefix + '**/*.njk' ).map( f => f.replace( prefix, '' ) );
} else {
  files[0] = files[0].replace( prefix, '' )
}

nunjucksToHtml( files, {
  'config': 'nunjucks.config.js',
  'dest': configs.dest,
  'ext': '.html',
  'baseDir': 'src/page',
  'cwd': process.cwd(),
  'flatten': false
} ).then( async ( results ) => {

  for ( const file of files ) {
    const filePath = `dist/${ file }`.replace( '.njk', '.html' );
    try {

      let htmlContent = await fs.readFileSync( filePath, 'utf8' );
      const beautifulHtml = await beautify( htmlContent, htmlFormat );

      // @TODO: body 내용 중, 태그 안에 있는 HTML 특수문자 처리
      await fs.writeFileSync( filePath, beautifulHtml, 'utf8' );
      console.log( 'html 컴파일', filePath )

    } catch ( error ) {

      console.error( `파일 처리 중 오류가 발생했습니다: ${ error }` );

    }
  }

} ).catch( ( error ) => {

  console.log( 'error ->\n', error )

} );