var persistencia=require("./persistencia.js");
var cf=require("./cifrado.js");
var moduloEmail=require("./email.js");
var ObjectID=require("mongodb").ObjectID;
var _=require('underscore');

function Juego(){
	this.partidas = {};
	this.usuarios = {};
	console.log("creando persis");
	this.persistencia = new persistencia.Persistencia();
	console.log("terminado persis" + this.persistencia);
	this.obtenerUsuario = function(id){
		return _.find(this.usuarios,function(usu){
	        return usu._id==id;
	    });
	}
	this.iniciarSesion=function(email,pass,callback){
        var ju=this;
        var passCifrada=cf.encrypt(pass);
        this.persistencia.encontrarUsuarioCriterio({email:email,pass:passCifrada},function(usr){
            if (!usr){
                callback({'email':''});
            }
            else{
                ju.usuarios[usr._id]=usr; 
                console.log("Juego_iniciarSesion: HOLA SOY "+usr._id);
                callback(usr);
            }
        });
    }
    this.registrarUsuario=function(email,pass,callback){
        var ju=this;
        var passCifrada=cf.encrypt(pass);
        var key=(new Date().valueOf()).toString();

        this.persistencia.encontrarUsuarioCriterio({email:email},function(usr){
            if(!usr){
            	//ju.persistencia.insertarUsuario({email});
                console.log("	Email = "+email+"\n     key = "+key);
                ju.persistencia.insertarUsuario({email:email,pass:passCifrada,key:key,confirmada:false, nick:"nick_serie"},function(usu){
                    callback({email:'ok'});
                    console.log("Espero la confirmacion de "+usu.email);
 					moduloEmail.enviarEmail(usu.email,usu.key,"Confirme su correo en este enlace: ");
            	});
            }
            else{
                callback({email:undefined});
            }
 	    });
    }
    this.eliminarUsuario=function(uid,callback){
        var json={'resultados':-1};
		if (ObjectID.isValid(uid)){
			this.persistencia.eliminarUsuario(uid,function(result){
	            if (result.result.n==0){
	                console.log("No se pudo eliminar de usuarios");
	            }
	            else{
	                json={"resultados":1};
	                console.log("Usuario eliminado de usuarios");
	                callback(json);
	            }
	        }); 
		}
	    else{
	    	callback(json);
	    }
    }
    this.eliminarResultados=function(email,callback){
    	console.log("()()(()())()))()))())()()()()()))()()()))()()())( "+email);
        var json={'resultados':-1};
		if (true){
			this.persistencia.eliminarResultados(email,function(result){
                json={"resultados":1};
                console.log("Resultados eliminados");
                callback(json);
	            
	        }); 
		}
	    else{
	    	callback(json);
	    }
    }


    this.actualizarUsuario=function(nuevo,callback){
		//this.comprobarCambios(nuevo);
		//var usu=this;
		var oldC=cf.encrypt(nuevo.oldpass);
		var newC=cf.encrypt(nuevo.newpass);
		var pers=this.persistencia;
		var nick=nuevo.nick;

		this.persistencia.encontrarUsuarioCriterio({email:nuevo.email,pass:oldC},function(usr){
			if(usr){
				if (nuevo.newpass!="" && nuevo.newpass==nuevo.newpass2){
					usr.pass=newC;
				}
				//console.log("nick: "+nick+" "+nuevo.nick);
				if (nuevo.nick!=""){
					usr.nick=nick;
				}

		        pers.modificarColeccionUsuarios(usr,function(nusu){
		               console.log("Usuario modificado");
		               callback(usr);
		        });
		    }
		    else{
		    	callback({email:undefined});	
		    }
		});
	}



	this.nuevaPartida = function(id, nombre, num, callback){
		if (this.usuarios[id]!=null){
			if (this.partidas[nombre]==null){
				this.partidas[nombre]=new Partida(nombre,num,this);
			}
			callback(nombre);
			//socket.join(nombre);
		}
	}

	this.unirme=function(nombre,callback){
		callback(nombre);
	}

	this.obtenerPartidas=function(callback){
		var lista=[];
		for (var key in this.partidas) {
		    if (this.partidas[key].estado.esInicial()){
		    	lista.push(key);
		    }
		}
		callback(lista);
	}

	this.confirmarUsuario=function(email,key,callback){
    	var pers=this.persistencia;
        this.persistencia.confirmarCuenta(email,key,function(usr){
	        if (!usr){
	            callback(undefined);
	        }else{
                usr.confirmada=true;
                console.log("persistencia = "+pers);
                pers.modificarColeccionUsuarios(usr,function(result){
                    callback(usr);
                });
		    }
	    });
	}

	this.agregarResultado=function(data){
        //buscar el email de data.id
        this.persistencia.insertarResultado(data, function(res){
            console.log("Resultado insertado");
        });
    }
    this.obtenerResultados=function(callback){
    	this.persistencia.encontrarTodosResultados(function(res){
       		callback(res);
        });
    }

	this.obtenerKeyUsuario=function(email,adminKey,callback){ //ESTO PARA QUE ES?
        if (adminKey=="admin"){
            this.persistencia.encontrarUsuarioCriterio({email:email,confirmada:false},function(usr){
                if (!usr){
                    callback({key:""});
                }else{
                    callback({key:usr.key});
                }
            });
        }else{
            callback({key:""});
        }
    }

	/*CUERPO MAIN DE JUEGO*/

	/*this.persistencia.conectar(function(db){
        console.log("conectado a la base de datos");
    });*/
    this.conectar=function(callback){
		this.persistencia.conectar(function(){
			callback("conectado a la base de datos");
		});
	}
	this.cerrar=function(){
		this.persistencia.cerrar();
	}


}

