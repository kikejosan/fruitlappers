function Com(){
	this.lanzarSocketSrv = function(io,juego){
		var com = this;
	    io.on('connection',function(socket){
		    
		    socket.on('room',function(id,room,num){
		    	juego.nuevaPartida(id,room, num, function(nombre){
		    		socket.join(nombre);
		    	});
		    });

		    socket.on('unirme',function(room){
		     	//juego.unirme(room,function(room){
		     	socket.join(room);
		     	//});
		    });

		    socket.on('configuracion',function(room){
		      console.log('Cargando la configuracion '+room);
		      if(juego.partidas[room]){
			      juego.partidas[room].iniciar(function(mens,data){
		      		socket.emit(mens,data);
		      	  });
			  }
		    });

		    socket.on('nuevoJugador',function(data){
		      juego.partidas[data.room].agregarJugador(data.id,function(mens,datos){
		      	io.sockets.in(data.room).emit(mens,datos);
		      });
		    });

		    socket.on('posicion',function(room,data){
		      juego.partidas[room].movimiento(data,function(mens,datos){
		      	if(mens!='final'){
					socket.broadcast.to(data.room).emit(mens,datos)	

		      	}else{
		      		io.sockets.in(room).emit(mens,datos);
		      	}	
		      });
		    });
		  
		    socket.on('volverAJugar',function(room){
		      juego.partidas[room].volverAJugar(function(mens,datos){
		      	io.sockets.in(room).emit(mens,datos);
		      });
		    });
		});
	}

}
module.exports.Com=Com;