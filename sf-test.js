// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init SF');
        initEvents ();
        
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        // TODO on CTF match started, wait 10 sec and check if we are in spec, if so lauch idletime, and if stayalive = true, launch also the countdown
        SWAM.on ( 'CTF_MatchStarted', onMatchStarted );
    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    
    
    /* GUI */
    
    $('body').append ("<div id='sfcontainer' style='display: none;'><div id='sf' style='display: block; position: absolute;left: 50%;margin: 0px 0px 0px 125px;bottom: 4px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;'>SF</div></div>");

    $("#sf").click(function (){
        console.log("SF clicked");
        
        config.scalingFactor = 10000;
        SWAM.ZoomTo(10000);
        // Network.sendCommand("spectate", game.myID + "");

        
        
        $('#selectaircraft-1').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        }); 
        $('#selectaircraft-2').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        });     
        $('#selectaircraft-3').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        });
        $('#selectaircraft-4').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        });
        $('#selectaircraft-5').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        }); 

        
    });
    
    SWAM.on("playerRespawned", function(data){
            respawnedid = data['id'];
            if (respawnedid == Players.getMe().id){
                console.log("player respawned, hide Sf");
                $("#sfcontainer").css({display: "none"});
                config.scalingFactor = osf;
            }
    });
    
    SWAM.on ( 'gamePrep', function (){
        window.osf = config.scalingFactor;
        console.log("gameprep osf =" + osf);
        $("#sfcontainer").css({display: "none"});
    });
    
    
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player      
            checkspecdelay = 2000;
            checkspec(checkspecdelay)
               
            
        }
         if ( event.originalEvent.key === 'u' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player      
             console.log("u key pressed");
            if (config.scalingFactor === 10000;) {
                config.scalingFactor = osf;
                SWAM.ZoomTo(osf);
                
            } else {
                config.scalingFactor = 10000;
                SWAM.ZoomTo(10000);
            }
            
               
            
        }
        
    }
    
    function onMatchStarted () {
        checkspecdelay = 10000;
        checkspec(checkspecdelay)
    }
    
    function checkspec(checkspecdelay){
        window.setTimeout(function () {
                    if( $('#btnFreeSpectator').css('display') == 'block' ) {
                        console.log("v key pressed, show sf");
                        $("#sfcontainer").css({display: "block"});
                        
                    }
                },checkspecdelay); 
    }

    /* REGISTER */

    SWAM.registerExtension ({
        name: 'SF',
        id: 'SF',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();