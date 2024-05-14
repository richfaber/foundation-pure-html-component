# html + nunjucks + scss + es6 조합 컴포넌트 빌드 환경

컴포넌트 단독 개발을 위한 저장소

- [페이지](https://github.com/richfaber/foundation-pure-html-page) 저장소의 서브 모듈용도로 사용함.
- `동일한 스타일가이드를 가지는 n개 프로젝트 구성` 에서, `스타일 가이드 작업파일` 들이 논리적 연결이 되어, 프로젝트의 build 시 포함되어 배포되는 것이 목적이다.
- 자원들은 `css, js, image` 를 의미한다.
- `스타일 가이드 자원들이 프로젝트에 포함됨` 으로써, 스타일가이드 자원을 운영하기 위한 서버구성이 필요 없다.
- 스타일가이드 저장소를 분리함 으로써, 독립적인 작업팀을 구성할 수 있다.
- 서브모듈 관리를 통해서, 업데이트 내용을 손쉽게 프로젝트에 포함시킨다.
- 긴밀해 지는 만큼, 버전관리 에서는 느슨해 진다. (스타일가이드를 이전 버전으로 롤백 하려면 git 의 이전 지점으로 가야함.) 

## 구성

- nunjucks 로 html 구조화 하고, build 후에 html 을 생성함.
- rollup 으로 js 를 생성함.
- sass, postcss 로 css 를 생성함.
- imagemin 으로 image 를 생성함.

## 설치

- 페이지 제작의 서브모듈 용도 이므로 저장소 복제 후 npm install 을 실행하면 설치가 완료된다.

```terminal
$> npm install
```

## 스크립트

### clean

dist 폴더 내의 모든 파일과 폴더를 삭제합니다.

### js-chunk

rollup을 사용해 자바스크립트 청크 파일을 번들링합니다.

### js-page

rollup을 사용해 페이지별 자바스크립트 파일을 번들링합니다.

### css

babel-node를 사용해 CSS 파일을 처리합니다.

### img

babel-node를 사용해 이미지 파일을 최적화합니다.

### html
babel-node를 사용해 HTML 파일을 생성합니다.

### html-lint
html-validate를 사용해 dist 폴더 내의 모든 HTML 파일을 검사합니다.

### build:dirty
병렬로 js-chunk, js-page, css, img, html 스크립트를 실행합니다.

### build
clean 스크립트를 실행한 후, build:dirty와 html-lint를 순차적으로 실행합니다.

### watch:css
SCSS 파일의 변경을 감지하고 변경 시 css 스크립트를 실행합니다.

### watch:js-chunk
자바스크립트 청크 파일의 변경을 감지하고 변경 시 js-chunk 스크립트를 실행합니다.

### watch:js-page
페이지별 자바스크립트 파일의 변경을 감지하고 변경 시 js-page 스크립트를 실행합니다.

### watch:img
이미지 파일의 변경을 감지하고 변경 시 img 스크립트를 실행합니다.

### watch:html
Nunjucks 파일의 변경을 감지하고 변경 시 html 스크립트를 실행합니다.

### watch:html-lint
HTML 파일의 변경을 감지하고 변경 시 html-lint를 실행합니다.

### watch
모든 watch:* 스크립트를 병렬로 실행합니다.

### server:start
개발 서버를 시작합니다.

### server
clean, build:dirty, server:start, watch 스크립트를 순차적으로 실행합니다.