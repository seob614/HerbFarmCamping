$(function(){
  var now_bt_date = 0;
  $(".bt_next").click(function(){
    $('#id').blur();
    $('#pass').blur();
    var id = $('#id').val();
    var pass = $('#pass').val();

    if (id=="") {
      alert("아이디를 입력해주세요.");
      $('#id').focus();
      return false ;
    }
    if (pass=="") {
      alert("비밀번호를 전부 입력해주세요.");
      $('#pass').focus();
      return false ;
    }
    var login = false;
    var database = firebase.database().ref();

    var login_Ref = database;
    login_Ref.once('value', function( data ){

      let pay_state_snap = data.child('master').val();

      for (i in pay_state_snap){
        var login_id = null;
        var login_pass = null;
        for (j in pay_state_snap[i]) {
          if (j=="비밀번호") {
            login_pass = pay_state_snap[i][j];
          }
          if (j=="아이디") {
            login_id = pay_state_snap[i][j];
          }

        }
        if (login_id==id&&login_pass==pass) {
          login = true;
        }
      }
      if (login) {
        alert("성공");
        set_info();
      }else{
        alert("실패");
      }
    })
  })

  $(".date_submit").click(function(){
    now_bt_date = 0;
    f_set_date();
  })

  $(".longdate_submit").click(function(){
    now_bt_date = 1;
    f_longset_date();
  })

  function f_set_date(){
    var database = firebase.database().ref();
    $(".tr_reserve").detach();
    const set_date = document.getElementById('set_date').value;
    var get_today = new Date(set_date);

    get_today = get_today.getFullYear()+"년"+(get_today.getMonth()+1)+"월"+get_today.getDate()+"일";

    var room = [];
    var check_date = [];
    var reference_date = [];
    var date = [];
    var charge = [];
    var check_num = [];
    var pay_name = [];
    var reserve_num = [];
    var email = [];
    var need = [];
    var phone = [];
    var user_name = [];
    var reserve_state = [];
    var pay_state = [];

    var reserve_Ref2 = database;
    reserve_Ref2.once('value', function( data ){

      let pay_state_snap = data.child('reserve').child(get_today).val();
      for (i in pay_state_snap){
        for (j in pay_state_snap[i]) {
          for (k in pay_state_snap[i][j]){
            for (l in pay_state_snap[i][j][k]){

              if(l=="객실명"){
                room.push(pay_state_snap[i][j][k][l]);
              }
              reference_date.push(get_today);
              if(l=="객실금액"){
                charge.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="인원"){
                check_num.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="입금자명"){
                pay_name.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약번호"){
                reserve_num.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="이메일"){
                email.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="요청사항"){
                need.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약일"){
                check_date.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약날짜"){
                date.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="연락처"){
                phone.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약자명"){
                user_name.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약상태"){
                reserve_state.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="상태"){
                pay_state.push(pay_state_snap[i][j][k][l]);
              }
            }
          }
        }
      }

      var result_room_charge = 0;
      var result_num_charge = 0;
      var result_all_charge = 0;

      let get_pay_state = [];

      var time = new Date();

      for (var i = 0; i < room.length; i++) {

        var check_get_date = check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일"));
        if (check_get_date=='장박') {
          $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
          +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date style ='color:#fff;background-color:#3c6b09;' value='장박/"+room[i]+"-"+phone[i]+"-"+check_num[i]+"/"+reserve_num[i]+"/"+user_name[i]+"/"+pay_name[i]+"/"+email[i]+"/"+need[i]+"'>장박</th>"
          +"<th class=get_date>장박</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>장박</th>"
          +"<th class=num_charge>장박</th>"
          +"<th class=all_charge>장박</th>"
          +"</tr>");

          $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
          +"<th class=reserve_num>"+reserve_num[i]+"</th>"
          +"<th class=phone>"+phone[i]+"</th>"
          +"<th class=reserve_name>"+user_name[i]+"</th>"
          +"<th class=pay_name>"+pay_name[i]+"</th>"
          +"<th class=car_num>"+email[i]+"</th>"
          +"<th class=need colspan=2>"+need[i]+"</th>"
          +"</tr>");

          $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
          +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
          +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
          +"</tr>");

        }else{
          var check_get_date_num = parseInt(check_get_date-1);

          if (room[i].includes("평상")) {
            if (charge[i]=="10만원") {
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
              +"<th class=get_date>당일</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
              +"<th class=num_charge>"+ "0만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
            }else{
              if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
                +"<th class=room>"+ room[i] +"</th>"
                +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
                +"<th class=get_date>당일</th>"
                +"<th class=num>"+ check_num[i] +"</th>"
                +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
                +"<th class=num_charge>"+ "0만원</th>"
                +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                +"<th class=phone>"+phone[i]+"</th>"
                +"<th class=reserve_name>"+user_name[i]+"</th>"
                +"<th class=pay_name>"+pay_name[i]+"</th>"
                +"<th class=car_num>"+email[i]+"</th>"
                +"<th class=need colspan=2>"+need[i]+"</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                +"</tr>");

                result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
              }else{
                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
                +"<th class=room>"+ room[i] +"</th>"
                +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
                +"<th class=get_date>당일</th>"
                +"<th class=num>"+ check_num[i] +"</th>"
                +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
                +"<th class=num_charge>0만원</th>"
                +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                +"<th class=phone>"+phone[i]+"</th>"
                +"<th class=reserve_name>"+user_name[i]+"</th>"
                +"<th class=pay_name>"+pay_name[i]+"</th>"
                +"<th class=car_num>"+email[i]+"</th>"
                +"<th class=need colspan=2>"+need[i]+"</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                +"</tr>");

                result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
              }
            }
            result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")));
          }else if(room[i].includes("민박")){
            if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<5) {
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ "0만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
              +"</tr>");


              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
            }else{
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num +"만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num;
              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num;
            }


            result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
          }else{
            if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ "0만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
            }else{
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num +"만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num;
              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num;
            }
            result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
          }
        }

        const delete_allday_result = reserve_num[i].split("/");
        var delete_year = delete_allday_result[0];
        var delete_month = delete_allday_result[1];
        var delete_date = delete_allday_result[2];
        var delete_hour = delete_allday_result[3];
        var delete_allday = new Date(delete_year,delete_month-1,delete_date+1,delete_hour);

        if (delete_allday<time) {
          if (pay_state[i]=="미결제") {
            $(".t_order").last().css('backgroundColor', '#EB3324');
          }
        }
      }
      $(".use_date").click(function(){
        if ($(this).attr('value').includes("장박")) {
          document.getElementById('all_date1').value = new Date().toISOString().substring(0, 10);
          document.getElementById('all_date2').value = new Date().toISOString().substring(0, 10);
          $('#all_date_dialog').css({display:'block'});
          $('#all_date_dialog .div_ok').attr('value',$(this).attr('value'));
        }

    	});

      $(".reserve_state").click(function(){
        $('#reserve_dialog').css({display:'block'});
        $('#reserve_dialog .div_ok').attr('value',$(this).attr('value'));
        $('#reserve_dialog .div_cancel').attr('value',$(this).attr('value'));
    	});

      $(".pay_state").click(function(){
        $('#pay_dialog').css({display:'block'});
        $('#pay_dialog .div_ok').attr('value',$(this).attr('value'));
        $('#pay_dialog .div_cancel').attr('value',$(this).attr('value'));
    	});

      $(".t_order").click(function(){
        $('#delete_dialog').css({display:'block'});
        $('#delete_dialog .div_ok').attr('value',$(this).attr('value'));
        $('#delete_dialog .div_cancel').attr('value',$(this).attr('value'));
      });
    })
  }
  function f_longset_date(){
    var database = firebase.database().ref();
    $(".tr_reserve").detach();
    const set_longdate1 = document.getElementById('set_longdate1').value;
    var get_longtoday1 = new Date(set_longdate1);

    const set_longdate2 = document.getElementById('set_longdate2').value;
    var get_longtoday2 = new Date(set_longdate2);

    var btMs = get_longtoday2.getTime() - get_longtoday1.getTime();
    var btDay = btMs/(1000*60*60*24);

    for (var a = 0; a < btDay+1; a++) {
      var update_day = new Date(get_longtoday1.getFullYear(),(get_longtoday1.getMonth()),get_longtoday1.getDate() + a);
      var update_day_year = update_day.getFullYear();
      var update_day_month = update_day.getMonth()+1;
      var update_day_day = update_day.getDate();

      let update_day_reference = update_day_year+"년"+update_day_month+"월"+update_day_day+"일";
      console.log(update_day_reference);

      var reserve_Ref2 = database.child('reserve').child(update_day_reference);
      reserve_Ref2.once('value', function( data ){
        if (data.exists()) {
          var room = [];
          var check_date = [];
          var reference_date = [];
          var date = [];
          var charge = [];
          var check_num = [];
          var pay_name = [];
          var reserve_num = [];
          var email = [];
          var need = [];
          var phone = [];
          var user_name = [];
          var reserve_state = [];
          var pay_state = [];

          let pay_state_snap = data.val();
          for (i in pay_state_snap){
            for (j in pay_state_snap[i]) {
              for (k in pay_state_snap[i][j]){
                for (l in pay_state_snap[i][j][k]){

                  if(l=="객실명"){
                    room.push(pay_state_snap[i][j][k][l]);
                  }
                  reference_date.push(update_day_reference);
                  if(l=="객실금액"){
                    charge.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="인원"){
                    check_num.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="입금자명"){
                    pay_name.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="예약번호"){
                    reserve_num.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="이메일"){
                    email.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="요청사항"){
                    need.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="예약일"){
                    check_date.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="예약날짜"){
                    date.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="연락처"){
                    phone.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="예약자명"){
                    user_name.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="예약상태"){
                    reserve_state.push(pay_state_snap[i][j][k][l]);
                  }
                  if(l=="상태"){
                    pay_state.push(pay_state_snap[i][j][k][l]);
                  }
                }
              }
            }
          }

          var result_room_charge = 0;
          var result_num_charge = 0;
          var result_all_charge = 0;

          let get_pay_state = [];

          var time = new Date();

          for (var i = 0; i < room.length; i++) {
            var check_get_date = check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일"));
            if (check_get_date=='장박') {
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date style ='color:#fff;background-color:#3c6b09;' value='장박/"+room[i]+"-"+phone[i]+"-"+check_num[i]+"/"+reserve_num[i]+"/"+user_name[i]+"/"+pay_name[i]+"/"+email[i]+"/"+need[i]+"'>장박</th>"
              +"<th class=get_date>장박</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>장박</th>"
              +"<th class=num_charge>장박</th>"
              +"<th class=all_charge>장박</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

            }else{
              var check_get_date_num = parseInt(check_get_date-1);

              if (room[i].includes("평상")) {
                if (charge[i]=="10만원") {
                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
                  +"<th class=room>"+ room[i] +"</th>"
                  +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
                  +"<th class=get_date>당일</th>"
                  +"<th class=num>"+ check_num[i] +"</th>"
                  +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
                  +"<th class=num_charge>"+ "0만원</th>"
                  +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                  +"<th class=phone>"+phone[i]+"</th>"
                  +"<th class=reserve_name>"+user_name[i]+"</th>"
                  +"<th class=pay_name>"+pay_name[i]+"</th>"
                  +"<th class=car_num>"+email[i]+"</th>"
                  +"<th class=need colspan=2>"+need[i]+"</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                  +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                  +"</tr>");

                  result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
                }else{
                  if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
                    $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                    +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
                    +"<th class=room>"+ room[i] +"</th>"
                    +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
                    +"<th class=get_date>당일</th>"
                    +"<th class=num>"+ check_num[i] +"</th>"
                    +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
                    +"<th class=num_charge>"+ "0만원</th>"
                    +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
                    +"</tr>");

                    $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                    +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                    +"<th class=phone>"+phone[i]+"</th>"
                    +"<th class=reserve_name>"+user_name[i]+"</th>"
                    +"<th class=pay_name>"+pay_name[i]+"</th>"
                    +"<th class=car_num>"+email[i]+"</th>"
                    +"<th class=need colspan=2>"+need[i]+"</th>"
                    +"</tr>");

                    $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                    +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                    +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                    +"</tr>");

                    result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
                  }else{
                    $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                    +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
                    +"<th class=room>"+ room[i] +"</th>"
                    +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
                    +"<th class=get_date>당일</th>"
                    +"<th class=num>"+ check_num[i] +"</th>"
                    +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
                    +"<th class=num_charge>0만원</th>"
                    +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
                    +"</tr>");

                    $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                    +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                    +"<th class=phone>"+phone[i]+"</th>"
                    +"<th class=reserve_name>"+user_name[i]+"</th>"
                    +"<th class=pay_name>"+pay_name[i]+"</th>"
                    +"<th class=car_num>"+email[i]+"</th>"
                    +"<th class=need colspan=2>"+need[i]+"</th>"
                    +"</tr>");

                    $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                    +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                    +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                    +"</tr>");

                    result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
                  }
                }
                result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")));
              }else if(room[i].includes("민박")){
                if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<5) {
                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
                  +"<th class=room>"+ room[i] +"</th>"
                  +"<th class=use_date>"+ date[i]+"</th>"
                  +"<th class=get_date>"+check_date[i]+"</th>"
                  +"<th class=num>"+ check_num[i] +"</th>"
                  +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
                  +"<th class=num_charge>"+ "0만원</th>"
                  +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
                  +"</tr>");


                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                  +"<th class=phone>"+phone[i]+"</th>"
                  +"<th class=reserve_name>"+user_name[i]+"</th>"
                  +"<th class=pay_name>"+pay_name[i]+"</th>"
                  +"<th class=car_num>"+email[i]+"</th>"
                  +"<th class=need colspan=2>"+need[i]+"</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                  +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                  +"</tr>");

                  result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
                }else{
                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
                  +"<th class=room>"+ room[i] +"</th>"
                  +"<th class=use_date>"+ date[i]+"</th>"
                  +"<th class=get_date>"+check_date[i]+"</th>"
                  +"<th class=num>"+ check_num[i] +"</th>"
                  +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
                  +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num +"만원</th>"
                  +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num +"만원</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                  +"<th class=phone>"+phone[i]+"</th>"
                  +"<th class=reserve_name>"+user_name[i]+"</th>"
                  +"<th class=pay_name>"+pay_name[i]+"</th>"
                  +"<th class=car_num>"+email[i]+"</th>"
                  +"<th class=need colspan=2>"+need[i]+"</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                  +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                  +"</tr>");

                  result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num;
                  result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num;
                }


                result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
              }else{
                if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
                  +"<th class=room>"+ room[i] +"</th>"
                  +"<th class=use_date>"+ date[i]+"</th>"
                  +"<th class=get_date>"+check_date[i]+"</th>"
                  +"<th class=num>"+ check_num[i] +"</th>"
                  +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
                  +"<th class=num_charge>"+ "0만원</th>"
                  +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                  +"<th class=phone>"+phone[i]+"</th>"
                  +"<th class=reserve_name>"+user_name[i]+"</th>"
                  +"<th class=pay_name>"+pay_name[i]+"</th>"
                  +"<th class=car_num>"+email[i]+"</th>"
                  +"<th class=need colspan=2>"+need[i]+"</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                  +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                  +"</tr>");

                  result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
                }else{
                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+update_day_reference+"</th>"
                  +"<th class=room>"+ room[i] +"</th>"
                  +"<th class=use_date>"+ date[i]+"</th>"
                  +"<th class=get_date>"+check_date[i]+"</th>"
                  +"<th class=num>"+ check_num[i] +"</th>"
                  +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
                  +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num +"만원</th>"
                  +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num +"만원</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                  +"<th class=phone>"+phone[i]+"</th>"
                  +"<th class=reserve_name>"+user_name[i]+"</th>"
                  +"<th class=pay_name>"+pay_name[i]+"</th>"
                  +"<th class=car_num>"+email[i]+"</th>"
                  +"<th class=need colspan=2>"+need[i]+"</th>"
                  +"</tr>");

                  $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                  +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                  +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                  +"</tr>");

                  result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num;
                  result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num;
                }
                result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
              }
            }
            const delete_allday_result = reserve_num[i].split("/");
            var delete_year = delete_allday_result[0];
            var delete_month = delete_allday_result[1];
            var delete_date = delete_allday_result[2];
            var delete_hour = delete_allday_result[3];
            var delete_allday = new Date(delete_year,delete_month-1,delete_date+1,delete_hour);

            if (delete_allday<time) {
              if (pay_state[i]=="미결제") {
                $(".t_order").last().css('backgroundColor', '#EB3324');
              }
            }
          }
          $(".use_date").click(function(){
            if ($(this).attr('value').includes("장박")) {
              document.getElementById('all_date1').value = new Date().toISOString().substring(0, 10);
              document.getElementById('all_date2').value = new Date().toISOString().substring(0, 10);
              $('#all_date_dialog').css({display:'block'});
              $('#all_date_dialog .div_ok').attr('value',$(this).attr('value'));
            }

          });

          $(".reserve_state").click(function(){
            $('#reserve_dialog').css({display:'block'});
            $('#reserve_dialog .div_ok').attr('value',$(this).attr('value'));
            $('#reserve_dialog .div_cancel').attr('value',$(this).attr('value'));
          });

          $(".pay_state").click(function(){
            $('#pay_dialog').css({display:'block'});
            $('#pay_dialog .div_ok').attr('value',$(this).attr('value'));
            $('#pay_dialog .div_cancel').attr('value',$(this).attr('value'));
          });

          $(".t_order").click(function(){
            $('#delete_dialog').css({display:'block'});
            $('#delete_dialog .div_ok').attr('value',$(this).attr('value'));
            $('#delete_dialog .div_cancel').attr('value',$(this).attr('value'));
          });
        }

      })
    }


  }

  function set_info(){
    var database = firebase.database().ref();
    $(".master_login").css({'display':'none'});
    $(".master").css({'display':'inline'});

    document.getElementById('set_date').value = new Date().toISOString().substring(0, 10);
    document.getElementById('set_longdate1').value = new Date().toISOString().substring(0, 10);
    document.getElementById('set_longdate2').value = new Date().toISOString().substring(0, 10);
    const start_date = document.getElementById('set_date').value;
    var start_today = new Date(start_date);

    start_today = start_today.getFullYear()+"년"+(start_today.getMonth()+1)+"월"+start_today.getDate()+"일";

    var room = [];
    var check_date = [];
    var reference_date = [];
    var date = [];
    var charge = [];
    var check_num = [];
    var pay_name = [];
    var reserve_num = [];
    var email = [];
    var need = [];
    var phone = [];
    var user_name = [];
    var reserve_state = [];
    var pay_state = [];

    var reserve_Ref = database;
    reserve_Ref.once('value', function( data ){

      let pay_state_snap = data.child('reserve').child(start_today).val();
      for (i in pay_state_snap){
        for (j in pay_state_snap[i]) {
          for (k in pay_state_snap[i][j]){
            for (l in pay_state_snap[i][j][k]){

              if(l=="객실명"){
                room.push(pay_state_snap[i][j][k][l]);
              }
              reference_date.push(start_today);
              if(l=="객실금액"){
                charge.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="인원"){
                check_num.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="입금자명"){
                pay_name.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약번호"){
                reserve_num.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="이메일"){
                email.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="요청사항"){
                need.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약일"){
                check_date.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약날짜"){
                date.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="연락처"){
                phone.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약자명"){
                user_name.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="예약상태"){
                reserve_state.push(pay_state_snap[i][j][k][l]);
              }
              if(l=="상태"){
                pay_state.push(pay_state_snap[i][j][k][l]);
              }
            }
          }
        }
      }

      var result_room_charge = 0;
      var result_num_charge = 0;
      var result_all_charge = 0;

      let get_pay_state = [];

      var time = new Date();

      for (var i = 0; i < room.length; i++) {
        var check_get_date = check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일"));
        if (check_get_date=='장박') {
          $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
          +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date style ='color:#fff;background-color:#3c6b09;' value='장박/"+room[i]+"-"+phone[i]+"-"+check_num[i]+"/"+reserve_num[i]+"/"+user_name[i]+"/"+pay_name[i]+"/"+email[i]+"/"+need[i]+"'>장박</th>"
          +"<th class=get_date>장박</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>장박</th>"
          +"<th class=num_charge>장박</th>"
          +"<th class=all_charge>장박</th>"
          +"</tr>");

          $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
          +"<th class=reserve_num>"+reserve_num[i]+"</th>"
          +"<th class=phone>"+phone[i]+"</th>"
          +"<th class=reserve_name>"+user_name[i]+"</th>"
          +"<th class=pay_name>"+pay_name[i]+"</th>"
          +"<th class=car_num>"+email[i]+"</th>"
          +"<th class=need colspan=2>"+need[i]+"</th>"
          +"</tr>");

          $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
          +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
          +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
          +"</tr>");

        }else{
          var check_get_date_num = parseInt(check_get_date-1);

          if (room[i].includes("평상")) {
            if (charge[i]=="10만원") {
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
              +"<th class=get_date>당일</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
              +"<th class=num_charge>"+ "0만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
            }else{
              if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
                +"<th class=room>"+ room[i] +"</th>"
                +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
                +"<th class=get_date>당일</th>"
                +"<th class=num>"+ check_num[i] +"</th>"
                +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
                +"<th class=num_charge>"+ "0만원</th>"
                +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                +"<th class=phone>"+phone[i]+"</th>"
                +"<th class=reserve_name>"+user_name[i]+"</th>"
                +"<th class=pay_name>"+pay_name[i]+"</th>"
                +"<th class=car_num>"+email[i]+"</th>"
                +"<th class=need colspan=2>"+need[i]+"</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                +"</tr>");

                result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
              }else{
                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
                +"<th class=room>"+ room[i] +"</th>"
                +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
                +"<th class=get_date>당일</th>"
                +"<th class=num>"+ check_num[i] +"</th>"
                +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
                +"<th class=num_charge>0만원</th>"
                +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_num>"+reserve_num[i]+"</th>"
                +"<th class=phone>"+phone[i]+"</th>"
                +"<th class=reserve_name>"+user_name[i]+"</th>"
                +"<th class=pay_name>"+pay_name[i]+"</th>"
                +"<th class=car_num>"+email[i]+"</th>"
                +"<th class=need colspan=2>"+need[i]+"</th>"
                +"</tr>");

                $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
                +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
                +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
                +"</tr>");

                result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
              }
            }
            result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
          }else if(room[i].includes("민박")){
            if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<5) {
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ "0만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
            }else{
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num +"만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num;
              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num;
            }


            result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
          }else{
            if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ "0만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
            }else{
              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=t_order rowspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+(i+1)+"</th>"
              +"<th class=room>"+ room[i] +"</th>"
              +"<th class=use_date>"+ date[i]+"</th>"
              +"<th class=get_date>"+check_date[i]+"</th>"
              +"<th class=num>"+ check_num[i] +"</th>"
              +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
              +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num +"만원</th>"
              +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num +"만원</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_num>"+reserve_num[i]+"</th>"
              +"<th class=phone>"+phone[i]+"</th>"
              +"<th class=reserve_name>"+user_name[i]+"</th>"
              +"<th class=pay_name>"+pay_name[i]+"</th>"
              +"<th class=car_num>"+email[i]+"</th>"
              +"<th class=need colspan=2>"+need[i]+"</th>"
              +"</tr>");

              $(".reserve_table tbody:last").append("<tr class=tr_reserve>"
              +"<th class=reserve_state colspan=3 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+reserve_state[i]+"</th>"
              +"<th class=pay_state colspan=4 value='"+room[i]+"-"+phone[i]+"-"+reserve_num[i]+"'>"+pay_state[i]+"</th>"
              +"</tr>");

              result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num;
              result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num;
            }
            result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
          }
        }
        const delete_allday_result = reserve_num[i].split("/");
        var delete_year = delete_allday_result[0];
        var delete_month = delete_allday_result[1];
        var delete_date = delete_allday_result[2];
        var delete_hour = delete_allday_result[3];
        var delete_allday = new Date(delete_year,delete_month-1,delete_date+1,delete_hour);

        if (delete_allday<time) {
          if (pay_state[i]=="미결제") {
            $(".t_order").last().css('backgroundColor', '#EB3324');
          }
        }
      }
      $(".use_date").click(function(){
        if ($(this).attr('value').includes("장박")) {
          document.getElementById('all_date1').value = new Date().toISOString().substring(0, 10);
          document.getElementById('all_date2').value = new Date().toISOString().substring(0, 10);
          $('#all_date_dialog').css({display:'block'});
          $('#all_date_dialog .div_ok').attr('value',$(this).attr('value'));
        }
    	});

      $(".reserve_state").click(function(){
        $('#reserve_dialog').css({display:'block'});
        $('#reserve_dialog .div_ok').attr('value',$(this).attr('value'));
        $('#reserve_dialog .div_cancel').attr('value',$(this).attr('value'));
    	});

      $(".pay_state").click(function(){
        $('#pay_dialog').css({display:'block'});
        $('#pay_dialog .div_ok').attr('value',$(this).attr('value'));
        $('#pay_dialog .div_cancel').attr('value',$(this).attr('value'));
    	});

      $(".t_order").click(function(){
        $('#delete_dialog').css({display:'block'});
        $('#delete_dialog .div_ok').attr('value',$(this).attr('value'));
        $('#delete_dialog .div_cancel').attr('value',$(this).attr('value'));
    	});

    })


  }
  $('#all_date_dialog .close').click(function(){
      $('#all_date_dialog').css({display:'none'})
  })
  $('#all_date_dialog .div_ok').click(function(){
    $('#all_date_dialog').css({display:'none'})
    var database = firebase.database().ref();

    const all_date1 = document.getElementById('all_date1').value;
    var get_all_date1 = new Date(all_date1);

    const all_date2 = document.getElementById('all_date2').value;
    var get_all_date2 = new Date(all_date2);

    var start_date = get_all_date1;
    var end_date = get_all_date2;

    const elapsedMSec = end_date.getTime() - start_date.getTime(); //
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24; //

    var all_day_num = elapsedDay;

    get_all_date1 = get_all_date1.getFullYear()+"년"+(get_all_date1.getMonth()+1)+"월"+get_all_date1.getDate()+"일";

    var year = get_all_date1.substring(0, get_all_date1.indexOf("년"));
    var month = get_all_date1.substring(get_all_date1.indexOf("년")+1, get_all_date1.indexOf("월"));
    var day = get_all_date1.substring(get_all_date1.indexOf("월")+1, get_all_date1.indexOf("일"));

    get_all_date2 = get_all_date2.getFullYear()+"년"+(get_all_date2.getMonth()+1)+"월"+get_all_date2.getDate()+"일";

    const value_result = $(this).attr('value').split("-");
    var room_name = value_result[1];
    var phone = value_result[2];
    var check_num = value_result[3];
    var reserve_num = value_result[4];
    var user_name = value_result[5];
    var pay_name = value_result[6];
    var email = value_result[7];
    var need = value_result[8];

//장박 검토
    database.once('value', function( data ){
      var next_session = true;
      let next_room = [];
      let next_date = [];

      for (var j = 1; j < all_day_num+1; j++) {
        var update_day = new Date(year,month-1,start_date.getDate() + j);
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

      if (next_session) {
        for (var j = 0; j < all_day_num+1; j++) {
          var update_day = new Date(year,month-1,start_date.getDate() + j);
          var update_day_year = update_day.getFullYear();
          var update_day_month = update_day.getMonth()+1;
          var update_day_day = update_day.getDate();

          var update_day_reference = update_day_year+"년"+update_day_month+"월"+update_day_day+"일";
          if (room_name.includes("A")) {
            var reserve_ref = database.child("reserve").child(update_day_reference).child("a_site").child(room_name).child(phone);
          }
          if (room_name.includes("B")) {
            var reserve_ref = database.child("reserve").child(update_day_reference).child("b_site").child(room_name).child(phone);
          }
          if (room_name.includes("C")) {
            var reserve_ref = database.child("reserve").child(update_day_reference).child("c_site").child(room_name).child(phone);
          }
          if ((!room_name.includes("B"))&&room_name.includes("평상")) {
            var reserve_ref = database.child("reserve").child(update_day_reference).child("wood_site").child(room_name).child(phone);
          }
          if (room_name.includes("민박")) {
            var reserve_ref = database.child("reserve").child(update_day_reference).child("private_site").child(room_name).child(phone);
          }

          var reserve_obj = {
            객실명: room_name,
            객실금액: "장박",
            총금액: "장박",
            상태: "미결제",
            연락처: phone,
            예약번호: reserve_num,
            예약상태: "예약",
            예약일: "장박",
            예약날짜: "장박",
            요청사항: need,
            입금자명: pay_name,
            예약자명: user_name,
            이메일: email,
            인원: check_num,
          };
          reserve_ref.set(reserve_obj);
        }
        if (now_bt_date == 0) {
          f_set_date();
        }else if(now_bt_date == 1){
          f_longset_date();
        }
        alert("장박예약 완료");
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

  $('#reserve_dialog .close').click(function(){
      $('#reserve_dialog').css({display:'none'})
  })

  $('#reserve_dialog .div_ok').click(function(){
    $('#reserve_dialog').css({display:'none'})
    var database = firebase.database().ref();
    const set_date = document.getElementById('set_date').value;
    var get_today = new Date(set_date);

    get_today = get_today.getFullYear()+"년"+(get_today.getMonth()+1)+"월"+get_today.getDate()+"일";

    const value_result = $(this).attr('value').split("-");
    var room_name = value_result[0];
    var phone = value_result[1];
    var reserve_num = value_result[2];

    var database = firebase.database().ref();
    var siteRef = database;
    siteRef.once('value', function( data ){
      let reserve_snap = data.child('reserve').val();
      var reserve_site = [];
      for (a in reserve_snap){
        for(b in reserve_snap[a]){
          for(c in reserve_snap[a][b]){
            if (c==room_name) {
              for(d in reserve_snap[a][b][c]){
                if (d==phone) {
                  for(e in reserve_snap[a][b][c][d]){
                    if (e=="예약번호") {
                      if (reserve_snap[a][b][c][d][e]==reserve_num) {
                        if (room_name.includes("A")) {
                          var reserve_ref = database.child("reserve").child(a).child("a_site").child(room_name).child(phone).child("예약상태");
                        }
                        if (room_name.includes("B")) {
                          var reserve_ref = database.child("reserve").child(a).child("b_site").child(room_name).child(phone).child("예약상태");
                        }
                        if (room_name.includes("C")) {
                          var reserve_ref = database.child("reserve").child(a).child("c_site").child(room_name).child(phone).child("예약상태");
                        }
                        if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                          var reserve_ref = database.child("reserve").child(a).child("wood_site").child(room_name).child(phone).child("예약상태");
                        }
                        if (room_name.includes("민박")) {
                          var reserve_ref = database.child("reserve").child(a).child("private_site").child(room_name).child(phone).child("예약상태");
                        }

                        reserve_ref.set("예약");

                      }

                    }

                  }
                }

              }
            }

          }
        }
      }

      if (now_bt_date == 0) {
        f_set_date();
      }else if(now_bt_date == 1){
        f_longset_date();
      }
    })


  })

  $('#reserve_dialog .div_cancel').click(function(){
      $('#reserve_dialog').css({display:'none'})
      var database = firebase.database().ref();
      const set_date = document.getElementById('set_date').value;
      var get_today = new Date(set_date);

      get_today = get_today.getFullYear()+"년"+(get_today.getMonth()+1)+"월"+get_today.getDate()+"일";

      const value_result = $(this).attr('value').split("-");
      var room_name = value_result[0];
      var phone = value_result[1];
      var reserve_num = value_result[2];

      var database = firebase.database().ref();
      var siteRef = database;
      siteRef.once('value', function( data ){
        let reserve_snap = data.child('reserve').val();
        var reserve_site = [];
        for (a in reserve_snap){
          for(b in reserve_snap[a]){
            for(c in reserve_snap[a][b]){
              if (c==room_name) {
                for(d in reserve_snap[a][b][c]){
                  if (d==phone) {
                    for(e in reserve_snap[a][b][c][d]){
                      if (e=="예약번호") {
                        if (reserve_snap[a][b][c][d][e]==reserve_num) {
                          if (room_name.includes("A")) {
                            var reserve_ref = database.child("reserve").child(a).child("a_site").child(room_name).child(phone).child("예약상태");
                          }
                          if (room_name.includes("B")) {
                            var reserve_ref = database.child("reserve").child(a).child("b_site").child(room_name).child(phone).child("예약상태");
                          }
                          if (room_name.includes("C")) {
                            var reserve_ref = database.child("reserve").child(a).child("c_site").child(room_name).child(phone).child("예약상태");
                          }
                          if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                            var reserve_ref = database.child("reserve").child(a).child("wood_site").child(room_name).child(phone).child("예약상태");
                          }
                          if (room_name.includes("민박")) {
                            var reserve_ref = database.child("reserve").child(a).child("private_site").child(room_name).child(phone).child("예약상태");
                          }

                          reserve_ref.set("예약취소");

                        }

                      }

                    }
                  }

                }
              }

            }
          }
        }

        if (now_bt_date == 0) {
          f_set_date();
        }else if(now_bt_date == 1){
          f_longset_date();
        }
      })

  })


  $('#pay_dialog .close').click(function(){
      $('#pay_dialog').css({display:'none'})
  })

  $('#pay_dialog .div_ok').click(function(){
      $('#pay_dialog').css({display:'none'})
      var database = firebase.database().ref();
      const set_date = document.getElementById('set_date').value;
      var get_today = new Date(set_date);

      get_today = get_today.getFullYear()+"년"+(get_today.getMonth()+1)+"월"+get_today.getDate()+"일";

      const value_result = $(this).attr('value').split("-");
      var room_name = value_result[0];
      var phone = value_result[1];
      var reserve_num = value_result[2];

      var database = firebase.database().ref();
      var siteRef = database;
      siteRef.once('value', function( data ){
        let reserve_snap = data.child('reserve').val();
        var reserve_site = [];
        for (a in reserve_snap){
          for(b in reserve_snap[a]){
            for(c in reserve_snap[a][b]){
              if (c==room_name) {
                for(d in reserve_snap[a][b][c]){
                  if (d==phone) {
                    for(e in reserve_snap[a][b][c][d]){
                      if (e=="예약번호") {
                        if (reserve_snap[a][b][c][d][e]==reserve_num) {
                          if (room_name.includes("A")) {
                            var reserve_ref = database.child("reserve").child(a).child("a_site").child(room_name).child(phone).child("상태");
                          }
                          if (room_name.includes("B")) {
                            var reserve_ref = database.child("reserve").child(a).child("b_site").child(room_name).child(phone).child("상태");
                          }
                          if (room_name.includes("C")) {
                            var reserve_ref = database.child("reserve").child(a).child("c_site").child(room_name).child(phone).child("상태");
                          }
                          if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                            var reserve_ref = database.child("reserve").child(a).child("wood_site").child(room_name).child(phone).child("상태");
                          }
                          if (room_name.includes("민박")) {
                            var reserve_ref = database.child("reserve").child(a).child("private_site").child(room_name).child(phone).child("상태");
                          }

                          reserve_ref.set("결제완료");

                        }

                      }

                    }
                  }

                }
              }

            }
          }
        }

        if (now_bt_date == 0) {
          f_set_date();
        }else if(now_bt_date == 1){
          f_longset_date();
        }
      })
  })

  $('#pay_dialog .div_cancel').click(function(){
      $('#pay_dialog').css({display:'none'})
      var database = firebase.database().ref();
      const set_date = document.getElementById('set_date').value;
      var get_today = new Date(set_date);

      get_today = get_today.getFullYear()+"년"+(get_today.getMonth()+1)+"월"+get_today.getDate()+"일";

      const value_result = $(this).attr('value').split("-");
      var room_name = value_result[0];
      var phone = value_result[1];
      var reserve_num = value_result[2];

      var database = firebase.database().ref();
      var siteRef = database;
      siteRef.once('value', function( data ){
        let reserve_snap = data.child('reserve').val();
        var reserve_site = [];
        for (a in reserve_snap){
          for(b in reserve_snap[a]){
            for(c in reserve_snap[a][b]){
              if (c==room_name) {
                for(d in reserve_snap[a][b][c]){
                  if (d==phone) {
                    for(e in reserve_snap[a][b][c][d]){
                      if (e=="예약번호") {
                        if (reserve_snap[a][b][c][d][e]==reserve_num) {
                          if (room_name.includes("A")) {
                            var reserve_ref = database.child("reserve").child(a).child("a_site").child(room_name).child(phone).child("상태");
                          }
                          if (room_name.includes("B")) {
                            var reserve_ref = database.child("reserve").child(a).child("b_site").child(room_name).child(phone).child("상태");
                          }
                          if (room_name.includes("C")) {
                            var reserve_ref = database.child("reserve").child(a).child("c_site").child(room_name).child(phone).child("상태");
                          }
                          if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                            var reserve_ref = database.child("reserve").child(a).child("wood_site").child(room_name).child(phone).child("상태");
                          }
                          if (room_name.includes("민박")) {
                            var reserve_ref = database.child("reserve").child(a).child("private_site").child(room_name).child(phone).child("상태");
                          }

                          reserve_ref.set("미결제");

                        }

                      }

                    }
                  }

                }
              }

            }
          }
        }

        if (now_bt_date == 0) {
          f_set_date();
        }else if(now_bt_date == 1){
          f_longset_date();
        }
      })

  })

  $('#delete_dialog .close').click(function(){
      $('#delete_dialog').css({display:'none'})
  })

  $('#delete_dialog .div_ok').click(function(){
      $('#delete_dialog').css({display:'none'})
      var database = firebase.database().ref();
      const set_date = document.getElementById('set_date').value;
      var get_today = new Date(set_date);

      get_today = get_today.getFullYear()+"년"+(get_today.getMonth()+1)+"월"+get_today.getDate()+"일";

      const value_result = $(this).attr('value').split("-");
      var room_name = value_result[0];
      var phone = value_result[1];
      var reserve_num = value_result[2];

      console.log(reserve_num);

      var database = firebase.database().ref();
      var siteRef = database;
      siteRef.once('value', function( data ){
        let reserve_snap = data.child('reserve').val();
        var reserve_site = [];
        for (a in reserve_snap){
          for(b in reserve_snap[a]){
            for(c in reserve_snap[a][b]){
              if (c==room_name) {
                for(d in reserve_snap[a][b][c]){
                  if (d==phone) {
                    for(e in reserve_snap[a][b][c][d]){
                      if (e=="예약번호") {
                        if (reserve_snap[a][b][c][d][e]==reserve_num) {
                          if (room_name.includes("A")) {
                            var reserve_ref = database.child("reserve").child(a).child("a_site").child(room_name).child(phone);
                          }
                          if (room_name.includes("B")) {
                            var reserve_ref = database.child("reserve").child(a).child("b_site").child(room_name).child(phone);
                          }
                          if (room_name.includes("C")) {
                            var reserve_ref = database.child("reserve").child(a).child("c_site").child(room_name).child(phone);
                          }
                          if ((!room_name.includes("B"))&&room_name.includes("평상")) {
                            var reserve_ref = database.child("reserve").child(a).child("wood_site").child(room_name).child(phone);
                          }
                          if (room_name.includes("민박")) {
                            var reserve_ref = database.child("reserve").child(a).child("private_site").child(room_name).child(phone);
                          }

                          reserve_ref.remove();

                        }

                      }

                    }
                  }

                }
              }

            }
          }
        }

        if (now_bt_date == 0) {
          f_set_date();
        }else if(now_bt_date == 1){
          f_longset_date();
        }
      })

  })

  $('#delete_dialog .div_cancel').click(function(){
      $('#delete_dialog').css({display:'none'})

  })


})
