function Juego(){
    this.numJugadores = 0;
    this.naves={};
    this.veggies={};
    this.nave;
    this.cursors;
    this.naveLocal;
    this.fin = false;
    this.marcador;
    this.rival;
    this.coord;
    this.contadorTxt=0;
    this.contador = 0;


    this.preload=function() {
       game.load.image('space', 'cliente/recursos/deep-space.jpg');
       game.load.image('bullet', 'cliente/recursos/bullets.png');
       game.load.image('ship', 'cliente/recursos/ship.png');
       game.load.spritesheet('veggies', 'cliente/recursos/fruitnveg32wh37.png', 32, 32);
       game.load.image('reset', 'cliente/recursos/boton-reset.png');

    }

    this.init=function(data){
        game.stage.disableVisibilityChange = true;
        this.coord = data;
    }
    this.create=function() {
        
        //  This will run in Canvas mode, so let's gain a little speed and display
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;
        //  We need arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //  A spacey background
        game.add.tileSprite(0, 0, game.width, game.height, 'space');
        //  Game input
        this.cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        //game.input.addPointer();
        this.contadorTxt = game.add.text(game.width-70, 30, 'Ready?', { font: "3em Showcard Gothic" ,fill: "#FF0000", align: "right"});
        this.contadorTxt.anchor.setTo(0.5, 0.5);
        
        console.log("asteroides nuevoJugador a cliente");
        console.log(cliente.room);
        cliente.nuevoJugador();
        
        if(cliente.num>1){
            this.marcador = game.add.text(game.world.centerX, 25, "Buscando un contrincante...", {
              font: "3em Showcard Gothic",
              fill: "#FDFEFE",
              align: "center",
              position: "absolute"

            });
            var cad = "<h8 align='center' >BIENVENIDO AL JUEGO MULTIJUGADOR</h8>";
            $("#miMarcador").html(cad);
        }else{
            var cad = "<h8 align='center' >BIENVENIDO AL JUEGO INDIVIDUAL</h8>";
            $("#miMarcador").html(cad);
            this.marcador = game.add.text(game.world.centerX, 25, "ADELANTE !! A COMER FRUTAS!", {
              font: "3em Showcard Gothic",
              fill: "#FDFEFE",
              align: "center",
              position: "absolute"

            });

        }
        

        this.marcador.anchor.setTo(0.5, 0.5);


        this.veggies = game.add.physicsGroup();

        for (var i = 0; i < this.coord.length; i++)
        {
            var c = this.veggies.create(this.coord[i].x, this.coord[i].y, 'veggies', this.coord[i].veg);
        }
        game.load.audio("MiSonido","audios/MiSonido.mp3");

         
    }

    

    this.update=function() {
        //var id=$.cookie("usr");
        var nave;
        var id=cliente.id;
        nave=this.naves[id];        
        //nave=this.nave;
        //var sprite=nave.sprite;

        /*console.log("CONSOLE DE UPDATE ");
        console.log("    veggies: "+this.veggies);
        console.log("    nave.sprite: "+nave.sprite);
        console.log("    collisionHandler: "+this.collisionHandler);
        console.log("    processHandler: "+this.processHandler);
        console.log("    this: "+this);*/

        if(!this.fin){

            if (nave){
                //this.actualizarMarcador();
                //console.log(cliente.num);
                //if(cliente.num>1){
                    if (game.physics.arcade.collide(nave.sprite, this.veggies, this.collisionHandler, this.processHandler, this)){
                     console.log('boom');
                    }
                    if (game.input.mousePointer.isDown){
                        var targetAngle = game.math.angleBetween(nave.sprite.x, nave.sprite.y,game.input.mousePointer.x, game.input.mousePointer.y); 
                        nave.sprite.rotation = targetAngle;
                        nave.mover(game.input.mousePointer.x,game.input.mousePointer.y,targetAngle); 
                    }

                    if (this.cursors.left.isDown)
                     {
                        nave.sprite.body.angularVelocity = -300;
                    }
                     else if (this.cursors.right.isDown)
                    {
                        nave.sprite.body.angularVelocity = 300;
                    }
                     else
                    {
                        nave.sprite.body.angularVelocity = 0;
                    }
                    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
                    {
                        nave.disparar();
                    }
                        this.screenWrap(nave.sprite);
            }
        //}
    }
 }


     this.collisionHandler=function(bullet, veg) { 
         if (veg.frame==this.naves[cliente.id].veggie){
         console.log("ñam ñam");
         this.naveLocal.puntos++;
         this.actualizarMarcador();
         veg.kill();
         }
     }



     this.processHandler=function(player, veg) {
        return true;
     }


    this.agregarJugador = function(/*id,x,y,veggie*/data){
        console.log("nuevoUsuario "+data.id);
        if(this.naves[data.id]==null){
            console.log("Creando nave" +data);
            this.numJugadores++;
            var nave=new Nave(data);
            this.naves[data.id]=nave;
            //this.naveLocal=this.naves[cliente.id];
            if (data.id==cliente.id){
                this.naveLocal=this.naves[cliente.id];
                this.naveLocal.email=cliente.email.substr(0,cliente.email.indexOf('@'));
            }
            else{
                this.rival=nave;
            }
        }
        game.time.events.loop(Phaser.Timer.SECOND, this.actualizarContador, this);
    }

    this.actualizarContador = function(){

        this.contador++
        this.contadorTxt.setText("Time: "+this.contador);
    }

    this.moverNave=function(data){  
        console.log(data.id);      
        var nave=this.naves[data.id];
        nave.puntos=data.puntos;
        nave.mover(data.x,data.y,data.ang,true); 
        this.rival=nave;
        this.actualizarMarcador();  
    }


    this.finalizar = function(data){
        console.log('Ha ganado: ',data);

        game.state.start("FinJuego",true,false,data,cliente.id);
        this.contador=0;

    }

    this.actionReset = function(){

        cliente.volverAJugar();
    }


    this.actualizarMarcador=function(){
        
        if(cliente.num>1){
            this.marcador.setText("Puntos. Yo:" +this.naveLocal.puntos + "- Rival:"+this.rival.puntos);
            game.world.bringToTop(this.marcador);
           /* $('#puntosLocal').text(this.naveLocal.puntos);
            $('#puntosVisitante').text(this.rival.puntos);*/
        }else{
            this.marcador.setText("LLEVAS EN TOTAL: "+this.naveLocal.puntos);
        }
    }


    this.screenWrap=function(sprite) {
       
        if (sprite.x < 0)
        {
            sprite.x =game.width;
        }
        else if (sprite.x >game.width)
        {
            sprite.x = 0;
        }

        if (sprite.y < 0)
        {
            sprite.y =game.height;
        }
        else if (sprite.y >game.height)
        {
            sprite.y = 0;
        }

    }

    this.volverAJugar=function(data){
        
        this.fin=false;
        this.naves={};
        this.naveLocal=null;
        this.coord=[];
        game.state.start("Game",true,false,data);
    }

    this.render=function() {
    }


    this.faltaUno=function(){
        this.marcador.setText("Partida: "+cliente.room+" | Yo:0 - Rival:0 \n --- Esperando rival ---");
        this.marcador.anchor.setTo(0.5, 0);
        game.world.bringToTop(this.marcador);
    }
}

