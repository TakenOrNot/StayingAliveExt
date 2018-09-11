// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init RecTest');
        initEvents ();
        initHtml ();
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    function initHtml () {
        //const headHtml = `<script src='https://webrtc.github.io/samples/src/content/capture/canvas-record/js/main.js'/>`
        const headHtml = `<script src="https://takenornot.github.io/StayingAliveExt/lib/CCapture.all.min.js"></script>`
        $('head').append ( headHtml );
    }
    
    /* GUI */
    
    $('body').append ("<div id='reccontainer' style='display: none;'><div id='rec' style='display: block; position: absolute;left: 50%;margin: 0px 0px 0px 125px;bottom: 4px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;'>Rec</div></div>");

    var capturer = '';
        $("#rec").click(function (){
            var capturer = new CCapture( { format: 'webm-mediarecorder' } );
            capturer.start();
            $(this).html('Stop');
            $(this).click(function (){
                capturer.stop();
                capturer.save();
                $(this).html('Rec');
            });
        });
    
    
    SWAM.one("gameRunning", ()=> {
        function update(){
            /* Loop this function */
            requestAnimationFrame(update);
            if( capturer ) capturer.capture( renderer.view );
          }
        update();
    });
   
         //Graphics.render(
            //requestAnimationFrame(render);
            // rendering stuff ...
            //capturer.capture( canvas );
        //)
    
        
        
        $('#selectaircraft-1').click(function (){

            $("#reccontainer").css({display: "none"});

        }); 
        $('#selectaircraft-2').click(function (){

            $("#reccontainer").css({display: "none"});

        });     
        $('#selectaircraft-3').click(function (){

            $("#reccontainer").css({display: "none"});

        });
        $('#selectaircraft-4').click(function (){

            $("#reccontainer").css({display: "none"});

        });
        $('#selectaircraft-5').click(function (){

            $("#reccontainer").css({display: "none"});

        }); 

        
    
    SWAM.on("playerRespawned", function(data){
            respawnedid = data['id'];
            if (respawnedid == Players.getMe().id){
 
                $("#reccontainer").css({display: "none"});
  
            }
    });
    
    SWAM.on ( 'gamePrep', function (){

        $("#reccontainer").css({display: "none"});
    });
    
    
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player      
            checkspecdelay = 2000;
            checkspec(checkspecdelay)
               
            
        }

        
    }
    
    function onMatchStarted () {
        checkspecdelay = 10000;
        checkspec(checkspecdelay)
    }
    
    function checkspec(checkspecdelay){
        window.setTimeout(function () {
                    if( $('#btnFreeSpectator').css('display') == 'block' ) {
                        console.log("v key pressed, show rec");
                        $("#reccontainer").css({display: "block"});
                        
                    }
                },checkspecdelay); 
    }

    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Rec',
        id: 'Rec',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();