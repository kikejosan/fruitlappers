var mongo=require("mongodb").MongoClient;
var ObjectID=require("mongodb").ObjectID;
//var url="https://proyectobase.herokuapp.com/";
//var mail=require("./email.js");


function Persistencia(){
    this.usuariosCol=undefined;
    this.resultadosCol=undefined;
    console.log("PERSISTENCIA SE HA CREADO!!!");
    this.db;


    this.eliminarUsuario=function(uid,callback){
        eliminar(this.usuariosCol,{_id:ObjectID(uid)},callback);

    }
    this.eliminarResultados=function(emailo,callback){
        console.log("_________________________________________");
        //eliminar(this.resultadosCol,{usuario:ObjectID(uid)},callback);
        eliminar(this.resultadosCol,{email:emailo},callback);
        
    }


    function eliminar(coleccion,criterio,callback){
        coleccion.remove(criterio,function(err,result){
                //console.log(result);
            if(!err){
                callback(result);
            }
        });
    }

    this.encontrarUsuario=function(email,callback){
        encontrar(this.usuariosCol,{email:email},callback);
    };

    this.encontrarUsuarioCriterio=function(criterio,callback){
        encontrar(this.usuariosCol,criterio,callback);
    };

    function encontrar(coleccion,criterio,callback){
        coleccion.find(criterio).toArray(function(error,usr){
            if (usr.length==0){
                callback(undefined);
            }
            else{
                callback(usr[0]);
            }
        });
    };

    function encontrarTodos(coleccion,callback){
        coleccion.find().toArray(function(error,usr){
            callback(usr);
        });
    };




    this.insertarUsuario=function(usu,callback){
        insertarUsuario(this.usuariosCol,usu,callback);
    }

    function insertarUsuario(coleccion,usu,callback){
        coleccion.insert(usu,function(err,result){
            if(err){
                console.log("error");
            }
            else{
                console.log("DB_Nuevo usuario creado: "+usu.email);
                callback(usu);
            }
        });
    }
    this.confirmarCuenta=function(email,key,callback){
        encontrar(this.usuariosCol,{email:email,key:key,confirmada:false},callback);
    };


    function modificarColeccion(coleccion,usr,callback){
        coleccion.findAndModify({_id:ObjectID(usr._id)},{},usr,{},function(err,result){
            if (err){
                console.log("No se pudo actualizar (método genérico)");
            }
            else{     
                console.log("Usuario actualizado"); 
            }
            callback(result);
        });
    }

    this.modificarColeccionUsuarios=function(usr,callback){
        modificarColeccion(this.usuariosCol,usr,callback);
    }
    this.encontrarTodosResultados=function(callback){
        encontrarTodos(this.resultadosCol,callback);
    };

    this.insertarResultado=function(resu,callback){
        insertar(this.resultadosCol,resu,callback);
    }

    function insertar(coleccion,usu,callback){
        coleccion.insert(usu,function(err,result){
            if(err){
                console.log("error: " + " " + err);
            }else{
                callback(usu);
            }
        });
    }
    this.conectar=function(callback){
        var pers=this;
        mongo.connect("mongodb://kikejosan:comandos2@ds161455.mlab.com:61455/fruitlappers", function(err, db) {
        //mongo.connect("mongodb://127.0.0.1:27017/usuarioscn", function(err, db) {    
            if (err){
                console.log("No pudo conectar a la base de datos")
            }
            else{
                console.log("conectado a mLab: usuarioscn");
                pers.db=db;
                db.collection("usuarios",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion")
                    }else{       
                        console.log("tenemos la colección usuarios");
                        //juego.iniUsuarios(col);
                        pers.usuariosCol=col;   
                    }
                    //db.close();
                });
                db.collection("resultados",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion resultados")
                    }else{       
                        console.log("tenemos la colección resultados");
                        //juego.iniUsuarios(col);
                        pers.resultadosCol=col;   
                    }
                });
                callback(db);
            }
        });
    }
    this.cerrar=function(){
        this.db.close();
    }
}

module.exports.Persistencia=Persistencia;
