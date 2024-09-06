$(function(){
  $(".bt_next").click(function(){
    $('#user_name').blur();
    $('#phone').blur();
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

    var user_name = $('#user_name').val();
    var phone = $('#phone').val();

    if (user_name=="") {
      alert("예약자명을 입력해주세요.");
      $('#user_name').focus();
      return false ;
    }
    if (phone=="") {
      alert("핸드폰 번호를 전부 입력해주세요.(-를 빼고 입력바랍니다.)");
      $('#phone').focus();
      return false ;
    }
    var login = false;
    var database = firebase.database().ref();

    var pay_stateRef = database;
    pay_stateRef.on('value', function( data ){

      let pay_state_snap = data.child('reserve').val();
      for (i in pay_state_snap){
        for (j in pay_state_snap[i]) {
          for (k in pay_state_snap[i][j]){
            for (l in pay_state_snap[i][j][k]){

              if (l.trim()==phone) {
                var login_check = false;
                for (m in pay_state_snap[i][j][k][l]){
                  if (m=="예약자명") {
                     if(pay_state_snap[i][j][k][l][m].trim()==user_name){
                       login = true;
                       login_check = true;
                     }else{
                       login_check = false;
                     }
                  }
                }
                if (login_check) {
                  for (m in pay_state_snap[i][j][k][l]){

                    if(m=="객실명"){
                      room.push(pay_state_snap[i][j][k][l][m]);
                      reference_date.push(i);
                    }

                    if(m=="객실금액"){
                      charge.push(pay_state_snap[i][j][k][l][m]);
                    }
                    if(m=="인원"){
                      check_num.push(pay_state_snap[i][j][k][l][m]);
                    }
                    if(m=="입금자명"){
                      pay_name.push(pay_state_snap[i][j][k][l][m]);
                    }
                    if(m=="예약번호"){
                      reserve_num.push(pay_state_snap[i][j][k][l][m]);
                    }
                    if(m=="이메일"){
                      email.push(pay_state_snap[i][j][k][l][m]);
                    }
                    if(m=="요청사항"){
                      need.push(pay_state_snap[i][j][k][l][m]);
                    }
                    if(m=="예약일"){
                      check_date.push(pay_state_snap[i][j][k][l][m]);
                    }
                    if(m=="예약날짜"){
                      date.push(pay_state_snap[i][j][k][l][m]);
                    }
                  }
                }

              }
            }
          }
        }
      }
      if (login) {
        console.log("성공");
        sessionStorage.setItem('room', JSON.stringify(room));
        sessionStorage.setItem('check_date', JSON.stringify(check_date));
        sessionStorage.setItem('reference_date', JSON.stringify(reference_date));
        sessionStorage.setItem('date', JSON.stringify(date));
        sessionStorage.setItem('charge', JSON.stringify(charge));
        sessionStorage.setItem('check_num', JSON.stringify(check_num));
        sessionStorage.setItem('pay_name', JSON.stringify(pay_name));
        sessionStorage.setItem('reserve_num', JSON.stringify(reserve_num));
        sessionStorage.setItem('user_name', user_name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', JSON.stringify(email));
        sessionStorage.setItem('need', JSON.stringify(need));
        location.replace('reserve_check2.html');
        //location.href = 'reserve_check2.html';
      }else{
        alert("잘못된 정보입니다.");
      }
    })


  })



})
