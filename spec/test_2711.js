var request=require("request");

var _=require("underscore");
var url='http://localhost:5000/';
//var url="http://pim-marcos.herokuapp.com/";
//socket=io.connect(url);
var ancho = 100;
var alto = 100;

var coord;
var room='partida'+randomInt(1,1000);
var idTest1;
var veg1;
var idTest2;
var veg2;
var nombreTest1;

var headers={
    //'User-Agent': 'request'
    "User-Agent":"Super Agent/0.0.1",
    'Content-Type' : 'application/x-www-form-urlencoded' 
}

console.log("===========================================")
console.log("Pruebas VeggieRocket - Parte Usuarios")
console.log("1. Crear Usuario")
console.log("2. Obtener key")
console.log("3. Activar Cuenta")
console.log("4. Iniciar Sesión")

function crearUsuario(nombre, email, password){
    var options={
        url:url+'registro',
        method:'POST',
        headers:headers,
        form:{nombre:nombre, email:email, password:password}
    }

    console.log("-------------------------------------------------------------------------------------------");
    console.log("1. Intentar crear el usuario '"+nombre+"' con email '"+email+"' y con clave '"+password+"'");
    console.log("-------------------------------------------------------------------------------------------");

    request(options,function(error,response,body){
        if (!error && response.statusCode==200){
            var jsonResponse = JSON.parse(body) ;
            if (jsonResponse.email!=undefined){
                console.log("Usuario "+jsonResponse.email+" creado correctamente \n");
                obtenerKeyUsuario(email);
            }
            else{
                console.log("El usuario no se pudo registrar \n");
            }
        }
        else{
            console.log(response.statusCode);
        }
    });
}

console.log("HEMOS TERMINADO 1");

function obtenerKeyUsuario(email){
    var options={
        url:url+'obtenerKeyUsuario/'+email+"/123456",
        method:'GET',
        headers:headers
    }

    console.log("---------------------------------------------------------------------------");
    console.log("2. Obtener key usuario "+email);
    console.log("---------------------------------------------------------------------------");

    request(options,function(error,response,body){
        if (!error && response.statusCode==200){
            var jsonResponse = JSON.parse(body) ;
            if (jsonResponse.key!=undefined){
                console.log("Key Usuario es: "+jsonResponse.key);
                activarCuenta(email, jsonResponse.key);
            }
            else{
                console.log("No se pudo obtener la key");
            }
        }
        else{
            console.log(response.statusCode);
        }
    });
}
console.log("HEMOS TERMINADO 2");

function activarCuenta(email, key){
    var options={
        url:url+'confirmarUsuario/'+email+"/"+key,
        method:'GET',
        headers:headers
    }

    console.log("---------------------------------------------------------------------------");
    console.log("3. Confirmar al usuario "+email);
    console.log("---------------------------------------------------------------------------");

    request(options,function(error,response,body){
        if (!error && response.statusCode==200){           
            console.log("El Usuario "+email+" ha sido confirmado");
            iniciarSesion(email, passwordTest);            
        }
        else{
            console.log(response.statusCode);
        }
    });
}

function iniciarSesion(email,password){
    var options={
        url:url+'login',
        method:'POST',
        headers:headers,
        form:{email:email,password:password}
    }

    console.log("---------------------------------------------------------------------------");
    console.log("4. Intento login con el usuario "+emailTest+" con clave "+passwordTest);
    console.log("---------------------------------------------------------------------------");

    request(options,function(error,response,body){
        if (!error && response.statusCode==200){
            var jsonResponse = JSON.parse(body);
            if (jsonResponse.email!=""){
                console.log("Usuario "+jsonResponse.email+" logueado correctamente \n");
                idTest1 = jsonResponse._id;
                nombreTest1 = jsonResponse.nombre;
                actualizarUsuario(jsonResponse.email, passwordTest);
            }
            else{
                console.log("El usuario no se pudo loguear \n");
            }
        }
        else{
            console.log(response.statusCode);
        }
    });
}

function actualizarUsuario(email,password){
    var options={
        url:url+'actualizarUsuario',
        method:'PUT',
        headers:headers,
        form:{email:email, oldpass:password, newpass:'patata'}
    }

    console.log("---------------------------------------------------------------------------");
    console.log("5. Actualización del usuario "+emailTest+" para cambiar la clave "+passwordTest);
    console.log("---------------------------------------------------------------------------");

    request(options,function(error,response,body){
        if (!error && response.statusCode==200){
            var jsonResponse = JSON.parse(body);
            if (jsonResponse.email!=""){
                console.log("Usuario "+jsonResponse.email+" modificado correctamente \n");
                lanzarSocketServ();
            }
            else{
                console.log("El usuario no se pudo modificar \n");
            }
        }
        else{
            console.log(response.statusCode);
        }
    });
}


