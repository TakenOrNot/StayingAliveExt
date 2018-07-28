// ------------------------------------------------------------------------
//   Flag Chaser for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Staying Alive');
        // if this is not CTF, dont do anything more
        initEvents ();
        
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        
    }
    
    SWAM.on ( 'gameLoaded', init );
    
    window.stayalive = 0;
    
    /* GUI */
    
    $('body').append ("<div id='stayalivecontainer' style='display: none;'><div id='countdown'></div><div id='stayalive' style='display: block; position: absolute;left: 50%;margin: -75px;bottom: 400px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;'>Piss Off Jz !</div></div>");

    $("#stayalive").click(function(){
        console.log("Stay Alive clicked");
        if (stayalive = 0){
            console.log("Stay Alive enabled, start respawn countdown");
            stayalive = 1;
            function stayalive (){
                // window.setTimeout(function () {
                     // if( $('#btnFreeSpectator').css('display') == 'block' ) {
                var cd = setTimeout(function() {
                    if (stayalive === 0){
                        console.log("RESPAWN");
                        $('#selectaircraft-1').click(); 
                        window.setTimeout(function () {
                            console.log("back to spectate");
                            // var specid = $( "#scoreboard .line" ).attr('player-id');
                            // console.log("spectate force");
                            // Network.sendCommand("spectate", "'" + specid + "'" + "");
                            // Network.sendCommand("spectate", specid + "");
                            Network.spectateForce();
                            stayalive ();
                        },4000);
                    }
                }, 30000);
                    // };       

                // },2000);
            
            }
            stayalive ();    
        }
        else {
            console.log("Stay Alive disabled");
            stayalive = 0;
        }
        
    });
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player      
            
             
            window.setTimeout(function () {
                if( $('#btnFreeSpectator').css('display') == 'block' ) {
                    console.log("v key pressed, show stay alive GUI");
                    $("#stayalivecontainer").css({display: "block"});
                }
            },2000);    
            
        }
        
        

    }
    
    

    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Staying Alive',
        id: 'StayingAlive',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();