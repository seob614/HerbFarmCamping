$(function(){
  var date = sessionStorage.getItem('date');
  var title = sessionStorage.getItem('title');
  var img_num = sessionStorage.getItem('img_num');
  var b_video = sessionStorage.getItem('b_video');

  $('.title').text(title);
  $('.date').text(date);

  if (b_video=="N") {
    for (var i = 0; i < img_num; i++) {
      $(".sub_img").append("<img class="+date+" src=img/photo/"+date+"("+i+")"+".jpg alt=>");
    }
  }else{
    $(".sub_img").append("<iframe class="+date+" src="+b_video+" >");
  }


})
