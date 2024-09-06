$(function(){
  var room = JSON.parse(sessionStorage.getItem('room'));
  var charge = JSON.parse(sessionStorage.getItem('charge'));
  var check_date = JSON.parse(sessionStorage.getItem('check_date'));
  var check_num = JSON.parse(sessionStorage.getItem('check_num'));
  var date = sessionStorage.getItem('date');

  var year = date.substring(1, date.indexOf("년"));
  var month = date.substring(date.indexOf("년")+1, date.indexOf("월"));
  var day = date.substring(date.indexOf("월")+1, date.indexOf("일"));

  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var dayOfWeek = week[new Date(year,month-1,day).getDay()];

  var now = new Date(year,month-1,day);


  var result_room_charge = 0;
  var result_num_charge = 0;
  var result_all_charge = 0;

  var date_day = [];

  for (var i = 0; i < room.length; i++) {
    var check_get_date = check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일"));
    if (check_get_date=='장박') {
      $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
      +"<th class=room>"+ room[i] +"</th>"
      +"<th class=use_date>장박</th>"
      +"<th class=get_date>장박</th>"
      +"<th class=num>"+ check_num[i] +"</th>"
      +"<th class=room_charge>장박</th>"
      +"<th class=num_charge>장박</th>"
      +"<th class=all_charge>장박</th>"
      +"</tr>");
      date_day.push("장박");
    }else{
      var check_get_date_num = parseInt(check_get_date-1);

      var tomorrow = new Date(year,month-1,now.getDate() + check_get_date_num);
      var tomorrow_year = tomorrow.getFullYear();
      var tomorrow_month = tomorrow.getMonth()+1;
      var tomorrow_day = tomorrow.getDate();

      var tomorrowOfWeek = week[tomorrow.getDay()];

      date_day.push(month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")");

      if (room[i].includes("평상")) {
        if (charge[i]=="10만원") {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")</th>"
          +"<th class=get_date>당일</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
          +"<th class=num_charge>"+ "0만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
          +"</tr>");
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
        }else{
          if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
            $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")</th>"
            +"<th class=get_date>당일</th>"
            +"<th class=num>"+ check_num[i] +"</th>"
            +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
            +"<th class=num_charge>"+ "0만원</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
            +"</tr>");
            result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
          }else{

            $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")</th>"
            +"<th class=get_date>당일</th>"
            +"<th class=num>"+ check_num[i] +"</th>"
            +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
            +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4) +"만원</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)) +"만원</th>"
            +"</tr>");
            result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4);
            result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4));
          }
        }
        result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")));
      }else if(room[i].includes("민박")){
        if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<5) {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ "0만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
          +"</tr>");
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
        }else{

          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num +"만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num +"만원</th>"
          +"</tr>");
          result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num;
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num;
        }


        result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
      }else{
        if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ "0만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
          +"</tr>");
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
        }else{

          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num +"만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num +"만원</th>"
          +"</tr>");
          result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num;
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num;
        }
        result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
      }
    }
  }

  $('.result_room_charge').text(result_room_charge+"만원");
  $('.result_num_charge').text(result_num_charge+"만원");
  $('.result_all_charge').text(result_all_charge+"만원");

  $('.pay_all_charge').text(result_all_charge+"만원");
  $('.reserve_all_charge').text(result_all_charge+"만원"+"(결제/입금이 완료되어야 최종 예약이 완료됩니다.)");

  $('.div_private').click(function(){
		var checked = $('.private_check').is(':checked');

		if(checked){
      $('.private_check').prop('checked',false);
    }else{
      $('.private_check').prop('checked',true);

    }

	});
  $('.div_charge_check').click(function(){
		var checked = $('.charge_check').is(':checked');

		if(checked){
      $('.charge_check').prop('checked',false);
    }else{
      $('.charge_check').prop('checked',true);

    }

	});
  $(".bt_before").click(function(){
    window.history.back();
  })

  $(".bt_next").click(function(){
    $('#pay_name').blur();
    $('#user_name').blur();
    $('#phone1').blur();
    $('#phone2').blur();
    $('#phone3').blur();
    $('#email').blur();
    $('#need').blur();
    $('.charge_check').blur();
    $('.private_check').blur();
    var pay_name = $('#pay_name').val();
    var user_name = $('#user_name').val();
    var phone1 = $('#phone1').val();
    var phone2 = $('#phone2').val();
    var phone3 = $('#phone3').val();
    var email = $('#email').val();
    var need = $('#need').val();

    var charge_check = $('.charge_check').is(':checked');
    var private_check = $('.private_check').is(':checked');

    if (pay_name=="") {
      alert("입금자명을 입력해주세요.");
      $('#pay_name').focus();
      return false ;
    }
    if (user_name=="") {
      alert("예약자명을 입력해주세요.");
      $('#user_name').focus();
      return false ;
    }
    if (phone1=="") {
      alert("핸드폰 번호를 전부 입력해주세요.");
      $('#phone1').focus();
      return false ;
    }
    if (phone2=="") {
      alert("핸드폰 번호를 전부 입력해주세요.");
      $('#phone2').focus();
      return false ;
    }
    if (phone3=="") {
      alert("핸드폰 번호를 전부 입력해주세요.");
      $('#phone3').focus();
      return false ;
    }

		if(!charge_check){
      alert("환불규정에 동의해주세요.");
      $('.charge_check').focus();
      return false ;
    }

		if(!private_check){
      alert("개인정보 활용에 동의해주세요.");
      $('.private_check').focus();
      return false ;
    }
    var database = firebase.database().ref();

    database.once('value', function( data ){
      var next_session = true;
      let next_room = [];
      let next_date = [];

      for (var i = 0; i < check_date.length; i++) {
        let room_name = room[i];

        if (check_date[i].includes("일")) {
          var all_day = parseInt(check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일")));
          var all_day_num = parseInt(all_day-1);

          for (var j = 0; j < all_day_num; j++) {
            var update_day = new Date(year,month-1,now.getDate() + j);
            var update_day_year = update_day.getFullYear();
            var update_day_month = update_day.getMonth()+1;
            var update_day_day = update_day.getDate();

            let update_day_reference = update_day_year+"년"+update_day_month+"월"+update_day_day+"일";

            let reserve_data;

            if (room_name.includes("A")) {
              reserve_data = data.child("reserve").child(update_day_reference).child("a_site").child(room_name);
            }
            if (room_name.includes("B")) {
              reserve_data = data.child("reserve").child(update_day_reference).child("b_site").child(room_name);
            }
            if (room_name.includes("C")) {
              reserve_data = data.child("reserve").child(update_day_reference).child("c_site").child(room_name);
            }
            if ((!room_name.includes("B"))&&room_name.includes("평상")) {
              reserve_data = data.child("reserve").child(update_day_reference).child("wood_site").child(room_name);
            }
            if (room_name.includes("민박")) {
              reserve_data = data.child("reserve").child(update_day_reference).child("private_site").child(room_name);
            }
            if (reserve_data.exists()) {
              next_session = false;
              next_room.push(room_name);
              next_date.push(update_day_reference);
            }

          }
        }

      }

      if (next_session) {
        var database = firebase.database().ref();
        var siteRef = database;
        siteRef.once('value', function( data ){
          let reserve_snap = data.child('reserve').val();
          var reserve_site = [];
          for (a in reserve_snap){

            if (date.substring(1)==a) {
              for(b in reserve_snap[a]){
                for(c in reserve_snap[a][b]){
                  for (var i = 0; i < room.length; i++) {
                    if (c==room[i]) {
                      alert(room[i]+"은 이미 예약된 객실입니다.");
                      window.history.go(-1);
                      return;
                    }
                  }
                }
              }
            }
          }

          var time = new Date();

          var set_time = String(time.getFullYear())+"/"+String(time.getMonth()+1)+"/"+
          String(time.getDate())+"/"+String(time.getHours())+"/"+
          String(time.getMinutes())+"/"+String(time.getSeconds())+"/";
          for (var i = 0; i < room.length; i++) {
            var room_name = room[i];
            var all_day = parseInt(check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일")));
            var all_day_num = parseInt(all_day-1);

            if(all_day_num>1){
              for (var j = 0; j < all_day_num; j++) {
                var update_day = new Date(year,month-1,now.getDate() + j);
                var update_day_year = update_day.getFullYear();
                var update_day_month = update_day.getMonth()+1;
                var update_day_day = update_day.getDate();

                var update_day_reference = update_day_year+"년"+update_day_month+"월"+update_day_day+"일";
                if (room_name.includes("A")) {
                  var reserve_ref = database.child("reserve").child(update_day_reference).child("a_site").child(room_name).child(phone1+phone2+phone3);
                }
                if (room_name.includes("B")) {
                  var reserve_ref = database.child("reserve").child(update_day_reference).child("b_site").child(room_name).child(phone1+phone2+phone3);
                }
                if (room_name.includes("C")) {
                  var reserve_ref = database.child("reserve").child(update_day_reference).child("c_site").child(room_name).child(phone1+phone2+phone3);
                }
                if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                  var reserve_ref = database.child("reserve").child(update_day_reference).child("wood_site").child(room_name).child(phone1+phone2+phone3);
                }
                if (room_name.includes("민박")) {
                  var reserve_ref = database.child("reserve").child(update_day_reference).child("private_site").child(room_name).child(phone1+phone2+phone3);
                }
                var result_all_charge = 0;
                if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
                  result_all_charge = parseInt(charge[i].substring(0,charge[i].indexOf("만")));
                }else{
                  result_all_charge = (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4));
                }
                var reserve_obj = {
                  객실명: room_name,
                  객실금액: charge[i],
                  총금액: result_all_charge,
                  상태: "미결제",
                  연락처: phone1+phone2+phone3,
                  예약번호: set_time+phone1+phone2+phone3,
                  예약상태: "예약",
                  예약일: check_date[i],
                  예약날짜: date_day[i],
                  요청사항: need,
                  입금자명: pay_name,
                  예약자명: user_name,
                  이메일: email,
                  인원: check_num[i],
                };
                reserve_ref.set(reserve_obj);
              }
            }else if(all_day_num=='장박'){
              if (room_name.includes("A")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("a_site").child(room_name).child(phone1+phone2+phone3);
              }
              if (room_name.includes("B")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("b_site").child(room_name).child(phone1+phone2+phone3);
              }
              if (room_name.includes("C")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("c_site").child(room_name).child(phone1+phone2+phone3);
              }
              if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("wood_site").child(room_name).child(phone1+phone2+phone3);
              }
              if (room_name.includes("민박")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("private_site").child(room_name).child(phone1+phone2+phone3);
              }
              var result_all_charge = 0;
              if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
                result_all_charge = parseInt(charge[i].substring(0,charge[i].indexOf("만")));
              }else{
                result_all_charge = (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4));
              }

              var time = new Date();

              var reserve_obj = {
                객실명: room_name,
                객실금액: charge[i],
                총금액: result_all_charge,
                상태: "미결제",
                연락처: phone1+phone2+phone3,
                예약번호: set_time+phone1+phone2+phone3,
                예약상태: "예약",
                예약일: check_date[i],
                예약날짜: date_day[i],
                요청사항: need,
                입금자명: pay_name,
                예약자명: user_name,
                이메일: email,
                인원: check_num[i],
              };
              reserve_ref.set(reserve_obj);
            }else{
              if (room_name.includes("A")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("a_site").child(room_name).child(phone1+phone2+phone3);
              }
              if (room_name.includes("B")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("b_site").child(room_name).child(phone1+phone2+phone3);
              }
              if (room_name.includes("C")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("c_site").child(room_name).child(phone1+phone2+phone3);
              }
              if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("wood_site").child(room_name).child(phone1+phone2+phone3);
              }
              if (room_name.includes("민박")) {
                var reserve_ref = database.child("reserve").child(date.substring(1)).child("private_site").child(room_name).child(phone1+phone2+phone3);
              }
              var result_all_charge = 0;
              if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
                result_all_charge = parseInt(charge[i].substring(0,charge[i].indexOf("만")));
              }else{
                result_all_charge = (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4));
              }

              var time = new Date();

              var reserve_obj = {
                객실명: room_name,
                객실금액: charge[i],
                총금액: result_all_charge,
                상태: "미결제",
                연락처: phone1+phone2+phone3,
                예약번호: set_time+phone1+phone2+phone3,
                예약상태: "예약",
                예약일: check_date[i],
                예약날짜: date_day[i],
                요청사항: need,
                입금자명: pay_name,
                예약자명: user_name,
                이메일: email,
                인원: check_num[i],
              };
              reserve_ref.set(reserve_obj);
            }

          }

          var reserve_num = time.getFullYear()+time.getMonth()+time.getDate()+time.getMonth()+time.getHours()+time.getMinutes()+time.getSeconds()+phone2+phone3;
          var phone = phone1+phone2+phone3;

          sessionStorage.setItem('room', JSON.stringify(room));
          sessionStorage.setItem('date', JSON.stringify(date));
          sessionStorage.setItem('charge', JSON.stringify(charge));
          sessionStorage.setItem('check_num', JSON.stringify(check_num));
          sessionStorage.setItem('check_date', JSON.stringify(check_date));
          sessionStorage.setItem('pay_name', pay_name);
          sessionStorage.setItem('reserve_num', reserve_num);
          sessionStorage.setItem('user_name', user_name);
          sessionStorage.setItem('phone', phone);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('need', need);

          location.replace('reserve_check.html');
        })
      }else{
        var alert_text = "(특정사이트 1박2일 이상 예약불가)\n해당 날짜와 사이트가 예약되어있습니다.\n";
        for (var i = 0; i < next_room.length; i++) {
          console.log(next_date[i]);
          alert_text = alert_text +"\n날짜: "+ next_date[i] +"/ 사이트명: " +next_room[i];
        }

        alert(alert_text);
      }

    })


  })


})