function Partida(nombre,num,juego){

	this.juego=juego;
	this.estado = new Inicial();
	this.numJugadores=num;
	this.jugadores = {};
	this.veggie = 16;
	this.numeroFrutas = 5;
	this.socket;
	this.coord = [];
	this.nombre=nombre;
	this.io;
	this.callback;
	this.ship='ship';
	this.fecha = new Date();
	this.iniciar = function(callback){
		callback('coord',this.coord);
	}

	this.agregarJugador = function(id,callback){
		console.log("Partida: agregando jugador pichii!! "+id)
		this.callback=callback;
		this.estado.agregarJugador(id,this);
	}

	this.puedeAgregarJugador=function(id){
		this.jugadores[id] = new Jugador(id,this.veggie);
		this.veggie++;
		if(Object.keys(this.jugadores).length>=this.numJugadores){
			this.estado = new Jugar();
			this.enviarAJugar();
		}
		else{
			console.log("puedeAgregarJugador: Falta uno muchacho!");
			this.enviarFaltaUno();
		}
	}

	this.enviarFaltaUno = function(){
		this.callback('faltaUno',null);
	}

	this.enviarAJugar = function(){
		this.callback('aJugar',this.jugadores);
	}

	this.movimiento = function(data,callback){
		//this.socket=socket;
		this.callback=callback;
		this.estado.movimiento(data,this);
	}

	this.puedeMover=function(data){
		if (data.puntos>=this.numeroFrutas){
			
			this.estado=new Final();
			this.enviarFinal(data.id);
			console.log(juego);
			this.juego.agregarResultado({"usuario":data.id, "nivel":this.numeroFrutas, "tiempo":data.tiempo, email:data.email,fecha:this.fecha.getTime()});
		}else{
			this.callback('movimiento',data);
		}
	}

	this.enviarFinal = function(idGanador){
		this.callback('final',idGanador);
	}


	this.volverAJugar=function(callback){
		this.callback=callback;
		this.estado.volverAJugar(this);
	}

	this.reiniciar=function(){
		this.jugadores={};
		this.coord=[];
		this.x=200;
		this.ini();
		this.estado=new Inicial();
		this.callback('reset',this.coord);
		
	}

	this.ini=function(){
        this.veggie=randomInt(1,35);
        var otra=this.veggie+1;
        //console.log(this.veg,"--",otra);
        for(var i=0;i<20;i++){
            this.coord.push({'veg':this.veggie,'x':randomInt(10,770),'y':randomInt(25,570)});
        }
        for(var i=0;i<20;i++){
            this.coord.push({'veg':otra,'x':randomInt(10,770),'y':randomInt(25,570)});
        }
        for(var i=0;i<50;i++){
            var alea=randomInt(0,otra-2)
            this.coord.push({'veg':alea,'x':randomInt(10,770),'y':randomInt(25,570)});
        }
        for(var i=0;i<50;i++){
            var alea=randomInt(otra++,35);
            this.coord.push({'veg':alea,'x':randomInt(10,770),'y':randomInt(25,570)});
        }
        
    }

    this.ini();


}


function Jugador(id,veggie){
	this.id=id;
	this.x=randomInt(100,400);
	this.y=randomInt(100,400);
	this.veggie=veggie;
	this.ship;

}




function Inicial(){
	this.esInicial = function(){
		return true;
	}
	this.esJugar = function(){
		return false;
	}
	this.esFinal = function(){
		return false;
	}
	this.agregarJugador = function(id,juego){
		console.log("Inicial agregando jugador "+ id);
		juego.puedeAgregarJugador(id);
	}
	this.movimiento = function(){
		console.log('No se puede mover la nave');
	}
}

function Jugar(){
	this.esInicial = function(){
		return false;
	}
	this.esJugar = function(){
		return true;
	}
	this.esFinal = function(){
		return false;
	}
	this.puedeAgregarJugador=function(id,juego){
		if(Object.keys(this.jugadores).length>=2){
			console.log("No se pueden agregar jugadores");

		}
	}
	
	this.movimiento = function(data,juego){
		juego.puedeMover(data);
	}
	
	this.volverAJugar=function(juego){
  		juego.reiniciar();
	}


}



function Final(){
	this.esInicial = function(){
		return false;
	}
	this.esJugar = function(){
		return false;
	}
	this.esFinal = function(){
		return true;
	}
	this.agregarJugador=function(juego){
		console.log('No se puede agregar nuevo jugador');
	}	
	this.puedeAgregarJugador=function(id,juego){
		if(Object.keys(this.jugadores).length>=2){
			console.log("ESTOY FINALIZADO NO PUEDO HACER NADA")
		}
	}
	this.movimiento = function(){
		console.log('No se puede mover la nave');
	}


	this.volverAJugar=function(juego){
  		juego.reiniciar();
	}


}


function randomInt(low, high){
   	return Math.floor(Math.random() * (high - low) + low);
}


module.exports.Juego=Juego;