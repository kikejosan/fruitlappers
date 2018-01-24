function comprobarUsuario(){
  limpiar();
  eliminarGame();
  com.srvComprobarUsuario();
  mostrarNavLogin();
}



function mostrarLogin(){
  //borrarLogin();
  limpiar();
  //mostrarIntro();
  var cadena='<div class="container" id="login"><div class="mainbox col-md-6 col-md-offset-3">';
  cadena=cadena+'<h5 id="cabeceraP" align=center>Inicio de sesión</h5><div id="ig1" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Escribe tu email"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" type="password" class="form-control" name="password" placeholder="Escribe tu clave"></div></div></div>';

  //$('#control').append('<p id="login"><h2 id="cabeceraP">Inicio de sesión</h2><input type="email" id="email" class="form-control" placeholder="introduce tu email" required><input type="password" id="clave" class="form-control" placeholder="introduce tu clave" required></p>');
  $('#partida').append(cadena);
  var botonCentrado = '<div class="container" id="contenedorHola"><div align=center class="mainbox col-md-6 col-md-offset-3"><button type="button" align=center id="nombreBtn" style="background-color:#FF0000" class="btn btn-primary btn-md">Iniciar sesion</button><h4 id="info"><span class="label label-warning"></span></h4></div></div>';
  //$('#partida').append('<button type="button" align=center id="nombreBtn" style="background-color:#FF0000" class="btn btn-primary btn-md">Iniciar sesion</button>');
  //$('#partida').append('<h4 id="info"><span class="label label-warning"></span></h4>');
  $('#partida').append(botonCentrado);
  $('#email').blur(function() {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(this.value) ) 
    {
      $('#nombreBtn').on('click',function(){
        var nombre=$('#email').val();
        var clave=$('#clave').val();
        //$('#nombre').remove();
        com.loginUsuario(nombre,clave);
        $('#login').remove();
        $('#nombreBtn').remove();   
        
      });
    }
    else {
      mostrarAviso("Email o contraseña incorrectos");
      //mostrarAviso("Debe ser una dirección de email");
      //$("#info span").text("Debe ser una dirección de email");
      //alert('failed');
    }
  });
  $('#refRecordar').on('click',function(){
        //var nombre=$('#email').val();        
        //enviarClave(nombre);
        mostrarRegistro();
      });
}

function mostrarRegistro(){
  console.log("VOY A MOSTRAR EL REGISTRO");
  //borrarLogin();
  limpiar();

//  $('#home').append('<p id="cabecera"><h2 id="cabeceraP">Registro de usuarios</h2><input type="email" id="email" class="form-control" placeholder="introduce tu email"><input type="password" id="clave" class="form-control" placeholder="introduce tu clave"></p>');
  var cadena='<div class="container" id="login"><div class="mainbox col-md-6 col-md-offset-3">';
  cadena=cadena+'<h5 align=center id="cabeceraP">Regístrate!!</h5><div id="ig1" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" style="font-size:2em;" placeholder="Escribe tu email"></div>';
  cadena=cadena+'<div id="ig12" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email2" type="text" class="form-control" name="email" style="font-size:2em;" placeholder="Repite el email"></div>';
  cadena=cadena+'<div style="font-size:1em;" id="ig2" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" style="font-size:2em;" type="password" class="form-control" placeholder="Escribe tu clave"></div></div></div>';
  console.log("Preparados los items "+cadena);
  //$('#control').append('<p id="login"><h2 id="cabeceraP">Inicio de sesión</h2><input type="email" id="email" class="form-control" placeholder="introduce tu email" required><input type="password" id="clave" class="form-control" placeholder="introduce tu clave" required></p>');
  cadena = cadena+'<div class="container"><div class="mainbox col-md-6 col-md-offset-3"></div></div>';
  $('#cabecera').append(cadena);
  console.log("Añadido a cabecera");
  var botonCentrado = '<div class="container" id="contenedorHola"><br><div align=center class="mainbox col-md-6 col-md-offset-3"><button type="button" id="nombreBtn" class="btn btn-primary btn-md">Registrar usuario</button><h4 id="info"><span class="label label-warning"></span></h4></div></div>';
 // $('#cabecera').append('<button type="button" id="nombreBtn" class="btn btn-primary btn-md">Registrar usuario</button>');
  //$('#cabecera').append('<h4 id="info"><span class="label label-warning"></span></h4>');
    $('#cabecera').append(botonCentrado);
    console.log("Añadido a cabecera");

  $('#email2').blur((function() {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    var nombre=$('#email').val();
    var nombre2=$('#email2').val();
    if (testEmail.test(this.value)&&comprobarEmail(nombre,nombre2)) 
    {
        $('#nombreBtn').on('click',function(){  
          var clave=$('#clave').val();      
          $('#nombre').remove();
          $('#nombreBtn').remove(); 

          com.registroUsuario(nombre,clave);

        });
    }
    else {
      console.log("ALGO HA IDO MUY MAL");
      //mostrarAviso("Debe ser una dirección de email o las direcciones no coinciden");
      //$("#info span").text("Debe ser una dirección de email");
      //alert('failed');
    }
  }));
}


