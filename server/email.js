
//var sendgrid = require("sendgrid")("kikejos96","comandos2");
var sendgrid = require("sendgrid")("marcosUCLM","marcos-UCLM1");
console.log("SENDGRID = "+sendgrid);
//var url="https://fruitlappers2.herokuapp.com/";
var url = "http://localhost:5000/";


module.exports.enviarEmail=function(direccion,key,msg){
        var email = new sendgrid.Email();
        email.addTo(direccion);
        email.setFrom('narutillo_quique@hotmail.com');
        email.setSubject('confirmar cuenta');
        email.setHtml('<a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">'+msg+'</a>');
        console.log("   DESDE EMAIL.JS "+email);
        sendgrid.send(email);        
}

module.exports.enviarEmailResetPassword=function(direccion,key,msg){
        var email = new sendgrid.Email();
        email.addTo(direccion);
        email.setFrom('narutillo_quique@hotmail.com');
        email.setSubject('Reiniciar clave');
        email.setHtml('<a href="'+url+'cambiarClave/'+direccion+'/'+key+'">'+msg+'</a>');

        sendgrid.send(email);        
}
