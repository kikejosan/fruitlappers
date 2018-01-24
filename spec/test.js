var request=require("request");

var _=require("underscore");
var url='http://localhost:5000/';
//var url="http://161.67.8.34:5000/
var socket=require('socket.io-client')(url);
var socket2=require('socket.io-client')(url);
//socket=io.connect(url);
var ancho = 100;
var alto = 100;

console.log("===========================================")
console.log(" Pruebas SpaceChallenge - Flujo normal");
console.log(" url="+url);

socket.on('connect',function(){
        console.log("1. Usuario: "+idTest1+" crea la partida "+room);
        socket.emit('room',room,2);
        console.log("2. solicitar configuración partida "+room);
        socket.emit('configuracion', {room:room, ancho:ancho, alto:alto});
});

socket2.on('connect',function(){
        console.log("-- Usuario "+idTest2+" se une a partida "+room);
        socket2.emit('room', room);
        console.log("-- solicitar configuración partida "+room);
        socket2.emit('configuracion', {room:room, ancho:ancho, alto:alto});
        console.log("7/7/7////////7777//////7//7//777");
});


socket.on('coord',function(data){
    if (data.length>0){
            console.log('3. Configuración recibida');
            coord=data;
            socket.emit('nuevoJugador',{room:room,id:idTest1});
    }
});

socket2.on('coord',function(data){
        if (data.length>0){
                console.log('-- Configuración recibida');
                coord=data;
                socket2.emit('nuevoJugador',{room:room,id:idTest2});
        }
});

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
                else if (data.jugadores[jug].id==idTest2){
                        console.log("Usuario "+idTest2+" correcto");
                        veg2=data.jugadores[jug].veggie;
                        console.log("veg2: "+veg2);
                        moverNave2();
                }
                else
                        console.log("5. Coleccion jugadores incorrecta");
        }
        //socket.emit('nuevoJugador',{room:room,id:idTest2});
});

socket.on('final',function(data){
        console.log('Ganador: '+data);
        console.log("========================================== \n")
})

function moverNave1(){
        var puntos=0;
        for(var i=0;i<coord.length;i++){
            //console.log(coord[i].veggie,"-",veg1);
            if (coord[i].veggie==veg1){                
                puntos++;
                console.log("6-"+i," jugador "+idTest1+" se come "+veg1);
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



var coord;
var room='partida'+randomInt(1,1000);
var idTest1=randomInt(1,10000);
var veg1;
var idTest2=idTest1+1;
var veg2;

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
//crearPartida(room);

//localhost:500