function mostrarNavLogin(){
  var strLogin='<li><a href="#" onclick="mostrarRegistro();"><span class="glyphicon glyphicon-user-add"></span> Registrar usuario</a></li>';
  strLogin=strLogin+'<li><a href="#" onclick="mostrarLogin();"><span class="glyphicon glyphicon-log-in"></span> Iniciar sesión</a></li>';
  $('#inicio li').remove();
  $('#inicio').append(strLogin);
}
function mostrarNavLogout(cliente){

  var strLogout='<li><a href="#" onclick="eliminarGame()"><span class="glyphicon glyphicon-off"></span> Abandonar partida</a></li>';
  strLogout = strLogout + '<li><a href="#" onclick=""><span class="glyphicon glyphicon-user"></span>'+cliente.email+'</a></li>';
  strLogout = strLogout + '<li><a href="#" onclick="reset();"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>';
  $('#inicio li').remove();
  $('#inicio').append(strLogout);
}
function mostrarNavLogoutP(cliente){

  var strLogout='';
  strLogout = strLogout + '<li><a href="#" onclick="mostrarActualizarEliminar();"><span class="glyphicon glyphicon-user"></span>'+cliente.email+'</a></li>';
  strLogout = strLogout + '<li><a href="#" onclick="reset();"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>';
  $('#inicio li').remove();
  $('#inicio').append(strLogout);
}

function reset(){
  limpiar();
  eliminarGame();  
  eliminarCookies(); 
  comprobarUsuario();
}

function eliminarCookies(){
  $.removeCookie("usr");
  window.localStorage.clear();
}

function eliminarGame(){
  $('#contenedorPartida').remove();
  if (game && game.state!=null) {
    game.destroy();
    location.reload();
  }
}


function comprobarEmail(cad1,cad2){
  if (cad1==cad2){
    return true;
  }
  else{
    mostrarAviso("Contraseñas incorrectas");
    return false;
  }
}

function limpiar(){
  $('#login').remove();
  $('#nombre').remove();
  $('#nombreBtn').remove(); 
  $('#contenedorHola').remove();
  $('#refRecordar').remove();
  $('#entradaSala').remove();
  $('#info').remove();
  $('#cabeceraP').remove();
  $('#tab').remove();

}

function borrarCookie(){
  $.removeCookie("usr");
}


