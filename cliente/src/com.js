function Com(){

	this.obtenerPartidas = function(){
	  $.getJSON("/obtenerPartidas",function(data){          
	        listaPartidas(data);
	  });
	}
	this.loginUsuario=function(email,clave){
	  //var id=$.cookie("id");
	  limpiar();
	  $.ajax({
	    type:'POST',
	    url:'/login/',
	    data:JSON.stringify({email:email,password:clave}),
	    success:function(data){
	      if (data.email==""){
	        //mostrarRegistro();
	        console.log("INICIANDO SESION "+email+" "+clave);
	        mostrarLogin();
	        mostrarAviso("Email o contraseña incorrectos");
	        //mostrarAviso("Usuario o clave incorrectos");
	      }else{
	        

	        //mostrarIniciarPartida();
	        mostrarIniciarPartida(data);

	        $.cookie("usr",JSON.stringify(data));
	        //mostrarInfoJugador();
	        //socket.emit("listo",data._id);
	       }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}
	this.registroUsuario = function(nombre,clave){
	  //var id=$.cookie("id");

	  $.ajax({
	    type:'POST',
	    url:'/registro/',
	    data:JSON.stringify({email:nombre,password:clave}),
	    success:function(data){
	      if (data.email==undefined){
	        mostrarRegistro();
	        mostrarAviso("Dirección de email inventada o el usuario ya existe");
	        //mostrarSolicitarReenvioMail();
	      }
	      else{        
	         mostrarLogin();
	         mostrarAviso("Te hemos enviado un email para confirmar tu cuenta");
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}


	this.eliminarUsuario=function(){
	  var usr=JSON.parse($.cookie("usr"));
	  $.ajax({
	    type:'DELETE',
	    url:'/eliminarUsuario/'+usr._id,//$.cookie("uid"),
	    data:'{}',
	    success:function(data){
	      if (data.resultados==1)
	      {
	        //reset();

	        console.log("Pasamos a eliminar resultados");
	        
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}
	this.eliminarResultados=function(){
	  var usr=JSON.parse($.cookie("usr"));
	  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+usr.email);
	  $.ajax({
	    type:'DELETE',
	    url:'/eliminarResultados/'+usr.email,//$.cookie("uid"),
	    data:'{}',
	    success:function(data){
	      if (data.resultados==1)
	      {
	        reset();
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

	this.srvComprobarUsuario = function(){
		console.log("probando usuario");
	  if ($.cookie("usr")!=undefined){

	    var usr=JSON.parse($.cookie("usr"));
	    console.log(usr.email);
	    var id=usr._id;
	    //que hace esto?¿?
	    $.getJSON("/comprobarUsuario/"+id,function(usr){ 
	      if (usr.email==''){
	      	console.log("USR.EMAIL VACIO")
	        mostrarLogin();
	        borrarCookie();
	      }
	      else{
	      	console.log("EN EL NAVEGADOR ESTA LA COOKIE, POR ESO MUESTRO EL FORMULARIO DE ENTRAR PARTIDA "+usr.email)
	        mostrarIniciarPartida(usr);
	      }
	    });
	  }else{
	  	console.log("MUESTRO LOGIN");
	    mostrarLogin();
	  }
	}

	this.obtenerResultados=function(){
	  var uid;
	  if ($.cookie("usr")!=undefined){
	    var usr=JSON.parse($.cookie("usr"));
	    uid=usr._id;
	  }
	  if (uid!=undefined){
	    $.getJSON("/obtenerResultados/"+uid,function(data){           
	        mostrarResultados(data);
	    });
	  }
	  else
	    mostrarAviso("Debes iniciar sesión");
	}


	this.actualizarUsuario=function(oldpass,newpass,newpass2,nick){
	  console.log("Estoy en com con toda la info de antes");
	  var usr=JSON.parse($.cookie("usr"));
	  console.log(usr);
	  var nivel=usr.nivel;
	 $.ajax({
	    type:'PUT',
	    url:'/actualizarUsuario',
	    data:JSON.stringify({uid:usr._id,email:usr.email,nick:nick,oldpass:oldpass,newpass:newpass,newpass2:newpass2}),
	    success:function(data){
	      if (data.email==undefined){
	        mostrarAviso("Datos incorrectos, vuelva a intentarlo");
	      }
	      else{
	        $.cookie("usr",JSON.stringify(data));
	        limpiar();
	        mostrarActualizarEliminar();
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

}







