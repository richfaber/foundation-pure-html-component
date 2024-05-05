import path from 'path';

import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

import imageminSharp from "imagemin-sharp"
import imageminMozjpeg from "imagemin-mozjpeg"
import imageminPngcrush from "imagemin-pngcrush"
import imageminPngquant from "imagemin-pngquant"
import imageminZopfli from "imagemin-zopfli"

import pkg from './package.json'

const exclude = [ 'node_modules/**' ]

const configs = {
  name: pkg.name,
  root: 'src',
  dest: 'dist',
  // formats: ['iife', 'es', 'amd', 'cjs'],
  formats: [ 'iife' ],
  default: 'iife',
  minify: true,
  sourceMap: (process.env.NODE_ENV !== 'production')
}

configs.html = {
  nunjucks: {
    'config': 'nunjucks.config.js',
    'dest': configs.dest,
    'ext': '.html',
    'baseDir': configs.root + '/page',
    'cwd': process.cwd(),
    'flatten': false,
  },
  format: {
    indent_size: 2, // 들여쓰기 크기 [4]
    indent_char: " ", // 들여쓰기 문자 [" "]
    end_with_newline: false, // 마지막에 새로운 줄 시작
    preserve_newlines: false, // 기존 줄바꿈 유지
    indent_inner_html: false, // <head> 및 <body> 섹션을 들여씀
    indent_empty_lines: false, // 빈라인을 유지할지 여부
  }
}

configs.img = {
  type: "/**/*.{jpg,jpeg,png,gif}",
  src: configs.root + "/resource/image",
  dest: configs.dest + '/resource/image'
}

const plugins = {
  js: [
    alias( {
      entries: [
        { find: '@', replacement: path.resolve( __dirname, configs.root ) }
      ]
    } ),
    nodeResolve( {
      // use 'jsnext:main' if possible
      // see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,
      browser: true
    } ),
    commonjs(),
    eslint( {
      exclude
    } ),
    babel( {
      exclude
    } ),
    json()
  ],

  img: [
    imageminSharp(),
    // imageminWebp({ quality: 80 }),
    imageminMozjpeg(),
    imageminPngcrush(),
    imageminPngquant(),
    imageminZopfli()
  ]

}

if ( process.env.NODE_ENV === 'production' ) {

  if ( configs.minify ) {
    plugins.js.push( terser() )
  }

}

export { configs, plugins, exclude }