function mostrarActualizarEliminar(){

  //borrarLogin();
  limpiar();
  var uid;
  if ($.cookie("usr")!=undefined){
    var usr=JSON.parse($.cookie("usr"));
    uid=usr._id;
  }
  //if ($.cookie('uid')!=undefined)
  if(uid!=undefined)
  {

    //$('#cabecera').append('<div class="container" id="cabeceraP"><div class="mainbox col-md-6 col-md-offset-3"><h2>Actualizar datos</h2><input type="text" id="email" class="form-control" placeholder="Email: '+usr.email+'"><input type="text" id="nombre" class="form-control" placeholder="Nombre: '+usr.nombre+'"><input type="password" id="newpass" class="form-control" placeholder="introduce tu nueva clave">');
    //$('#cabecera').append('<button type="button" id="actualizarBtn" class="btn btn-primary btn-md">Actualizar usuario</button> <button type="button" id="eliminarBtn" class="btn btn-danger btn-md">Eliminar usuario</button></div></div>');
    var cadena = '<div id="cabeceraP" class="bg4" style="padding-bottom:15px;">';
    cadena = cadena + '<h3 style="font-size:5em;" >Actualizar datos del usuario</h3>';
    cadena = cadena + '<table class="table">';
    cadena = cadena + '<tr><td><label>Email: </label></td> <td><label>'+usr.email+'</label></td></tr>';
    cadena = cadena + '<tr><td><label>Nick: </label></td><td><label><input type="text" id="nick" class="form-control" style="font-size:1em;" placeholder="Nick actual: '+usr.nick+'"></td></tr>';
    cadena = cadena + '<tr><td><label>Clave anterior: </label></td><td><label><input type="password" id="oldpass" class="form-control" style="font-size:1em;" placeholder="Clave anterior:"></span></label></td></tr>';
    cadena = cadena + '<tr><td><label>Nueva clave: </label></td><td><label><input type="password" id="newpass" class="form-control" style="font-size:1em;" placeholder="Introduce tu nueva clave"></label></td></tr>';
    cadena = cadena + '<tr><td><label>Repite la nueva clave </label></td><td><label><input type="password" id="newpass2" class="form-control" style="font-size:1em;" placeholder="Repite la nueva clave"></label></td></tr></table> ';
    cadena = cadena + '<p><button style="font-size:1em;" type="button" id="actualizarBtn" class="btn btn-primary btn-md">Actualizar usuario</button> <button style="font-size:1em;" type="button" id="eliminarBtn" class="btn btn-danger btn-md">Eliminar usuario</button></div>';
    cadena = cadena + '<h4 id="info"><span class="label label-warning"></span></h4>';
    $('#cabecera').append(cadena);
    $('#actualizarBtn').on('click',function(){
      var oldpass=$('#oldpass').val();
      var newpass=$('#newpass').val();
      var newpass2=$('#newpass2').val();
      var nick=$('#nick').val();
      //console.log("datos: "+oldpass+" "+newpass+" "+newpass2+" "+nick);


      if (oldpass=="" && newpass=="" && newpass2=="" && nick==""){
        mostrarAviso("No hay nada que modificar");
      }
      else{
        
        console.log("CAMBIANDO USR ::::: "+oldpass+" - "+newpass+" - "+newpass2+" - "+nick);
        com.actualizarUsuario(oldpass,newpass,newpass2,nick);


      }
    });


    $('#eliminarBtn').on('click',function(){
      var oldpass=$('#oldpass').val();
      if (oldpass!=""){
        //var clave=$('#clave').val();
        $('#nombre').remove();
        $('#eliminarBtn').remove(); 
        // if(com.eliminarUsuario()){
        //   com.eliminarResultados();
        // }else{
        //   mostrarAviso("Algo ocurrió con la eliminacion de usuarios");
        // }
        com.eliminarUsuario();
        console.log("HOLAAAAAAAAAAAAA BORRANDO RESULTADOS de UNOOOOOO");
        com.eliminarResultados();


        console.log("DESDE CONTROL TE DIGO QUE HE BORRADO USR AHORA A POR LOS RESULTADOS");
        
      }
      else
        mostrarAviso('Introduce tu clave');
    });
    $("#contenedorPartida").remove();
  }
  else{
    mostrarLogin();
  }
}
function mostrarAviso(cadena){
  $("#info span").text(cadena);
}
function comprobarPass(cad1,cad2){
  if (cad1==cad2){
    return true;
  }
  else{
    return false;
  }
}

function mostrarResultados(datos){
  eliminarGame();
  limpiar();

  //var cadena="<div class='panel panel-default' id='res'><div class='panel-heading'><h4>Resultados</h4></div>";
  //cadena=cadena+"<div class='panel-body'>";
  
  var cadena='<div id="tab" class="bg1"><h3>Resultados</h3><ul class="nav nav-tabs bg4">';
  cadena=cadena+'<li class="active"><a href="#todos" data-toggle="tab">Todos</a></li>'
  cadena=cadena+'<li><a href="#mislogros" data-toggle="tab">Mis logros</a></li>'
  cadena=cadena+'<li><a href="#losmejores" data-toggle="tab">Los mejores</a></li></ul>'
  cadena=cadena+'<div class="tab-content">';
  cadena=cadena+"<div class='tab-pane active' id='todos'>";
  cadena=cadena+obtenerTodos(datos);
  cadena=cadena+'</div>';
  cadena=cadena+"<div class='tab-pane' id='mislogros'>";
  cadena=cadena+obtenerMisLogros(datos);
  cadena=cadena+'</div>';
  cadena=cadena+"<div class='tab-pane' id='losmejores'>";
  cadena=cadena+obtenerLosMejores(datos);
  cadena=cadena+'</div>';
  cadena=cadena+'</div><div class="paging-container" id="demo"> </div>';
  cadena=cadena+'</div>';
  $('#cabecera').append(cadena);   
  mostrarControlPaginas(datos.length); 
}

