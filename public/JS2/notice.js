$(function(){

  var database = firebase.database().ref();

  var noticeRef = database;
  noticeRef.once('value', function( data ){
    let notice_snap = data.child('notice').val();
    var title = [];
    var date = [];
    var sub = [];
    for (a in notice_snap){

      for (b in notice_snap[a]){
        if (b=="제목") {
          title.push(notice_snap[a][b]);
        }
        if (b=="날짜") {
          date.push(notice_snap[a][b]);
        }
        if (b=="내용") {
          sub.push(notice_snap[a][b]);
        }
      }

    }
    for (var i = 0; i < date.length; i++) {
      $(".notice_table tbody:last").append("<tr class='tr_reserve' id='"+i+"'>"
      +"<th class=num>"+ (i+1) +"</th>"
      +"<th class=title>"+ title[i] +"</th>"
      +"<th class=date>"+ date[i] +"</th>"
      +"</tr>");
    }

    $(".tr_reserve").click(function(){
      var set_num = parseInt($(this).attr('id'));
      sessionStorage.setItem('title', title[set_num]);
      sessionStorage.setItem('date', date[set_num]);

      location.href = 'notice2.html';
    });

    function pagination(){
            var req_num_row=5;
            var $tr=jQuery('tbody tr');
            var total_num_row=$tr.length;
            var num_pages=0;
            if(total_num_row % req_num_row ==0){
                num_pages=total_num_row / req_num_row;
            }
            if(total_num_row % req_num_row >=1){
                num_pages=total_num_row / req_num_row;
                num_pages++;
                num_pages=Math.floor(num_pages++);
            }

        //jQuery('.pagination').append("<li><a class=prev>이전</a></li>");

            for(var i=1; i<=num_pages; i++){
                jQuery('.pagination').append("<li><a>"+i+"</a></li>");
          jQuery('.pagination li:nth-child(2)').addClass("active");
          jQuery('.pagination a').addClass("pagination-link");
            }

        //jQuery('.pagination').append("<li><a class=next>다음</a></li>");

            $tr.each(function(i){
          jQuery(this).hide();
          if(i+1 <= req_num_row){
                    $tr.eq(i).show();
                }
            });

            jQuery('.pagination a').click('.pagination-link', function(e){
                e.preventDefault();
                $tr.hide();
                var page=jQuery(this).text();
                var temp=page-1;
                var start=temp*req_num_row;
          var current_link = temp;

          jQuery('.pagination li').removeClass("active");
                jQuery(this).parent().addClass("active");

                for(var i=0; i< req_num_row; i++){
                    $tr.eq(start+i).show();
                }

          if(temp >= 1){
            jQuery('.pagination li:first-child').removeClass("disabled");
          }
          else {
            jQuery('.pagination li:first-child').addClass("disabled");
          }

            });

        jQuery('.prev').click(function(e){
            e.preventDefault();
            jQuery('.pagination li:first-child').removeClass("active");
        });

        jQuery('.next').click(function(e){
            e.preventDefault();
            jQuery('.pagination li:last-child').removeClass("active");
        });

        }

        jQuery('document').ready(function(){
            pagination();

          jQuery('.pagination li:first-child').addClass("disabled");

        });
      })
  })