console.log("===========================================")
console.log(" Pruebas VeggieRocket - Flujo normal");
console.log(" url="+url);

var socket;
var socket2;

function lanzarSocketServ(){
    socket=require('socket.io-client')(url);
    //socket2=require('socket.io-client')(url);

    socket.on('connect',function(){
        console.log("1. Usuario: "+idTest1+" crea la partida "+room);
        socket.emit('room',idTest1, room, 1);
        console.log("2. solicitar configuración partida "+room);
        socket.emit('configuracion', {room:room, ancho:ancho, alto:alto});
    });

    /*socket2.on('connect',function(){
        console.log("-- Usuario "+idTest2+" se une a partida "+room);
        socket2.emit('room', room);
        console.log("-- solicitar configuración partida "+room);
        socket2.emit('configuracion', {room:room, ancho:ancho, alto:alto});
    });*/


    socket.on('coord',function(data){
        if (data.length>0){
            console.log('3. Configuración recibida');
            coord=data;
            socket.emit('nuevoJugador',{room:room,id:idTest1});
        }
    });

    /*socket2.on('coord',function(data){
        if (data.length>0){
            console.log('-- Configuración recibida');
            coord=data;
            socket2.emit('nuevoJugador',{room:room,id:idTest2});
        }
    });*/

    socket.on('faltaUno',function(data){
        console.log("4. estado del juego: falta un jugador");
        //socket.emit('nuevoJugador',{room:room,id:idTest2});
    });

    socket.on('aJugar',function(data){
            console.log("5. estado del juego: a jugar");
            console.log(data.jugadores);
            for(var jug in data.jugadores){
                if (data.jugadores[jug].id==idTest1){
                    console.log("Usuario "+idTest1+" correcto");
                    veg1=data.jugadores[jug].veggie;
                    console.log("veg1: "+veg1);
                    moverNave1();
                }
                /*else if (data.jugadores[jug].id==idTest2){
                    console.log("Usuario "+idTest2+" correcto");
                    veg2=data.jugadores[jug].veggie;
                    console.log("veg2: "+veg2);
                    moverNave2();
                }*/
                else
                    console.log("5. Coleccion jugadores incorrecta");
            }
            //socket.emit('nuevoJugador',{room:room,id:idTest2});
    });

    socket.on('final',function(data){
        console.log('Ganador: '+data);
        console.log("========================================== \n");
        eliminarUsuario(emailTest);
        socket.close();
    });
}

function eliminarUsuario(email){
    var options={
        url:url+'deleteUser',
        //url:url+'eliminarUsuario/'+idTest1,
        method:'POST',
        //method:'DELETE',
        headers:headers,
        form:{email:email}
    };

    console.log("---------------------------------------------------------------------------");
    console.log("7. Eliminación del usuario '"+nombreTest1+"' con email '"+email+"'");
    console.log("---------------------------------------------------------------------------");

    request(options,function(error,response,body){
        if (!error && response.statusCode==200){
                console.log("Usuario eliminado correctamente \n");
        }
        else{
            console.log(response.statusCode);
        }
    });
}

function moverNave1(){
    var puntos=0;
    for(var i=0;i<20;i++){
        //console.log(coord[i].veggie,"-",veg1);
        if (coord[i].veggie==veg1){                
            puntos++;
            console.log("6-"+i," jugador "+nombreTest1+" se come "+veg1);
            socket.emit('posicion',room,{'id':idTest1,"x":coord[i].x,"y":coord[i].y,"puntos":puntos});
        }
    }
}

function moverNave2(){
    var puntos=0;
    for(var i=10;i<coord.length;i++){
        if (coord[i].veggie==veg2){                
            puntos++;
            console.log("6-"+i," jugador "+idTest2+" se come "+veg2);
            socket.emit('posicion',room,{'id':idTest2,"x":coord[i].x,"y":coord[i].y,"puntos":puntos});
        }
    }
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function cerrarSockets(){
    socket.close();
    socket2.close();
}
//crearPartida(room);
var emailTest = "patata@patata.es";
var passwordTest = "123456";
crearUsuario("Pataton", emailTest, passwordTest);

//localhost:500
