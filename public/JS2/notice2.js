$(function(){
  var date = sessionStorage.getItem('date');

  var database = firebase.database().ref();

  var noticeRef = database;

  var get_date = date;
  noticeRef.once('value', function( data ){
    let notice_snap = data.child('notice').child(get_date).val();
    var title = null;
    var date = null;
    var sub = null;
    for (a in notice_snap){

      if (a=="제목") {
        title = notice_snap[a];
      }
      if (a=="날짜") {
        date = notice_snap[a];
      }
      if (a=="내용") {
        sub = notice_snap[a];
      }
    }
    $('.title').text(title);
    $('.date').text(date);
    $('.sub').text(sub);


  })
})
