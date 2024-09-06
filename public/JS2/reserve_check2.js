$(function(){
  var database = firebase.database().ref();

  var room = JSON.parse(sessionStorage.getItem('room'));
  var charge = JSON.parse(sessionStorage.getItem('charge'));
  var check_num = JSON.parse(sessionStorage.getItem('check_num'));
  var reference_date = JSON.parse(sessionStorage.getItem('reference_date'));
  var check_date = JSON.parse(sessionStorage.getItem('check_date'));
  var date = JSON.parse(sessionStorage.getItem('date'));
  var pay_name = JSON.parse(sessionStorage.getItem('pay_name'));
  var reserve_num = JSON.parse(sessionStorage.getItem('reserve_num'));
  var user_name = sessionStorage.getItem('user_name');
  var phone = sessionStorage.getItem('phone');
  var email = JSON.parse(sessionStorage.getItem('email'));
  var need = JSON.parse(sessionStorage.getItem('need'));

  var result_room_charge = 0;
  var result_num_charge = 0;
  var result_all_charge = 0;

  let get_pay_state = [];

  var database = firebase.database().ref();

  var pay_stateRef = database;


  for (var i = 0; i < room.length; i++) {
    for (var j = i+1; j < room.length; j++) {
      //&&reference_date[i]==reference_date[j]
      if (room[i]==room[j]&&date[i]==date[j]&&check_num[i]==check_num[j]&&email[i]==email[j]&&need[i]==need[j]&&pay_name[i]==pay_name[j]&&reserve_num[i]==reserve_num[j]) {

        delete room[j];delete charge[j];delete check_num[j];delete reference_date[j];
        delete check_date[j];delete date[j];delete pay_name[j];delete reserve_num[j];
        delete email[j];delete need[j];

      }
    }
  }
  room = room.filter((element, i) => element != null);charge = charge.filter((element, i) => element != null);
  check_num = check_num.filter((element, i) => element != null);reference_date = reference_date.filter((element, i) => element != null);
  check_date = check_date.filter((element, i) => element != null);date = date.filter((element, i) => element != null);
  pay_name = pay_name.filter((element, i) => element != null);reserve_num = reserve_num.filter((element, i) => element != null);
  email = email.filter((element, i) => element != null);need = need.filter((element, i) => element != null);


  for (var i = 0; i < room.length; i++) {
    var check_get_date = check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일"));
    if (check_get_date=='장박') {
      $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
      +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
      +"<th class=room>"+ room[i] +"</th>"
      +"<th class=use_date>장박</th>"
      +"<th class=get_date>장박</th>"
      +"<th class=num>"+ check_num[i] +"</th>"
      +"<th class=room_charge>장박</th>"
      +"<th class=num_charge>장박</th>"
      +"<th class=all_charge>장박</th>"
      +"</tr>");

      $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
      +"<th class=room>"+ room[i] +"</th>"
      +"<th class=all_charge>장박</th>"
      +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
      +"</tr>");
    }else{
      var check_get_date_num = parseInt(check_get_date-1);

      if (room[i].includes("평상")) {
        if (charge[i]=="10만원") {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
          +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
          +"<th class=get_date>당일</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
          +"<th class=num_charge>"+ "0만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
          +"</tr>");

          $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
          +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
          +"</tr>");
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
        }else{
          if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
            $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
            +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
            +"<th class=get_date>당일</th>"
            +"<th class=num>"+ check_num[i] +"</th>"
            +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
            +"<th class=num_charge>"+ "0만원</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
            +"</tr>");

            $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
            +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
            +"</tr>");

            result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
          }else{

            $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
            +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=use_date>"+date[i].substring(0,date[i].indexOf("~"))+"</th>"
            +"<th class=get_date>당일</th>"
            +"<th class=num>"+ check_num[i] +"</th>"
            +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만"))) +"만원</th>"
            +"<th class=num_charge>0만원</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
            +"</tr>");

            $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만")))) +"만원</th>"
            +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
            +"</tr>");

            result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))));
          }
        }
        result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")));
      }else if(room[i].includes("민박")){
        if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<5) {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
          +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ date[i]+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ "0만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
          +"</tr>");

          $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
          +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
          +"</tr>");

          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
        }else{

          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
          +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ date[i]+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num +"만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num +"만원</th>"
          +"</tr>");

          $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num +"만원</th>"
          +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
          +"</tr>");

          result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5)*check_get_date_num;
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 5))*check_get_date_num;
        }


        result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
      }else{
        if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<4) {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
          +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ date[i]+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ "0만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
          +"</tr>");

          $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num +"만원</th>"
          +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
          +"</tr>");

          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))))*check_get_date_num;
        }else{

          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
          +"<th class=check>"+ "<input class='check_room' type='checkbox' value='"+room[i]+"-"+phone+"-"+reserve_num[i]+"'>"+"</th>" +"</th>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ date[i]+"</th>"
          +"<th class=get_date>"+check_date[i]+"</th>"
          +"<th class=num>"+ check_num[i] +"</th>"
          +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num +"만원</th>"
          +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num +"만원</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num +"만원</th>"
          +"</tr>");

          $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num +"만원</th>"
          +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
          +"</tr>");

          result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)*check_get_date_num;
          result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4))*check_get_date_num;
        }
        result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")))*check_get_date_num;
      }
    }

    let room_name = room[i];
    let database_date = reference_date[i];

    let reserve_ref;

    if (room_name.includes("A")) {
      reserve_ref = database.child("reserve").child(database_date).child("a_site").child(room_name).child(phone);
    }
    if (room_name.includes("B")) {
      reserve_ref = database.child("reserve").child(database_date).child("b_site").child(room_name).child(phone);
    }
    if (room_name.includes("C")) {
      reserve_ref = database.child("reserve").child(database_date).child("c_site").child(room_name).child(phone);
    }
    if ((!room_name.includes("B"))&&room_name.includes("평상")) {
      reserve_ref = database.child("reserve").child(database_date).child("wood_site").child(room_name).child(phone);
    }
    if (room_name.includes("민박")) {
      reserve_ref = database.child("reserve").child(database_date).child("private_site").child(room_name).child(phone);
    }
    let ref_num = i;

    //console.log(database_date);
    //console.log(reference_date);

    reserve_ref.once('value', function( data ){


      let pay_state_snap = data.val();

      for (a in pay_state_snap) {
        if(a=="상태"){
          if (pay_state_snap[a]=="미결제") {
            get_pay_state.push(false);
            $('#pay_state_'+ref_num).text("미결제");
          }else{
            $('#pay_state_'+ref_num).text("결제완료");
            get_pay_state.push(true);
          }

        }
      }
      if (ref_num==room.length-1) {
        let bool_pay_state = true;
        for (var b = 0;b < get_pay_state.length; b++) {
          console.log(get_pay_state[b]);
          if (!get_pay_state[b]) {
            bool_pay_state = false;
          }

        }
        if (!bool_pay_state) {
          $('.set_now_pay').text("미결제");
        }else{
          $('.set_now_pay').text("결제완료");
        }
      }

    })
  }


  $('.result_room_charge').text(result_room_charge+"만원");
  $('.result_num_charge').text(result_num_charge+"만원");
  $('.result_all_charge').text(result_all_charge+"만원");

  $('.set_all_pay').text(result_all_charge+"만원");

  $('.all_pay').text(result_all_charge+"만원");

  $('.all_pay').text(result_all_charge+"만원");

  var get_pay_name = [];
  $.each(pay_name,function(i,value){
    if(get_pay_name.indexOf(value) == -1 ) get_pay_name.push(value);
  });
  $('.pay_name').text("입금자명 : "+get_pay_name+"/ 입금계좌 : (농협)356-1256-5769-13 이동석");


  $('.set_now_pay').text("미결제");
  $('.reserve_state').text("예약");

  var get_reserve_num = [];
  $.each(reserve_num,function(i,value){
    if(get_reserve_num.indexOf(value) == -1 ) get_reserve_num.push(value);
  });
  $('.reserve_num').text(get_reserve_num);
  $('.reserve_name').text(user_name);
  $('.reserve_phone').text(phone);
  var get_email = [];
  $.each(email,function(i,value){
    if(get_email.indexOf(value) == -1 ) get_email.push(value);
  });
  $('.reserve_email').text(get_email);
  var get_need = [];
  $.each(need,function(i,value){
    if(get_need.indexOf(value) == -1 ) get_need.push(value);
  });
  $('.reserve_need').text(get_need);

  $(".bt_cancel").click(function(){
    var checkbox = $("input:checkbox[class = check_room]:checked");
    var checkbox_num = $("input:checkbox[class = check_room]:checked").length;

    if (checkbox_num==0) {
      alert("객실을 선택해 주세요!");
      return false;
    }
    if (checkbox_num>1) {
      alert("객실을 하나씩 선택해 주세요!");
      return false;
    }

    $('#delete_dialog').css({display:'block'});
    $('#delete_dialog .div_ok').attr('value',checkbox.attr('value'));
    $('#delete_dialog .div_cancel').attr('value',checkbox.attr('value'));
  });

  $('#delete_dialog .close').click(function(){
      $('#delete_dialog').css({display:'none'})
  })

  $('#delete_dialog .div_ok').click(function(){
      $('#delete_dialog').css({display:'none'})
      var database = firebase.database().ref();

      const value_result = $(this).attr('value').split("-");
      var room_name = value_result[0];
      var phone = value_result[1];
      var reserve_num = value_result[2];

      console.log(room_name);
      console.log(phone);
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
                          alert("예약취소 완료하였습니다!");
                          location.replace('check.html');

                        }

                      }

                    }
                  }

                }
              }

            }
          }
        }


      })

  })

  $('#delete_dialog .div_cancel').click(function(){
      $('#delete_dialog').css({display:'none'})

  })

})
