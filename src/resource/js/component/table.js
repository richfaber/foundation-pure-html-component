$( function () {

  $( "#POSAPP" ).on( 'click', '.POSCMMTable', function ( event ) {
    /**
     * this - 대상 DOM
     * event - jQuery 이벤트 객체
     */
    console.log( 'click', $(this).attr('id'), event )
  } )

} )