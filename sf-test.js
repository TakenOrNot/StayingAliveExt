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
    
    window.osf = config.scalingFactor;
    
    
    /* GUI */
    
    $('body').append ("<div id='sf' style='display: none;'>SF</div>");

    $("#sf").click(function (){
        console.log("SF clicked");
        
        config.scalingFactor = 10000;
        
        $('#selectaircraft-1').click(function (){
            config.scalingFactor = osf;
            $("#sf").css({display: "none"});

        }); 
        $('#selectaircraft-2').click(function (){
            config.scalingFactor = osf;
            $("#sf").css({display: "none"});

        });     
        $('#selectaircraft-3').click(function (){
            config.scalingFactor = osf;
            $("#sf").css({display: "none"});

        });
        $('#selectaircraft-4').click(function (){
            config.scalingFactor = osf;
            $("#sf").css({display: "none"});

        });
        $('#selectaircraft-5').click(function (){
            config.scalingFactor = osf;
            $("#sf").css({display: "none"});

        }); 

        
    });
    
    SWAM.on("playerRespawned", function(data){
            respawnedid = data['id'];
            if (respawnedid == Players.getMe().id){
                console.log("player respawned, hide Sf");
                $("#sf").css({display: "none"});
                config.scalingFactor = osf;
            }
    });
    
    SWAM.on ( 'gamePrep', function (){
        
        $("#sf").css({display: "none"});
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
                        console.log("v key pressed, show sf");
                        $("#sf").css({display: "block"});
                        
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