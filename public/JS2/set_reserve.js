$(function(){
  var database = firebase.database().ref();

  $(".bt_map").click(function(){
    $('#map_dialog').css({display:'block'});
  });

  $('#map_dialog .close').click(function(){
      $('#map_dialog').css({display:'none'})
  })

  $(".tr_reserve").detach();
  $(".all_site").css({'background-color':'#4eacf9'});
  $(".a_site").css({'background-color':'#3c6b09'});
  $(".b_site").css({'background-color':'#3c6b09'});
  $(".c_site").css({'background-color':'#3c6b09'});
  $(".wood_site").css({'background-color':'#3c6b09'});
  $(".private_site").css({'background-color':'#3c6b09'});
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

        if (reserve_site.includes(j)) {

        }else{
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
    $(".all_site").click(function() {
      $(".tr_reserve").detach();
      $(".all_site").css({'background-color':'#4eacf9'});
      $(".a_site").css({'background-color':'#3c6b09'});
      $(".b_site").css({'background-color':'#3c6b09'});
      $(".c_site").css({'background-color':'#3c6b09'});
      $(".wood_site").css({'background-color':'#3c6b09'});
      $(".private_site").css({'background-color':'#3c6b09'});



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

    $(".a_site").click(function(){
      $(".tr_reserve").detach();
      $(".all_site").css({'background-color':'#3c6b09'});
      $(".a_site").css({'background-color':'#4eacf9'});
      $(".b_site").css({'background-color':'#3c6b09'});
      $(".c_site").css({'background-color':'#3c6b09'});
      $(".wood_site").css({'background-color':'#3c6b09'});
      $(".private_site").css({'background-color':'#3c6b09'});
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
          if (i=='a_site') {
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
          }


        }

      })
    })

    $(".b_site").click(function(){
      $(".tr_reserve").detach();
      $(".all_site").css({'background-color':'#3c6b09'});
      $(".a_site").css({'background-color':'#3c6b09'});
      $(".b_site").css({'background-color':'#4eacf9'});
      $(".c_site").css({'background-color':'#3c6b09'});
      $(".wood_site").css({'background-color':'#3c6b09'});
      $(".private_site").css({'background-color':'#3c6b09'});
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
          if (i=='b_site') {
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

            }
          }


        }

      })
    })

    $(".c_site").click(function(){
      $(".tr_reserve").detach();
      $(".all_site").css({'background-color':'#3c6b09'});
      $(".a_site").css({'background-color':'#3c6b09'});
      $(".b_site").css({'background-color':'#3c6b09'});
      $(".c_site").css({'background-color':'#4eacf9'});
      $(".wood_site").css({'background-color':'#3c6b09'});
      $(".private_site").css({'background-color':'#3c6b09'});
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
          if (i=='c_site') {
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
          }


        }

      })
    })

    $(".wood_site").click(function(){
      $(".tr_reserve").detach();
      $(".all_site").css({'background-color':'#3c6b09'});
      $(".a_site").css({'background-color':'#3c6b09'});
      $(".b_site").css({'background-color':'#3c6b09'});
      $(".c_site").css({'background-color':'#3c6b09'});
      $(".wood_site").css({'background-color':'#4eacf9'});
      $(".private_site").css({'background-color':'#3c6b09'});
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
          if (i=='wood_site') {
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

              }

            }
          }


        }

      })
    })

    $(".private_site").click(function(){
      var time = new Date();

      var delete_set_time = String(time.getFullYear())+"/"+String(time.getMonth()+1)+"/"+
      String(time.getDate())+"/"+String(time.getHours())+"/"+
      String(time.getMinutes())+"/"+String(time.getSeconds());

      console.log(delete_set_time);

      const delete_allday_result = delete_set_time.split("/");
      var delete_year = delete_allday_result[0];
      var delete_month = delete_allday_result[1];
      var delete_date = delete_allday_result[2];
      var delete_hour = delete_allday_result[3];
      var delete_allday = new Date(delete_year,delete_month-1,delete_date,delete_hour);

      console.log(delete_allday);
      if (delete_allday<time) {
        console.log(delete_allday);
      }

      $(".tr_reserve").detach();
      $(".all_site").css({'background-color':'#3c6b09'});
      $(".a_site").css({'background-color':'#3c6b09'});
      $(".b_site").css({'background-color':'#3c6b09'});
      $(".c_site").css({'background-color':'#3c6b09'});
      $(".wood_site").css({'background-color':'#3c6b09'});
      $(".private_site").css({'background-color':'#4eacf9'});
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
          if (i=='private_site') {
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

    $(".bt_next").click(function(){
      var room = [];
      var check_date = [];
      var check_num = [];
      var charge = [];

      var checkbox = $("input:checkbox[class = check_room]:checked");
      var checkbox_num = $("input:checkbox[class = check_room]:checked").length;

      var session_date = $(".set_day").text().substring($(".set_day").text().indexOf(":")+1);
      var year = session_date.substring(1, session_date.indexOf("년"));
      var month = session_date.substring(session_date.indexOf("년")+1, session_date.indexOf("월"));
      var day = session_date.substring(session_date.indexOf("월")+1, session_date.indexOf("일"));

      var now = new Date(year,month-1,day);
      var today = new Date();
      var nowYear = today.getFullYear();
      var nowMonth = today.getMonth();
      var nowday = today.getDate();
      var check_today = new Date(nowYear,nowMonth,nowday);

      if (now<check_today) {
        alert("지난 날은 예약이 불가합니다!");
        return false;
      }

      if (checkbox_num==0) {
        alert("객실을 선택해 주세요!");
        return false;
      }
      checkbox.each(function(i){
        var tr = checkbox.parent().parent().eq(i);
        var th = tr.children();

        room.push(th.eq(1).text());

        charge.push(th.eq(6).text());

        check_date.push($("select[class='select_date:"+th.eq(1).text()+"'] option:selected").text());

        check_num.push($("select[class='select_num:"+th.eq(1).text()+"'] option:selected").text());
      });

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
          var alert_text = "(*성수기 2022.7.22~8.21)\n해당 날짜의 각사이트는 성수기 비용을 추가하여,\n1만원씩 추가입금바랍니다.\n(결제정보와 차이가 있습니다.)";

          alert(alert_text);

          sessionStorage.setItem('room', JSON.stringify(room));
          sessionStorage.setItem('charge', JSON.stringify(charge));
          sessionStorage.setItem('check_date', JSON.stringify(check_date));
          sessionStorage.setItem('check_num', JSON.stringify(check_num));
          sessionStorage.setItem('date', $(".set_day").text().substring($(".set_day").text().indexOf(":")+1));

          location.href = 'reserve2.html';
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
