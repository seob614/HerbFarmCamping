$(function(){
  var database = firebase.database().ref();

  var room = JSON.parse(sessionStorage.getItem('room'));
  var charge = JSON.parse(sessionStorage.getItem('charge'));
  var check_num = JSON.parse(sessionStorage.getItem('check_num'));
  var check_date = JSON.parse(sessionStorage.getItem('check_date'));
  var date = sessionStorage.getItem('date');
  var pay_name = sessionStorage.getItem('pay_name');
  var reserve_num = sessionStorage.getItem('reserve_num');
  var user_name = sessionStorage.getItem('user_name');
  var phone = sessionStorage.getItem('phone');
  var email = sessionStorage.getItem('email');
  var need = sessionStorage.getItem('need');

  var year = date.substring(1, date.indexOf("년"));
  var month = date.substring(date.indexOf("년")+1, date.indexOf("월"));
  var day = date.substring(date.indexOf("월")+1, date.indexOf("일"));

  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var dayOfWeek = week[new Date(year,month-1,day).getDay()];

  var now = new Date(year,month-1,day);
  var tomorrow = new Date(year,month-1,now.getDate() + 1);
  var tomorrow_year = tomorrow.getFullYear();
  var tomorrow_month = tomorrow.getMonth()+1;
  var tomorrow_day = tomorrow.getDate();

  var tomorrowOfWeek = week[tomorrow.getDay()];

  var result_room_charge = 0;
  var result_num_charge = 0;
  var result_all_charge = 0;

  let get_pay_state = [];

  for (var i = 0; i < room.length; i++) {
    var check_get_date = check_date[i].substring(check_date[i].indexOf("박")+1, check_date[i].indexOf("일"));
    if (check_get_date=='장박') {
      $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
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

      var tomorrow = new Date(year,month-1,now.getDate() + check_get_date_num);
      var tomorrow_year = tomorrow.getFullYear();
      var tomorrow_month = tomorrow.getMonth()+1;
      var tomorrow_day = tomorrow.getDate();

      var tomorrowOfWeek = week[tomorrow.getDay()];

      if (room[i].includes("평상")) {
        if (charge[i]=="10만원") {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")</th>"
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
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")</th>"
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
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")</th>"
            +"<th class=get_date>당일</th>"
            +"<th class=num>"+ check_num[i] +"</th>"
            +"<th class=room_charge>"+ parseInt(charge[i].substring(0,charge[i].indexOf("만")))+ "만원</th>"
            +"<th class=num_charge>"+ (parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4) +"만원</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)) +"만원</th>"
            +"</tr>");

            $(".set_pay_table tbody:last").append("<tr class='tr_pay_state "+room+"'>"
            +"<th class=room>"+ room[i] +"</th>"
            +"<th class=all_charge>"+ (parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4)) +"만원</th>"
            +"<th id= 'pay_state_"+i+"'class=pay_state>미결제</th>"
            +"</tr>");
            result_num_charge = result_num_charge+(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4);
            result_all_charge = result_all_charge+(parseInt(charge[i].substring(0,charge[i].indexOf("만"))) + parseInt(parseInt(check_num[i].substring(0,check_num[i].indexOf("명"))) - 4));
          }
        }
        result_room_charge = result_room_charge+parseInt(charge[i].substring(0,charge[i].indexOf("만")));
      }else if(room[i].includes("민박")){
        if (parseInt(check_num[i].substring(0,check_num[i].indexOf("명")))<5) {
          $(".check_reserve_table tbody:last").append("<tr class='tr_reserve "+room[i]+"'>"
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
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
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
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
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
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
          +"<th class=room>"+ room[i] +"</th>"
          +"<th class=use_date>"+ month+"."+day+"("+dayOfWeek+")"+"~"+ tomorrow_month+"."+tomorrow_day+"("+tomorrowOfWeek+")"+"</th>"
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

    var room_name = room[i];

    if (room_name.includes("A")) {
      var reserve_ref = database.child("reserve").child(date.substring(2,date.indexOf('일')+1)).child("a_site").child(room_name).child(phone);
    }
    if (room_name.includes("B")) {
      var reserve_ref = database.child("reserve").child(date.substring(2,date.indexOf('일')+1)).child("b_site").child(room_name).child(phone);
    }
    if (room_name.includes("C")) {
      var reserve_ref = database.child("reserve").child(date.substring(2,date.indexOf('일')+1)).child("c_site").child(room_name).child(phone);
    }
    if ((!room_name.includes("B"))&&room_name.includes("평상")) {
      var reserve_ref = database.child("reserve").child(date.substring(2,date.indexOf('일')+1)).child("wood_site").child(room_name).child(phone);
    }
    if (room_name.includes("민박")) {
      var reserve_ref = database.child("reserve").child(date.substring(2,date.indexOf('일')+1)).child("private_site").child(room_name).child(phone);
    }
    let ref_num = i;
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

  $('.pay_name').text("입금자명 : "+pay_name+"/ 입금계좌 : (농협)356-1256-5769-13 이동석");


  $('.reserve_state').text("예약");
  $('.reserve_num').text(reserve_num);
  $('.reserve_name').text(user_name);
  $('.reserve_phone').text(phone);
  $('.reserve_email').text(email);
  $('.reserve_need').text(need);

})