function mostrarControlPaginas(max){
  Pagination('#demo',{
          itemsCount: max,
          pageSize: 10,
          onPageSizeChange: function (ps) {
            console.log('changed to ' + ps);
          },
          onPageChange: function (paging) {
            //custom paging logic here
            //console.log(paging);
            var start = paging.pageSize * (paging.currentPage - 1),
              end = start + paging.pageSize,
              $rows = $('#table').find('.data');

            $rows.hide();

            for (var i = start; i < end; i++) {
              $rows.eq(i).show();
            }
          }
  });
}
function obtenerTodos(datos){
  var misDatos=(_.sortBy(datos,'tiempo')).reverse();
  var cadena="<table id='table'   class='table table-bordered table-condensed table-striped bg4'><thead><tr class='danger'><th>Nombre</th><th>Fecha</th><th>Tiempo</th><th>Numero Frutas</th></tr></thead>";
  cadena=cadena+'<tbody>';
  for(var i=0;i<misDatos.length;i++){
      var fecha=new Date(misDatos[i].fecha);
      var strFecha=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()+'  '+fecha.getHours()+':'+fecha.getMinutes();
      var nombre=misDatos[i].email.substr(0,misDatos[i].email.indexOf('@'));
      cadena=cadena+"<tr class='data'><td style='font-size:2em;'>"+nombre+"</td><td style='font-size:2em;'>"+strFecha+"</td><td style='font-size:2em;'> "+misDatos[i].tiempo+"</td>"+"</td><td style='font-size:2em;'>"+misDatos[i].nivel+"</td></tr>";      
    }
    cadena=cadena+"</tbody></table>";
  return cadena;
}

function obtenerMisLogros(datos){
  var usr=JSON.parse($.cookie("usr"));
  var miEmail=usr.email;
  //var max=_.max(datos,function(ele){return ele.nivel});
  var nDatos=_.sortBy(_.filter(datos,function(each){
    return each.email==miEmail
  }),'tiempo');

  var misDatos=nDatos.reverse();  
  var cadena="<table id='table'   class='table table-bordered table-condensed table-striped bg4'><thead><tr class='danger'><th>Nombre</th><th>Fecha</th><th>Tiempo</th><th>Numero Frutas</th></tr><thead>";
  cadena=cadena+'<tbody>';
  for(var i=0;i<misDatos.length;i++){ 
      var fecha=new Date(misDatos[i].fecha);
      var strFecha=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()+'  '+fecha.getHours()+':'+fecha.getMinutes();
      var nombre=misDatos[i].email.substr(0,misDatos[i].email.indexOf('@'));
      cadena=cadena+"<tr class='data'><td style='font-size:2em;'>"+nombre+"</td><td style='font-size:2em;'>"+strFecha+"</td><td style='font-size:2em;'> "+misDatos[i].tiempo+"</td>"+"</td><td style='font-size:2em;'>"+misDatos[i].nivel+"</td></tr>";      
    }
    cadena=cadena+"</tbody></table>";
  return cadena;
}

function obtenerLosMejores(datos){
  var usr=JSON.parse($.cookie("usr"));
  var miEmail=usr.email;
  
  // for(var i=0;i<numero;i++){
  //   nuevaCol.push(_.filter(datos,function(ele){
  //     return ele.nivel;
  //   }))
  // }
  var tope;
  if (datos.length<10){
    tope=datos.length;
  }
  else
    tope=10;
  var nCol=_.sortBy(datos,'tiempo');
  var nuevaCol=nCol.reverse(); 
  var cadena="<table id='table' class='table table-bordered table-condensed table-striped bg4'><thead><tr class='danger'><th>Puesto</th><th>Nombre</th><th>Fecha</th><th>Tiempo</th><th>Numero de Frutas</th></tr><thead>";
  cadena=cadena+'<tbody>';
  for(var i=0;i<tope;i++){ 
      var fecha=new Date(nuevaCol[i].fecha);
      var strFecha=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()+'  '+fecha.getHours()+':'+fecha.getMinutes();
      var nombre=nuevaCol[i].email.substr(0,nuevaCol[i].email.indexOf('@'));
      cadena=cadena+"<tr class='data'><td style='font-size:2em;'>"+(i+1)+"</td><td style='font-size:2em;'>"+nombre+"</td><td style='font-size:2em;'>"+strFecha+"</td><td style='font-size:2em;'> "+nuevaCol[i].tiempo+"</td>"+"</td><td style='font-size:2em;'>"+nuevaCol[i].nivel+"</td></tr>";      
    }
    cadena=cadena+"</tbody></table>";
  return cadena;
}