function mostrarLogin(){
  //borrarLogin();
  limpiar();
  //mostrarIntro();
  var cadena='<div class="container" id="login"><div class="mainbox col-md-6 col-md-offset-3">';
  cadena=cadena+'<h2 id="cabeceraP">Inicio de sesión</h2><div id="ig1" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Escribe tu email"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" type="password" class="form-control" name="password" placeholder="Escribe tu clave"></div></div></div>';

  //$('#control').append('<p id="login"><h2 id="cabeceraP">Inicio de sesión</h2><input type="email" id="email" class="form-control" placeholder="introduce tu email" required><input type="password" id="clave" class="form-control" placeholder="introduce tu clave" required></p>');
  $('#cabecera').append(cadena);
  $('#cabecera').append('<p id="nombreBtn"><button type="button" id="nombreBtn" class="btn btn-primary btn-md">Iniciar partida</button></p><a href="#" id="refRecordar">Registrar usuario</a>');//' <a href="#" id="refRegistro" onclick="mostrarRegistro();">Registrar usuario</a>');
  $('#cabecera').append('<h4 id="info"><span class="label label-warning"></span></h4>');
  $('#email').blur(function() {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(this.value) ) 
    {
      $('#nombreBtn').on('click',function(){
        var nombre=$('#email').val();
        var clave=$('#clave').val();
        //$('#nombre').remove();
        $('#login').remove();
        $('#nombreBtn').remove();   
        loginUsuario(nombre,clave);
      });
    }
    else {
      mostrarAviso("Debe ser una dirección de email");
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
  //borrarLogin();
  limpiar();

//  $('#home').append('<p id="cabecera"><h2 id="cabeceraP">Registro de usuarios</h2><input type="email" id="email" class="form-control" placeholder="introduce tu email"><input type="password" id="clave" class="form-control" placeholder="introduce tu clave"></p>');
var cadena='<div class="container" id="login"><div class="mainbox col-md-6 col-md-offset-3">';
  cadena=cadena+'<h2 id="cabeceraP">Nuevo usuario</h2><div id="ig1" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Escribe tu email"></div>';
  cadena=cadena+'<div id="ig12" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email2" type="text" class="form-control" name="email" placeholder="Repite el email"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" type="password" class="form-control" placeholder="Escribe tu clave"></div></div></div>';

  //$('#control').append('<p id="login"><h2 id="cabeceraP">Inicio de sesión</h2><input type="email" id="email" class="form-control" placeholder="introduce tu email" required><input type="password" id="clave" class="form-control" placeholder="introduce tu clave" required></p>');
  $('#cabecera').append(cadena);
  $('#cabecera').append('<button type="button" id="nombreBtn" class="btn btn-primary btn-md">Registrar usuario</button>');
  $('#cabecera').append('<h4 id="info"><span class="label label-warning"></span></h4>');
  $('#email2').blur(function() {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    var nombre=$('#email').val();
    var nombre2=$('#email2').val();
    if (testEmail.test(this.value)&&comprobarEmail(nombre,nombre2)) 
    {
        $('#nombreBtn').on('click',function(){  
          var clave=$('#clave').val();      
          $('#nombre').remove();
          $('#nombreBtn').remove();   
          registroUsuario(nombre,clave);
        });
    }
    else {
      mostrarAviso("Debe ser una dirección de email o las direcciones no coinciden");
      //$("#info span").text("Debe ser una dirección de email");
      //alert('failed');
    }
  });
}

function comprobarEmail(cad1,cad2){
  if (cad1==cad2){
    return true;
  }
  else{
    return false;
  }
}

function limpiar(){
  $('#login').remove();
  $('#nombre').remove();
  $('#nombreBtn').remove(); 
  $('#refRecordar').remove();
}

/*
function loginUsuario(nombre,clave){
  //var id=$.cookie("id");

  $.ajax({
    type:'POST',
    url:'/login/',
    data:JSON.stringify({email:nombre,password:clave}),
    success:function(data){
      if (data.email==""){
        //mostrarRegistro();
        mostrarLogin();
        //mostrarAviso("Usuario o clave incorrectos");
      }
      else{
        console.log('INICIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        console.log('el usuario ha iniciado la sesión');
        console.log("CONTROL_LOGIN: "+data.email+" "+data);

        cliente=new Cliente(data._id,data.email);
        nombrePartida();
        obtenerPartidas();
        //$.cookie("usr",JSON.stringify(data));
        //mostrarInfoJugador();
        //socket.emit("listo",data._id);
       }
      },
    contentType:'application/json',
    dataType:'json'
  });
}
*/
/*
function registroUsuario(nombre,clave){
  //var id=$.cookie("id");

  $.ajax({
    type:'POST',
    url:'/registro/',
    data:JSON.stringify({email:nombre,password:clave}),
    success:function(data){
      if (data.email==undefined){
        mostrarRegistro();
        
      }else{        
         mostrarLogin();
      }
    },
    contentType:'application/json',
    dataType:'json'
  });
}*/
/*
function obtenerTodos(datos){
  var misDatos=(_.sortBy(datos,'puntos')).reverse();
  var cadena="<table id='table' class='table table-bordered table-condensed table-striped bg4'><thead><tr><th>Nombre</th><th>Fecha</th><th>Nivel</th><th>Puntos</th></tr></thead>";
  cadena=cadena+'<tbody>';
  for(var i=0;i<misDatos.length;i++){
      var fecha=new Date(misDatos[i].fecha);
      var strFecha=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()+'  '+fecha.getHours()+':'+fecha.getMinutes();
      var nombre=misDatos[i].email.substr(0,misDatos[i].email.indexOf('@'));
      cadena=cadena+"<tr class='data'><td>"+nombre+"</td><td>"+strFecha+"</td><td> "+misDatos[i].nivel+"</td>"+"</td><td>"+misDatos[i].puntos+"</td></tr>";      
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
  }),'puntos');

  var misDatos=nDatos.reverse();  
  var cadena="<table class='table table-bordered table-condensed table-striped bg4'><tr><th>Nombre</th><th>Fecha</th><th>Nivel</th><th>Puntos</th></tr>";
  for(var i=0;i<misDatos.length;i++){ 
      var fecha=new Date(misDatos[i].fecha);
      var strFecha=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()+'  '+fecha.getHours()+':'+fecha.getMinutes();
      var nombre=misDatos[i].email.substr(0,misDatos[i].email.indexOf('@'));
      cadena=cadena+"<tr><td>"+nombre+"</td><td>"+strFecha+"</td><td> "+misDatos[i].nivel+"</td>"+"</td><td>"+misDatos[i].puntos+"</td></tr>";      
    }
    cadena=cadena+"</table>";
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
  var nCol=_.sortBy(datos,'puntos');
  var nuevaCol=nCol.reverse(); 
  var cadena="<table class='table table-bordered table-condensed table-striped bg4'><tr><th>Puesto</th><th>Nombre</th><th>Fecha</th><th>Nivel</th><th>Puntos</th></tr>";
  for(var i=0;i<tope;i++){ 
      var fecha=new Date(nuevaCol[i].fecha);
      var strFecha=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()+'  '+fecha.getHours()+':'+fecha.getMinutes();
      var nombre=nuevaCol[i].email.substr(0,nuevaCol[i].email.indexOf('@'));
      cadena=cadena+"<tr><td>"+(i+1)+"</td><td>"+nombre+"</td><td>"+strFecha+"</td><td> "+nuevaCol[i].nivel+"</td>"+"</td><td>"+nuevaCol[i].puntos+"</td></tr>";      
    }
    cadena=cadena+"</table>";
  return cadena;
}
*/