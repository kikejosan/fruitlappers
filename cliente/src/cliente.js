function Cliente(id,email){
	this.num;
	this.socket;
	this.room;
	this.id=id;
	this.veggie;
	//this.coord;
	this.email=email;

	this.cargarConfiguracion = function(){
		this.socket.emit('configuracion',this.room);
	}

	this.unirmeAPartida = function(){
		console.log("ESTOY UNIENDOME EN "+ this.room);
    	this.socket.emit('unirme',this.room);
	};

	this.nuevoJugador=function(){
		console.log("cliente nuevoJugador EMIT!");
		this.socket.emit('nuevoJugador',{room:this.room,id:this.id});
	}

	this.ini=function(room,num){
		this.socket=io.connect();
		this.room=room;
		console.log("this.ini = "+room);
		this.num=num;
		console.log(room);
		console.log(num);
		//this.id=randomInt(1,100000);
		this.lanzarSocketSrv();
	}

	this.reset=function(){
		this.id=randomInt(1,10000);
	};	

	this.enviarPosicion=function(x,y,ang,puntos,tiempo){
    	this.socket.emit('posicion',this.room,{"id":this.id,"x":x,"y":y,"ang":ang, "puntos":puntos, "tiempo":tiempo,"email":this.email})
	}

	this.volverAJugar=function(){
  		this.socket.emit('volverAJugar',this.room); 
	}

	this.lanzarSocketSrv = function(){
		var cli = this;
		console.log("CLIENTE.LANZARSOCKETSRV :: cli.email="+cli.email+" - cli.id="+cli.id+" - cli.room="+cli.room+" - cli.num="+cli.num);
		cli.socket.on('connect',function(){
			cli.socket.emit('room',cli.id,cli.room,cli.num);
			cli.cargarConfiguracion();

		});

		cli.socket.on('coord',function(data){
			console.log("CLISOCKETON cooooord");
			console.log('El juego va a empezar on de cliente coord');
		    game.state.start('Game',true,false,data);
		});

		cli.socket.on('faltaUno',function(data){
		    console.log('El jugador '+cli.email+" espera un jugador");
		    //juego.faltaUno();
		    
		});
	

		cli.socket.on('aJugar',function(data){
		    for(var jug in data){
		    	console.log('aJugar: ',data[jug]);
		        juego.agregarJugador(data[jug]);
		    }
		});


		cli.socket.on('final',function(data){
		    juego.finalizar(data);
		});

		cli.socket.on('reset',function(data){ 
  			juego.volverAJugar(data);
		});

		
		cli.socket.on('movimiento',function(data){ 
		    juego.moverNave(data); 
		});
	}

	//this.ini();
}



function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}