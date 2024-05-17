$( function () {

  // IBSheet8 객체 생성, 비동기
  IBSheet.create( {
    id: "sheet",        // 시트 객체 ID
    el: "POSCMMIbsheet1",     // 시트를 생성할 DIV객체 ID
    options: { // 초기화 구문 변수
      // 기본 기능 설정
      Cfg: {
        SearchMode: 0, // FastLoad
        HeaderMerge: 3, //헤더 영역 머지 모드 선택
      },
      //각 열(Column)에 대한 정의 (이름, 유형(Type), 포맷(Format)등을 설정)
      //열(Color)의 "Type"과 "Name" 속성은 반드시 설정되어야 합니다.
      Cols: [
        { Header: "ID", Name: "userid", Type: "Text", Align: "center", CanEdit: 0 },
        { Header: "사용자 이름", Name: "userNm", Type: "Text", Align: "center" },
        { Header: "성별", Name: "gender", Type: "Enum", Enum: "|남|녀", EnumKeys: "|M|F" },
        { Header: "입사일", Name: "edate", Extend: IB_Preset.Ymd },
        { Header: "나이", Name: "age", Type: "Int", Format: "#,### 세" }
      ],
      Events: {

        onRenderFirstFinish: function ( evtParam ) {

          evtParam.sheet.loadSearchData(
            [
              { userid: "2170022", userNm: "홍길동", gender: "M", edate: "20010302", age: 48 },
              { userid: "981065", userNm: "허심청", gender: "F", edate: "20010302", age: 23 },
            ]
          );

        }

      }
    }
  } );

  /*IBSheet.create 이후 조회를 하면 데이터 바인딩을 보장하지 못한다.
   IBSheet.create가 비동기로 동작하기 때문에 onRenderFirstFinish 이벤트에서 조회 하거나 create
  함수에 sync:1을 설정하여 동기로 동작하게 해야 한다.
  */

} )