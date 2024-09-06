$(function(){
    var today = new Date();
    var date = new Date();

    $("input[name=preMon]").click(function() { // 이전달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date ( today.getFullYear(), today.getMonth()-1, today.getDate());
        buildCalendar();
    })

    $("input[name=nextMon]").click(function(){ //다음달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date ( today.getFullYear(), today.getMonth()+1, today.getDate());
        buildCalendar();
    })


    function buildCalendar() {

        nowYear = today.getFullYear();
        nowMonth = today.getMonth();
        firstDate = new Date(nowYear,nowMonth,1).getDate();
        firstDay = new Date(nowYear,nowMonth,1).getDay(); //1st의 요일
        lastDate = new Date(nowYear,nowMonth+1,0).getDate();

        if((nowYear%4===0 && nowYear % 100 !==0) || nowYear%400===0) { //윤년 적용
            lastDate[1]=29;
        }

        $(".year_mon").text(nowYear+"년 "+(nowMonth+1)+"월");

        for (i=0; i<firstDay; i++) { //첫번째 줄 빈칸
            $("#calendar tbody:last").append("<td></td>");
        }
        for (i=1; i <=lastDate; i++){ // 날짜 채우기
            plusDate = new Date(nowYear,nowMonth,i).getDay();
            if (plusDate==0) {
                $("#calendar tbody:last").append("<tr></tr>");
            }
            $("#calendar tbody:last").append("<td class='date'"+"id='"+i+"'>"+ i +"</td>");
            $(".date").css({'cursor':'pointer'});
        }
        if($("#calendar > tbody > td").length%7!=0) { //마지막 줄 빈칸
            for(i=1; i<= $("#calendar > tbody > td").length%7; i++) {
                $("#calendar tbody:last").append("<td></td>");
            }
        }
        $(".date").each(function(index){ // 오늘 날짜 표시
            if(nowYear==date.getFullYear() && nowMonth==date.getMonth() && $(".date").eq(index).text()==date.getDate()) {
                $(".date").eq(index).addClass('colToday');
                $(".set_day").text("예약일 : "+nowYear+"년"+(nowMonth+1)+"월"+$(".date").eq(index).text()+"일");
            }
        })

        $('.date').click(function(event){
          var date = $(this).attr("id");

          var reserve_date = nowYear+"년"+(nowMonth+1)+"월"+date+"일";

          var year = reserve_date.substring(0,reserve_date.indexOf("년"));
          var month = reserve_date.substring(reserve_date.indexOf("년")+1, reserve_date.indexOf("월"));
          var day = reserve_date.substring(reserve_date.indexOf("월")+1, reserve_date.indexOf("일"));

          var now = new Date(year,month-1,day);
          var today = new Date();
          var myYear = today.getFullYear();
          var myMonth = today.getMonth();
          var myday = today.getDate();
          var check_today = new Date(myYear,myMonth,myday);

          if (now<check_today) {
            alert("지난 날은 예약이 불가합니다!");
            return false;
          }

          var today = new Date();
          var myYear = today.getFullYear();
          var myMonth = today.getMonth();
          var myday = today.getDate();
          var check_nextday = new Date(myYear,myMonth,myday+30);

          $(".set_day").text("예약일 : "+nowYear+"년"+(nowMonth+1)+"월"+date+"일");
          $(".date").css({'background-color':'#fff','color':'#000'});

          $(".colToday").css({'background-color':'#3c6b09','color':'#fff'});
          $('#'+date).css({'background-color':'#4eacf9','color':'#fff'});

          $(".tr_reserve").detach();
          $(".all_site").css({'background-color':'#4eacf9'});
          $(".a_site").css({'background-color':'#3c6b09'});
          $(".b_site").css({'background-color':'#3c6b09'});
          $(".c_site").css({'background-color':'#3c6b09'});
          $(".wood_site").css({'background-color':'#3c6b09'});
          $(".private_site").css({'background-color':'#3c6b09'});
          var database = firebase.database().ref();

          var siteRef = database;
          var get_day = $(".set_day").text();
          siteRef.once('value', function( data ){
            let reserve_snap = data.child('reserve').val();
            var reserve_site = [];
            for (a in reserve_snap){

              if (get_day.includes(a)) {

                for(b in reserve_snap[a]){
                  for(c in reserve_snap[a][b]){
                    reserve_site.push(c);
                  }
                }
              }
            }
            let site_snap = data.child('site').val();
            var site_chart_frag = document.createDocumentFragment();
            for (i in site_snap){

              for (j in site_snap[i]) {

                if (!reserve_site.includes(j)) {
                  var room = j;
                  var size = null;
                  var num = null;
                  var charge = null;
                  for (k in site_snap[i][j]){
                    if (k=="크기") {
                      size = site_snap[i][j][k];
                    }
                    if (k=="기준인원") {
                      num = site_snap[i][j][k];
                    }
                    if (k=="요금") {
                      charge = site_snap[i][j][k];
                    }
                  }
                  if (num=='4/8') {
                    $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
                    +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room+"'>"+"</th>" +"</th>"
                    +"<th class=room>"+ room +"</th>"
                    +"<th class=size>"+ size +"</th>"
                    +"<th class=num>"+ num +"</th>"
                    +"<th class=get_date>당일</th>"
                    +"<th class=check_num>"+ "<select id='select_num' class='select_num:"+room+"'> <option value='0' class='option_num'>1명</option>"
                    +"<option value=1>2명</option>"
                    +"<option value=2>3명</option>"
                    +"<option value=3 selected='selected'>4명</option>"
                    +"<option value=4>5명</option>"
                    +"<option value=5>6명</option>"
                    +"<option value=6>7명</option>"
                    +"<option value=7>8명</option></select>"+"</th>"
                    +"<th class=charge>"+ charge +"</th>"
                    +"</tr>");
                  }
                  if (num=='4/4') {
                    $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
                    +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room+"'>"+"</th>" +"</th>"
                    +"<th class=room>"+ room +"</th>"
                    +"<th class=size>"+ size +"</th>"
                    +"<th class=num>"+ num +"</th>"
                    +"<th class=get_date>당일</th>"
                    +"<th class=check_num>"+ "<select id='select_num' class='select_num:"+room+"'> <option value='0' class='option_num'>1명</option>"
                    +"<option value=1>2명</option>"
                    +"<option value=2>3명</option>"
                    +"<option value=3 selected='selected'>4명</option></select>"+"</th>"
                    +"<th class=charge>"+ charge +"</th>"
                    +"</tr>");
                  }
                  if (num=='4/6') {
                    if (room.includes("평상")) {
                      $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
                      +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room+"'>"+"</th>" +"</th>"
                      +"<th class=room>"+ room +"</th>"
                      +"<th class=size>"+ size +"</th>"
                      +"<th class=num>"+ num +"</th>"
                      +"<th class=get_date>당일</th>"
                      +"<th class=check_num>"+ "<select id='select_num' class='select_num:"+room+"'> <option value='0' class='option_num'>1명</option>"
                      +"<option value=1>2명</option>"
                      +"<option value=2>3명</option>"
                      +"<option value=3 selected='selected'>4명</option>"
                      +"<option value=4>5명</option>"
                      +"<option value=5>6명</option></select>"+"</th>"
                      +"<th class=charge>"+ charge +"</th>"
                      +"</tr>");
                    }else{
                      $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
                      +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room+"'>"+"</th>" +"</th>"
                      +"<th class=room>"+ room +"</th>"
                      +"<th class=size>"+ size +"</th>"
                      +"<th class=num>"+ num +"</th>"
                      +"<th class=get_date>"+ "<select id='select_date' class='select_date:"+room+"'> <option value='0' class='option_num' selected='selected'>1박2일</option>"
                      +"<option value=1>2박3일</option>"
                      +"<option value=2>3박4일</option>"
                      +"<option value=3>4박5일</option>"
                      +"<option value=4>5박6일</option>"
                      +"<option value=5>6박7일</option>"
                      +"<option value=6>장박</option></select>"+"</th>"
                      +"<th class=check_num>"+ "<select id='select_num' class='select_num:"+room+"'> <option value='0' class='option_num'>1명</option>"
                      +"<option value=1>2명</option>"
                      +"<option value=2>3명</option>"
                      +"<option value=3 selected='selected'>4명</option>"
                      +"<option value=4>5명</option>"
                      +"<option value=5>6명</option></select>"+"</th>"
                      +"<th class=charge>"+ charge +"</th>"
                      +"</tr>");
                    }
                  }
                  if (num=='5/6') {
                    $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
                    +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room+"'>"+"</th>" +"</th>"
                    +"<th class=room>"+ room +"</th>"
                    +"<th class=size>"+ size +"</th>"
                    +"<th class=num>"+ num +"</th>"
                    +"<th class=get_date>"+ "<select id='select_date' class='select_date:"+room+"'> <option value='0' class='option_num' selected='selected'>1박2일</option>"
                    +"<option value=1>2박3일</option>"
                    +"<option value=2>3박4일</option>"
                    +"<option value=3>4박5일</option>"
                    +"<option value=4>5박6일</option>"
                    +"<option value=5>6박7일</option>"
                    +"<option value=6>장박</option></select>"+"</th>"
                    +"<th class=check_num>"+ "<select id='select_num' class='select_num:"+room+"'> <option value='0' class='option_num'>1명</option>"
                    +"<option value=1>2명</option>"
                    +"<option value=2>3명</option>"
                    +"<option value=3>4명</option>"
                    +"<option value=4 selected='selected'>5명</option>"
                    +"<option value=5>6명</option></select>"+"</th>"
                    +"<th class=charge>"+ charge +"</th>"
                    +"</tr>");
                  }
                }

              }
            }

          })
        })
    }
    buildCalendar();


  })
