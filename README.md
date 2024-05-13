# html + nunjucks + scss + es6 조합 빌드 환경

- [build-tool-boilerplate](https://github.com/cferdinandi/build-tool-boilerplate) 참조하여, 재구성함
- 동일한 스타일가이드를 가지는 n개 프로젝트 구성에서, `스타일 가이드 작업파일` 들이 논리적 연결이 되어, 프로젝트의 build 시 포함되어 배포되는 것이 목적이다.
- 자원들은 `css, js, image` 를 의미한다.
- 자원들이 프로젝트에 포함됨 으로써, 스타일가이드 자원을 프로젝트에 포함시키기 위한 별도 서버구성을 할 필요가 없다.
- 스타일가이드 저장소를 분리함 으로써, 독립적인 작업팀을 구성할 수 있다.
- 서브모듈 관리를 통해서, 실수를 줄이고, 업데이트 내용을 손쉽게 프로젝트에 포함시킨다.

**사전 설치**

- [Install Node.js.](http://nodejs.org/)