function Nave(data){
    this.id=data.id;
    this.x=data.x;
    this.y=data.y;
    this.sprite;
    this.bullets;
    this.bullet;
    this.bulletTime = 0;
    this.veggie = data.veggie;
    this.puntos = 0;
    


    this.mover=function(x,y,ang,socket){       
        this.sprite.rotation=ang;      
        //var targetAngle = game.math.angleBetween(this.sprite.x, this.sprite.y,x,y);  this.sprite.rotation = targetAngle;
        var distance=Phaser.Math.distance(this.sprite.x, this.sprite.y, x, y);
        var duration = distance*3;
        var tween = game.add.tween(this.sprite);
        tween.to({x:x,y:y}, duration);
        tween.start();
        if (!socket)
            tween.onComplete.add(this.onComplete, this);
    }



    this.onComplete=function(){
        //var nave=this.playerMap[$.cookie("usr")];
        cliente.enviarPosicion(this.sprite.x,this.sprite.y,this.sprite.rotation,this.puntos,juego.contador);
    }
    


    this.disparar=function() {

        if (game.time.now > this.bulletTime)
        {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet)
            {
               this.bullet.reset(this.sprite.body.x + 16, this.sprite.body.y + 16);
               this.bullet.lifespan = 1000;
               this.bullet.rotation = this.sprite.rotation;
               game.physics.arcade.velocityFromRotation(this.sprite.rotation, 400, this.bullet.body.velocity);
               this.bulletTime =game.time.now + 50;
            }
        }
    }
    


    this.ini=function(){
        this.bullets= game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        //  All 40 of them
        this.bullets.createMultiple(40, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        console.log(this.id+" " +this.x+" "+this.y);
        //  Our player ship
        this.sprite = game.add.sprite(this.x, this.y, 'ship');
        this.sprite.anchor.set(0.5);

        //  and its physics settings
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.drag.set(50);
        this.sprite.body.maxVelocity.set(200);
    }
    this.ini();



}



function FinJuego(){
    this.ganador;
    this.idLocal;
    this.init =function(id,idLocal) {    
        //alert("Ganador: "+score)
        this.ganador=id;
        this.idLocal=idLocal;

    };
    this.create= function(){

        //var gameOverTitle = game.add.sprite(160,160,"gameover");
        //gameOverTitle.anchor.setTo(0.5,0.5);
        game.add.tileSprite(0, 0, game.width, game.height, 'space');
        var cadena="";
        console.log("MOSTRAMOS EL FINAL DEL JUEGO: GANADOR = "+this.ganador+"    <---->    LOCAL"+this.idLocal);
        
        if (this.ganador==this.idLocal){
            cadena="Enhorabuena, ¡ERES EL GANADOR!";
        }
        else{
            cadena="Lo siento, tu rival te ha vencido"
        }

        var text2 = game.add.text(game.world.centerX, 180, cadena, {
                font: "25px Arial",
                fill: "#FDFEFE",
                align: "center"
            });
        text2.anchor.setTo(0.5, 0.5); 

       var text1 = game.add.text(game.world.centerX, 220, "Gracias por usar VeggieRocket", {
                font: "25px Arial",
                fill: "#FDFEFE",
                align: "center"
            });
        text1.anchor.setTo(0.5, 0.5);    
        var text = game.add.text(game.world.centerX, 100, "FIN JUEGO", {
                font: "25px Arial",
                fill: "#FDFEFE",
                align: "center"
            });
       
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;

        var playButton = game.add.button(400,420,"reset",this.volverAJugar,this);
        playButton.anchor.setTo(0.5,0.5);
    };
    this.volverAJugar= function(){
        cliente.volverAJugar();
    }
}