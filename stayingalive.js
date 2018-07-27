// ------------------------------------------------------------------------
//   Flag Chaser for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Staying Alive');
        // if this is not CTF, dont do anything more
        initEvents ();
        initHTML ();
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
    }
    
    function initHTML () {
        // <script src="https://takenornot.github.io/StayingAliveExt/lib/easytimer.js">
        const html = `<div id='countdown'></div>`;
        $('body').append ( html );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player
            window.setTimeout(function () {
                 if( $('#btnFreeSpectator').css('display') == 'block' ) {
                    console.log("v key pressed, start respawn countdown"); 
                    
                    var cd = setTimeout(function() {
                        // TODO if StayingAlive = 1      
                        console.log("RESPAWN");
                        $('#selectaircraft-1').click(); 
                        window.setTimeout(function () {
                            console.log("back to spectate");
                            var specid = $( "#scoreboard .line" ).attr('player-id');
                            console.log("spec " + specid);
                            Network.sendCommand("spectate", "'" + specid + "'" + "");
                        },3000);
                    }, 30000);
                };       
                        
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