var modelo = require("../server/modelo.js");

describe("El juego FruitLappers...", function () {
        var juego = new modelo.Juego();

        beforeEach(function () {});

        it('El juego tiene', function () {
                expect(juego.usuarios).toEqual({});
                expect(juego.partidas).toEqual({});
                expect(juego.persistencia).toBeDefined();
        });

        it('El usuario patata@patata.es con clave 123 se registra ', function (done) {
                juego.conectar(function () {
                        juego.registrarUsuario('patata@patata.es', '123', function (usr) {
                                expect(usr.email).toEqual('ok');
                                done();
                        });
                });
        });

        it('El usuario patata@patata.es confirma su cuenta ', function (done) {
                juego.obtenerKeyUsuario('patata@patata.es', 'admin', function (datos) {
                        var key = datos.key;
                        juego.confirmarUsuario('patata@patata.es', key, function (usr) {
                                expect(usr.confirmada).toEqual(true);
                                done();
                        })
                });
        });

        it('Cerramos la conexión a mLab para el registro de usuario.', function (done) {
                 juego.cerrar();
                 done();
        });
});

describe("El juego VeggieRockets...", function () {
        var juego = new modelo.Juego();
        var uid;
        var numeFrutas = 0;
        var coord;
        var room;
        var emalillo;
        var fechita = new Date();
        var jugadorL;
        var ideillo;

        beforeEach(function () {});

        it('El usuario patata@patata.es con clave 123 se registra pero no puede porque ya está registrado ', function (done) {
                juego.conectar(function () {
                        juego.registrarUsuario('patata@patata.es', '123', function (usr) {
                        		
                                expect(usr.email).toEqual(undefined);
                                done();
                        });
                });
        });


        it('El usuario patata@patata.es inicia sesión ', function (done) {
                juego.iniciarSesion('patata@patata.es', '123', function (usr) {
                		jugadorL=usr;
                        uid = usr._id;
                        expect(usr.email).toEqual('patata@patata.es');
                        emalillo = usr.email;
                        done();
                });
        });

        it('El usuario patata@patata.es crea una nueva partida individual', function (done) {
                juego.nuevaPartida(uid,'pruebaPartidaInd', 1, function (nombre) {
                	room=nombre;
                	expect(room).toEqual('pruebaPartidaInd');
                    expect(nombre).toEqual('pruebaPartidaInd');
                    expect(juego.partidas[nombre].estado.esInicial()).toEqual(true);
                    done();
                });
        });
        
        it('El usuario patata@patata.es obtiene la configuración de la partida', function (done) {
                juego.partidas['pruebaPartidaInd'].iniciar(function (mens, data) {
                        expect(mens).toEqual('coord');
                        expect(data).toBeDefined();
                        coord = data;
                        done();
                });
        });
        
        it('El usuario patata@patata.es se agrega a la partida', function (done) {
                juego.partidas['pruebaPartidaInd'].agregarJugador(uid, function (mens, datos) {
                        expect(mens).toEqual('aJugar');
                        console.log("_________________________________________________________"+datos[uid].id);
                        ideillo=datos[uid].id;
                        expect(datos[uid].id).toEqual(uid);
                        done();
                });
        });

        it('El estado del juego ya no es inicial y va a jugar', function (done) {
            expect(juego.partidas['pruebaPartidaInd'].estado.esInicial()).toEqual(false);
            expect(juego.partidas['pruebaPartidaInd'].estado.esJugar()).toEqual(true);
            numeFrutas = juego.partidas['pruebaPartidaInd'].numeroFrutas;
            console.log('En el momento de retornar las frutas de la partida tenemos: ' +numeFrutas+' frutas.');
            expect(numeFrutas).toEqual(juego.partidas['pruebaPartidaInd'].numeroFrutas);

            for (var i = 0; i <= numeFrutas; i++) {
        
                var data;

                // var puntos = 0;
                // el objetivo ocupa las n primeras posiciones                
                x = coord[i].x;
                y = coord[i].y;
                data = {
                        "id": ideillo,
                        "x": x,
                        "y": y,
                        "ang": 0,
                        "puntos": i,
                        "tiempo": 0,
                        "email": emalillo
                };
                console.log(data["puntos"]);
                juego.partidas['pruebaPartidaInd'].movimiento(data, function (mens, datos) {
                        if (mens != 'final') {
                                // movimiento
                                console.log("movimiento de "+i);
                                expect(mens).toEqual('movimiento');

                        } else {
                                // final
                                expect(mens).toEqual('final');
                                done();
                        }
                });
        
    		}     
                
        });

        //expect(userlist.getUsers().length).toEqual(1).because('when a user object is removed, the list should equal 1');
/*

    	it('Eliminamos el usuario patata@patata.es', function (done) {
            juego.eliminarUsuario(uid, function (resultado) {
                expect(resultado.resultados).toEqual(1);
            })
            done();
        });
        it('Eliminamos los resultados de patata@patata.es', function (done) {
            juego.eliminarResultados(uid, function (resultado) {
                expect(resultado.resultados).toEqual(1);
            })
            done();
        });*/

        it("Eliminar juego",function(done){
			juego.cerrar();
			done();
		}); 

});