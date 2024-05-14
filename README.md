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

## 명령어

```terminal
$> npm run server // 로컬서버 구동
$> npm run build // 자원 빌드
```