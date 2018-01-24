var game;
var juego;
var finJuego;
var cliente;

function borrar(){
	$('#nombre').remove();
	$('#fotillo').remove();
	$('#partida').remove();
	$('#contenedorPartida').remove();

}

function listaPartidas(lista){
	var cadena;
	for(var i=0;i<lista.length;i++){
		cadena=cadena+"<option>"+lista[i]+"</option>"
	}
	$('#selectorPartidas').append(cadena);

	$('#selbtn').on('click',function(){
	  var nombre=$('#selectorPartidas').val();
	  var num=$('#sel2').val();
	  if (nombre!=""){
		  borrar();
		  cliente.ini(nombre,2);	  
		  cliente.unirmeAPartida();
		  mostrarCanvas(nombre);
	}
	});
}

function obtenerPartidas(){
  $.getJSON("/obtenerPartidas",function(data){          
        listaPartidas(data);
  });
}


function mostrarIntroducirPartida(cliente){
	var cadena;
	cadena ='<div  align="center" class="container-fluid" id="contenedorPartida"> <div class="row"> <div class="col-sm-3"> ';
	cadena = cadena +"<div id='entradaSala'><h3 >Crea tu propia sala</h3>";
	cadena = cadena + "<input type='text' class='form-control' id='nombre'><br>";
	cadena = cadena + "<input type='submit' id='btn'  class='btn btn-primary active' value='Iniciar'/><br><br><br>";
	cadena = cadena +"<div class='form-group'>    <h3  for='selectorPartidas'>Unirme a partida...</h3> <select class='form-control'  id='selectorPartidas'>    </select>   </div>";
	cadena = cadena + "<input type='submit' id='selbtn'  class='btn btn-primary active' value='Unirme'/>";
	cadena = cadena + "<br><br><h7> HELP: Introduce el nombre de la sala a la que te quieres unir.</h7>";
	cadena = cadena + '<br><br><br><h3 align="center">Jugadores:</h3> <select class="form-control" id="sel2"><option>1</option><option>2</option></select> </div></div>';
	cadena = cadena + ' <div id="fotillo" class="col-sm-9"><img  width="700" height="600" src="cliente/recursos/frutasAsesinas.jpg" alt="Image one" /></div></div>';
	$('#partida').append(cadena);

	mostrarNavLogoutP(cliente);
	$('#btn').on('click',function(){
		var nombre = $('#nombre').val();
		var num=$('#sel2').val();
		console.log(nombre);
		if(nombre!=""){
			borrar();
			console.log("voy a crear el cliente en la sala "+nombre);
			cliente.ini(nombre,num);
			mostrarCanvas(nombre);
		}
		
	});

}

function mostrarCanvas(nombreSala){
	mostrarNavLogout(cliente);
	var cadena = "<h5>Instrucciones de FruitLappers</h5>"; 
	var cadena = cadena + "<p> Instrucciones de juego: Se te ha asignado una fruta, has de recoger 5 de ese tipo. El TIPO es SORPRESA, ADELANTE!!!</p>"; 
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'cabecera');
	juego=new Juego();
	finJuego = new FinJuego();

	$('#cuerpo').append(cadena);
	game.state.add('Game',juego);
	game.state.add("FinJuego",finJuego);
	$('#nombreSala').text(nombreSala);
	//document.getElementById('espacioJuego').src = "https://www.blogdehumor.com/wp-content/2015/05/manzana-asesina.jpg";//"cliente/recursos/chuck.jpg";
	
}



function mostrarIniciarPartida(usr){
	console.log("MOSTRANDO INICIAR PARTIDA "+usr._id+" - "+usr.email);
    cliente=new Cliente(usr._id,usr.email);
    mostrarIntroducirPartida(cliente);
    com.obtenerPartidas();
    
}