var modelo = require("./modelo.js");

describe("El juego VeggieRockets...", function () {
        var juego = new modelo.Juego();

        beforeEach(function () {});

        it('El juego tiene', function () {
                expect(juego.usuarios).toEqual({});
                expect(juego.partidas).toEqual({});
                expect(juego.persistencia).toBeDefined();
        });

        it('El usuario patata@patata.es con clave pedro se registra ', function (done) {
                juego.conectar(function () {
                        juego.registrarUsuario('patata@patata.es', 'pedro', function (usr) {
                                expect(usr.email).toEqual('ok');
                                done();
                        });
                });
        });

        it('El usuario patata@patata.es confirma su cuenta ', function (done) {
                juego.obtenerKeyUsuario('patata@patata.es', 'pedro', function (datos) {
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

        beforeEach(function () {});

        it('El usuario patata@patata.es con clave pedro se registra ', function (done) {
                juego.conectar(function () {
                        juego.registrarUsuario('patata@patata.es', 'pedro', function (usr) {
                                expect(usr.email).toEqual(undefined);
                                done();
                        });
                });
        });

        it('El usuario patata@patata.es inicia sesión ', function (done) {
                juego.iniciarSesion('patata@patata.es', 'pedro', function (usr) {
                        uid = usr._id;
                        expect(usr.email).toEqual('patata@patata.es');
                        done();
                });
        });

        it('El usuario patata@patata.es crea una nueva partida individual', function (done) {
                juego.nuevaPartida(uid, 'prueba', 1, function (nombre) {
                        expect(nombre).toEqual('prueba');
                        expect(juego.partidas[nombre].estado.esInicial()).toEqual(true);
                        done();
                });
        });

        it('El usuario patata@patata.es obtiene la configuración de la partida', function (done) {
                juego.partidas['prueba'].iniciar(function (mens, data) {
                        expect(mens).toEqual('coordenadas');
                        expect(data).toBeDefined();
                        coord = data;
                        done();
                });
        });

        it('El usuario patata@patata.es se agrega a la partida', function (done) {
                juego.partidas['prueba'].agregarJugador(uid, function (mens, datos) {
                        expect(mens).toEqual('aJugar');
                        expect(datos[uid].id).toEqual(uid);
                        done();
                });
        });

        it('El estado del juego ya no es inicial y el usuario juega la partida', function (done) {
                expect(juego.partidas['prueba'].estado.esInicial()).toEqual(false);
                expect(juego.partidas['prueba'].estado.esJugar()).toEqual(true);
                numeFrutas = juego.partidas['prueba'].numeroFrutas;
                //console.log('En el momento de retornar las frutas de la partida tenemos: ' +numeFrutas+' frutas.');
                expect(numeFrutas).toEqual(juego.partidas['prueba'].numeroFrutas);

                for (var i = 0; i <= numeFrutas; i++) {
                        // it("El usuario patata@patata.es comienza ajugar", function (done) {
                                var data;
                                // var puntos = 0;
                                // el objetivo ocupa las n primeras posiciones                
                                x = coord[i].x;
                                y = coord[i].y;
                                data = {
                                        "id": uid,
                                        "x": x,
                                        "y": y,
                                        "ang": 0,
                                        "puntos": i,
                                        "tiempo": 0
                                };
                                juego.partidas['prueba'].movimiento(data, function (mens, datos) {
                                        if (mens != 'final') {
                                                // movimiento
                                                expect(mens).toEqual('movimiento');
                                        } else {
                                                // final
                                                expect(mens).toEqual('final');
                                                done();
                                        }
                                });
                }
        });

        // it('El usuario patata@patata.es localiza cada objetivo', function (done) {
        //         var data = {
        //                 'id': uid,
        //                 "x": coord[i].x,
        //                 "y": coord[i].y,
        //                 "puntos": puntos
        //         };
        //         juego.partidas['prueba'].movimiento(data, function (mens, datos) {
        //                 if (mens != 'final') {
        //                         expect(mens).toEqual('final');
        //                 } else {
        //                         expect(mens).toEqual('movimiento');
        //                 }
        //         })
        // });

        // console.log('Antes de entrar al for tenemos: ' + numeFrutas + ' frutas.');
        // for (var i = 0; i < 10; i++) {
        //         it("El usuario patata@patata.es comienza ajugar", function (done) {
        //                 var data;
        //                 var puntos = 0;
        //                 //el objetivo ocupa las n primeras posiciones                
        //                 x = coord[i].x;
        //                 y = coord[i].y;
        //                 data = {
        //                         "id": uid,
        //                         "x": x,
        //                         "y": y,
        //                         "ang": 0,
        //                         "puntos": puntos,
        //                         "tiempo": 0
        //                 };
        //                 juego.partidas['prueba'].movimiento(data, function (mens, datos) {
        //                         if (mens != 'final') {
        //                                 //mover
        //                                 expect(mens).toEqual('movimiento');
        //                         } else {
        //                                 expect(mens).toEqual('final');
        //                         }
        //                         puntos++;
        //                         done();
        //                 });
        //         });
        // };

        //expect(userlist.getUsers().length).toEqual(1).because('when a user object is removed, the list should equal 1');


        it('Eliminamos el usuario patata@patata.es', function (done) {
                juego.eliminarUsuario(uid, function (resultado) {
                        expect(resultado.resultados).toEqual(1);
                })
                done();
        });
});